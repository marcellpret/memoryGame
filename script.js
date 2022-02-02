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

// console.log("deck: ", deck);

const layDeck = () => {
    let allTheCards = "";

    deck.forEach((card) => {
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

// console.log("cards: ", cards);
// console.log("cover: ", cover);

cover.forEach((cover, i) => {
    cover.addEventListener("click", function (e) {
        // console.log("cover: ", cover);
        cover.classList.add("flip");
        deck[i].isFlipped = true;
        checkEqualCards();
        // console.log("deck: ", deck);
    });
});

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
            }
        });

        if (flippedCards[0].name === flippedCards[1].name) {
            console.log("U found a match");
            cards.forEach((card) => {
                if (card.classList.contains(flippedCards[0].name)) {
                    console.log("card: ", card);
                    setTimeout(() => {
                        card.classList.add("matched");
                    }, 1500);
                }
            });
        }
    }
};
