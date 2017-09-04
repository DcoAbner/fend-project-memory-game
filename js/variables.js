/**
 * Created by thenry on 9/4/17.
 */

const TURN_DELAY = 2000;
const THREE_STARS = 13;
const TWO_STARS = 19;
const ONE_STAR = 24;

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

let numberOfStars = 3;