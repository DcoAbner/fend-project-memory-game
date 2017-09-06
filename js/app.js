//Function that runs when the page loads.  Calls resetGame() and then sets up
// listener for reset button
$(document).ready(function() {

    resetGame();

    $("#reset").click(function() {
        $("deck li").unbind();
        resetGame();
    })

});

//initializes variables (declared in variables.js);
function resetGame() {
    moves = 0;  //counts number of moves
    pick1 = null;  //placeholder for first card chosen
    pick2 = null;  //placeholder for second card chosen
    delay = false; //variable that will delay if two cards are shown (until they are hidden again)
    correctCards = 0;  //number of correct matches (when reaches 16, the dialog modal shows)
    startTime = new Date();  //timer for game length

    $(".moves").text(moves);

    cardDeck = shuffle(cardDoubler(cardList));
    drawDeck(cardDeck);

    updateNumberOfStars();  //stars based on number of moves

//click listener for clicking on cards.
// --Only allowed if not currently in delay
// --does not allow click if currently shown
// --stores as either pick1 (first) or pick2 (second);
// if second card then runs compareCards to see if they match
    $("#deck li").click(function() {

        if (!delay) {
            if ($(this).hasClass("show")) {
                return;
            }
            if (!pick1) {
                pick1 = this;
                $(this).addClass("show open");
            } else if (this !== pick1) {
                pick2 = this;
                $(this).addClass("show open");
                compareCards(pick1, pick2);
                pick1 = null;
                pick2 = null
            }
        }
    })
}


//function creates two copies of each card and returns the new array
function cardDoubler(cards) {
    let cardArray = [];
    for (let card of cards) {
        for (let i=0; i<2; i++){
            cardArray.push(card);
        }
    }
    return cardArray;
}

//function draws the deck as a for loop of LI elements
//will add logic to display if visible or matched
//value is used to index card versus the original array of cards (this prevents the font awesome symbol
// from being visible when you inspect the elements in the browser)
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

// enter two li elements, will compare the value of each and return true or false; will delay 3 seconds before
// hiding cards
function compareCards(card1, card2) {
    increaseNumberOfMoves(); //counts current pick
    updateNumberOfStars();  //check to see if star count decreases based on number of moves
    if (cardDeck[card1.value].text === cardDeck[card2.value].text) {
        $(card1).addClass("match");  //add match class to each card
        $(card2).addClass("match");
        correctCards += 2;  //increase the number of correct cards

        //modal for displaying finish dialog once game is won
        if (correctCards == NUMBER_OF_CARDS) {
            let timeToFinish = Math.round((Date.now() - startTime)/1000);
            $("#dialog").dialog({
                resizable: false,
                closeOnEscape: false,
                buttons: {
                    'Play Again': function() {
                        $(this).dialog("close");
                        resetGame();
                    }
                }
            });

            //draws number of stars based on number of stars displayed on the page
            let rating = $($(".stars")[0]).children.length;
            let numberOfStarsText = "";
            for (let i=0; i < rating; i++) {
                numberOfStarsText += "<span class='fa fa-star'></span>"
            }
            $("#dialog").html(`<p>Congrats! You won in ${moves} moves, and it took you ${timeToFinish} seconds.</p><p>Your rating: ${numberOfStarsText}</p>`);
        }
        return;
    } else {
        delay = true;
        setTimeout(function() {
            delay = false;
            $(card1).removeClass("show open");
            $(card2).removeClass("show open");
        }, TURN_DELAY);
        return;
    }
}

//updates #of moves by 1
function increaseNumberOfMoves() {
    moves++;
    $(".moves").text(moves);
};

//changes number of stars displayed based on moves (which can be set as constants in variables.js
function updateNumberOfStars() {
    if (moves <= THREE_STARS) {
        numberOfStars = 3;
    } else if (moves <= TWO_STARS) {
        numberOfStars = 2;
    } else if (moves <= ONE_STAR) {
        numberOfStars = 1;
    } else {
        numberOfStars = 0;
    }

    drawStars(numberOfStars);
}

//function to draw #of stars
function drawStars(stars) {
    x = document.getElementsByClassName("stars")[0];
    x.innerHTML = "";
    for (let i=0; i<stars; i++) {
        x.innerHTML += `<li><i class="fa fa-star"></i></li>`;
    }
}


