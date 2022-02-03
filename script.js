const table = document.querySelector(".table");

const deck = [
    {
        name: "beach",
        url: "images/beach.jpg",
        id: 1,
        isFlipped: false,
    },
    {
        name: "block",
        url: "images/block.jpg",
        id: 2,
        isFlipped: false,
    },
    {
        name: "jumping",
        url: "images/jumping.jpg",
        id: 3,
        isFlipped: false,
    },
    {
        name: "people",
        url: "images/people.jpg",
        id: 4,
        isFlipped: false,
    },
    {
        name: "beach",
        url: "images/beach.jpg",
        id: 1,
        isFlipped: false,
    },
    {
        name: "block",
        url: "images/block.jpg",
        id: 2,
        isFlipped: false,
    },
    {
        name: "jumping",
        url: "images/jumping.jpg",
        id: 3,
        isFlipped: false,
    },
    {
        name: "people",
        url: "images/people.jpg",
        id: 4,
        isFlipped: false,
    },
];

const shuffledDeck = deck.sort((a, b) => 0.5 - Math.random());

console.log("shuffledDeck: ", shuffledDeck);

const layDeck = () => {
    let allTheCards = "";

    shuffledDeck.forEach((card) => {
        console.log("card: ", card);
        allTheCards += `<div class="card ${card.name}" >
        <img class="cardImg" src=${card.url} alt=${card.name}>
        <div class="cover"></div>
        </div>
        `;
    });

    table.innerHTML = allTheCards;
};

layDeck();

const cards = document.querySelectorAll(".card");
const cover = document.querySelectorAll(".cover");

// const reset = () => {
//     let cardsMatched = 0;
//     console.log("Estou rodando");

//     cards.forEach((card) => {
//         if (card.classList.contains("matched")) {
//             cardsMatched += 1;
//             console.log("cardsMatched: ", cardsMatched);
//         }
//     });
// };

// reset();

// console.log("cards: ", cards);
console.log("cover: ", cover);

cover.forEach((cover, i) => {
    cover.addEventListener("click", function (e) {
        // console.log("cover: ", cover);
        cover.classList.add("flip");
        deck[i].isFlipped = true;
        checkEqualCards();
        // console.log("deck: ", deck);
    });
});

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
        deck.forEach((card) => {
            if (card.isFlipped) {
                flippedCards.push(card);
                console.log("card: ", card);
            }
        });

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
                                location.reload();
                            }
                        }
                        deck.forEach((card) => (card.isFlipped = false));
                        flips = 0;
                        flippedCards = [];
                    }, 1500);
                }
            });
        } else {
            setTimeout(() => {
                cover.forEach((card) => {
                    card.classList.remove("flip");
                });
                deck.forEach((card) => (card.isFlipped = false));
                flips = 0;
                flippedCards = [];
                console.log("deck: ", deck);
                console.log("flippedCards: ", flippedCards);
            }, 1500);
        }
    }
};
