/**
 * Created by thenry on 9/4/17.
 */

const TURN_DELAY = 2000;
const THREE_STARS = 13;
const TWO_STARS = 16;
const ONE_STAR = 19;
const NUMBER_OF_CARDS = 16;

let startTime = null;

//array of objects to contain each card type **needs to be doubled to create all 16 cards
let cardList = [
    {
        text: '<i class="fa fa-diamond"></i>',
        matched: false
    },
    {
        text: '<i class="fa fa-paper-plane-o"></i>',
        matched: false
    },
    {
        text: '<i class="fa fa-anchor"></i>',
        matched: false
    },
    {
        text: '<i class="fa fa-bolt"></i>',
        matched: false
    },
    {
        text: '<i class="fa fa-cube"></i>',
        matched: false
    },
    {
        text: '<i class="fa fa-leaf"></i>',
        matched: false
    },
    {
        text: '<i class="fa fa-bicycle"></i>',
        matched: false
    },
    {
        text: '<i class="fa fa-bomb"></i>',
        matched: false
    }
];

let cardDeck = [];

//delay prevents clicking of additional cards while two are currently being shown
let delay = false;

let moves = 0;

let numberOfStars = 3;

let pick1 = null;
let pick2 = null;

let correctCards = 0;