
//array of objects to contain each card type **needs to be doubled to create all 16 cards
let cardList = [
    {
        text: '1',
        matched: false
    },
    {
        text: '2',
        matched: false
    },
    {
        text: '3',
        matched: false
    },
    {
        text: '4',
        matched: false
    },
    {
        text: '5',
        matched: false
    },
    {
        text: '6',
        matched: false
    },
    {
        text: '7',
        matched: false
    },
    {
        text: '8',
        matched: false
    }
];

let cardDeck = [];

//delay prevents clicking of additional cards while two are currently being shown
let delay = false;

let moves = 0;




//function creates two copies of each card and returns the new array
function cardDoubler(cards) {
    let temp = [];
    for (let card of cards) {
        for (let i=0; i<2; i++){
            temp.push(card);
        }
    }
    return temp;
}

//function draws the deck as a for loop of LI elements
//will add logic to display if visible or matched
function drawDeck(cards) {
    tempHTML = "";
    let index = 0;
    for (let card of cards) {
        tempHTML += `<li value="${index}" class="card">${card.text}</li>`;
        index++;
    }
    document.getElementById("deck").innerHTML = tempHTML;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


$(document).ready(function() {

    let pick1, pick2 = null;

    $(".moves").text(moves);

    cardDeck = shuffle(cardDoubler(cardList));
    drawDeck(cardDeck);

    $("#deck li").click(function() {

        if (!delay) {
            if ($(this).hasClass("show")) {
                return;
            }
            if (!pick1) {
                pick1 = this;
                $(this).addClass("show");
            } else if (this !== pick1) {
                pick2 = this;
                $(this).addClass("show");
                compareCards(pick1, pick2);
                pick1 = null;
                pick2 = null
            }
        }
    })

});

//enter two li elements, will compare the value of each and return true or false; will delay 3 seconds before
// hiding cards
function compareCards(card1, card2) {
    increaseNumberOfMoves();
    console.log(`${cardDeck[card1.value].text}, ${cardDeck[card2.value].text}`);
    if (cardDeck[card1.value].text === cardDeck[card2.value].text) {
        $(card1).addClass("match");
        $(card2).addClass("match");
        return true;
    } else {
        delay = true;
        setTimeout(function() {
            delay = false;
            $(card1).removeClass("show");
            $(card2).removeClass("show");
        }, 2000);
        return false;
    }
}

function increaseNumberOfMoves() {
    moves++;
    $(".moves").text(moves);
};