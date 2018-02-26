/*
 * Author: Trevor M. Birdsall
 * Version: 1.0.0
 * Purpose: to loop a movie list
 */;

"use strict"
const PROMPT = require("readline-sync");

const MIN_STARS = 0, MAX_STARS = 5;
const MAX_TRIES = 3;
let movieTitle;
let stars = [];
let average;
let movieReview;

/**
 *@method
 *@desc
 *@returns {null}
 */
function main() {
    setMovieTitle();
    setMovieRate();
    setMovieReview();
    setAverage();
    printMovieTitle();
    printAverage();
    printReview();
}

main();


/**
 * @method
 * @desc movieTitle mutator
 * @returns
 */

function setMovieTitle() {
    movieTitle = PROMPT.question('\nWhat is the name of the movie?');
    console.clear();
    }


function setMovieRate() {
    let errors = 0;
    while (errors < MAX_TRIES) {
        let rating = Number(PROMPT.question("How many stars? (0-5): "));
        console.clear();
        try {
            if(isNaN(rating)) {
                throw "This is not a valid input, please try again!";
            }
            if (rating > MAX_STARS) {
                throw "This is not a valid input, please try again!";

            }
            if (rating < MIN_STARS) {
                throw "This is not a valid input, please try again!";
            }
            stars.push(rating);
        }
        catch(error) {
            console.log(error);
            errors++;
        }

        }

    }


function setAverage() {
    let total = 0;
    for (let star of stars) {
        total += star;
    }
    average = total / stars.length;
}

function printMovieTitle() {
    console.clear();
    console.log('\nThis name of this movie is ' + movieTitle + ".");
}

function printAverage() {
    console.log('The average rating is  = ' + average + " stars.");
}

function setMovieReview() {
    movieReview = PROMPT.question('\nWhat did you like about the movie? ');
    console.clear();
}

function printReview() {
    console.log('This is your review: ' + movieReview + ".");
}