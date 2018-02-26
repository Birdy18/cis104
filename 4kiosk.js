/**
 * Author: Trevor M. Birdsall
 * Version: 1.0.0
 * Purpose: Run a kiosk at a movie theater
 */

"Use strict";
const PROMPT = require("readline-sync");

let continueResponse;
let ratings = [];

/**
 * @method
 * @desc The dispatch method for our program
 * @returns {null}
 */

function main() {
    if (continueResponse !== 0 && continueResponse !== 1) {
        setContinueResponse();
    }
    populateRatings();
    while (continueResponse === 1) {
        setContinueResponse();
    }
}

main();

/**
 * @method
 * @desc continueResponse
 * @returns {null}
 */

function setContinueResponse() {
    if (continueResponse === 1 || continueResponse === 0 ) {
        continueResponse = Number(PROMPT.question('\nWould you like to continue {0==no, 1==yes }'));
            while (continueResponse !== 1 && continueResponse !== 0) {
                console.log('${continueResponse} is not a valid function, please try again');
                continueResponse = Number(PROMPT.question('\nWould you like to continue? {0==no , 1==yes'));
            }
    } else {
        continueResponse = 1;
    }
}

/**
 * @method
 * @desc rating array mutator
 * @returns {void}
 */

function populateRatings() {
    const MIN_STARS = 0, MAX_STARS = 5;
    for (let i = 0)
}
