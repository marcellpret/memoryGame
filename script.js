const table = document.querySelector(".table");

const images = [
    {
        name: "gaby",
        url: "images/gaby.png",
        id: 1,
        isFlipped: false,
    },
    {
        name: "charlie",
        url: "images/charlie.png",
        id: 2,
        isFlipped: false,
    },
    {
        name: "mascha",
        url: "images/mascha.png",
        id: 3,
        isFlipped: false,
    },
    {
        name: "wordParty",
        url: "images/wordParty.png",
        id: 4,
        isFlipped: false,
    },
    {
        name: "mightyExpress",
        url: "images/mightyExpress.png",
        id: 5,
        isFlipped: false,
    },
    {
        name: "chico",
        url: "images/chico.png",
        id: 6,
        isFlipped: false,
    },
];

const [easy, medium, hard] = [2, 4, 6];

// const shuffledDeck = deck.sort((a, b) => 0.5 - Math.random());

// console.log("shuffledDeck: ", shuffledDeck);
let deck;
let level;
let cover;
let cardImg;
let cards;
let startTime;

const layDeck = (level) => {
    let allTheCards = "";

    deck = [
        ...JSON.parse(JSON.stringify(images.slice(0, level))),
        ...JSON.parse(JSON.stringify(images.slice(0, level))),
    ].sort((a, b) => 0.5 - Math.random());

    deck.forEach((card) => {
        // console.log("card: ", card);
        allTheCards += `<div class="card ${card.name}" >
        <img class="cardImg" src=${card.url} alt=${card.name}>
        <div class="cover"></div>
        </div>
        `;
    });

    table.innerHTML = allTheCards;
};

const wait = document.querySelector(".wait");
const modal = document.querySelector(".modal");
const modal2 = document.querySelector(".modal2");
const buttonLevel = document.querySelectorAll(".level");
const resetButton = document.querySelector("#reset");

const reset = () => {
    location.reload();
};

resetButton.addEventListener("click", reset);
// Adding event for the buttons to call the right level

buttonLevel.forEach((button) => {
    button.addEventListener("click", (e) => {
        level = eval(e.target.textContent.toLowerCase());
        // console.log("level: ", level);
        modal2.style.display = "none";
        layDeck(level);
        cover = document.querySelectorAll(".cover");
        getCovers();
        cardImg = document.querySelectorAll(".cardImg");
        cards = document.querySelectorAll(".card");

        startTime = new Date();
    });
});

// const cover = document.querySelectorAll(".cover");
console.log("buttonLevel: ", buttonLevel);

console.log("modal: ", modal);

// console.log("cardImg: ", cardImg);

// reset();

console.log("cards: ", cards);

console.log("cover: ", cover);

let cardsMatched = 0;
const checkEqualCards = () => {
    let flips = 0;
    let flippedCards = [];
    deck.forEach((card) => {
        if (card.isFlipped) {
            flips += 1;
        }
    });

    if (flips === 2) {
        console.log("we got 2 cards");
        wait.style.display = "block";
        deck.forEach((card) => {
            if (card.isFlipped) {
                flippedCards.push(card);
                console.log("card: ", card);
            }
        });

        //Checking for a match

        if (flippedCards[0].name === flippedCards[1].name) {
            console.log("U found a match");
            cards.forEach((card) => {
                if (card.classList.contains(flippedCards[0].name)) {
                    console.log("card: ", card);
                    setTimeout(() => {
                        card.classList.add("matched");
                        if (card.classList.contains("matched")) {
                            cardsMatched += 1;
                            if (cardsMatched === cards.length) {
                                modal.style.display = "flex";
                                modal.children[0].children[0].children[0].innerText =
                                    howLongItTook();
                                // location.reload();
                            }
                        }
                        deck.forEach((card) => (card.isFlipped = false));
                        flips = 0;
                        flippedCards = [];
                        wait.style.display = "";
                    }, 1500);
                }
            });
        } else {
            setTimeout(() => {
                cover.forEach((card) => {
                    card.classList.remove("flip");
                    card.parentElement.children[0].classList.remove("flipImg");
                });
                deck.forEach((card) => (card.isFlipped = false));
                flips = 0;
                flippedCards = [];
                wait.style.display = "";
                // console.log("deck: ", deck);
                // console.log("flippedCards: ", flippedCards);
            }, 1500);
        }
    }
};

const getCovers = () => {
    cover.forEach((cover, i) => {
        cover.addEventListener("click", () => {
            cover.classList.add("flip");
            cover.parentElement.children[0].classList.add("flipImg");
            deck[i].isFlipped = true;
            checkEqualCards();
            // console.log("deck: ", deck);
        });
    });
};

const winner = () => {};

const howLongItTook = () => {
    let result;
    let totalTime = new Date() - startTime;
    let totalSec = Math.floor(totalTime / 1000);
    let min = Math.floor(totalSec / 60);
    let sec = totalSec % 60;

    if (min < 1) {
        result = `${padTo2Digits(sec)} sec`;
    } else {
        result = `${padTo2Digits(min)} min and ${padTo2Digits(sec)} sec`;
    }

    return result;
};

const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
};
