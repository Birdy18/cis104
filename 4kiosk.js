/**
 * Author: Trevor M. Birdsall
 * Version: 1.0.0
 * Purpose: Run a kiosk at a movie theater
 */

//Section 1: Pragma and Requirements
"use strict";
const BLIB = require("./birdlib");

// Section 2: Global variables and classes
let movies = [];
let currentUser;
let runProgram = 1;
let ourMovies = ["Star Wars", "My Little Pony",
    "Andrew'Rocky' and Bullwinkle", "Arceus and the Jewel of Life"];

const ACTION_MENU = new Map()
    .set('1',["Add Rating", addRating])
    .set('2',["Display Average Ratings", displayAverages ])
    .set('3',["Exit", setExit ]);

class Rating {
    constructor(user, rating) {
        this.user = user;
        this.rating = rating;
    }
}

class Movie {
    constructor(title) {
        this.title = title;
        this.ratings = [];

    }
    toString() {
        return this.title;
    }

    addRating() {
        let minStars = 0, maxStars = 5;
        let rating = BLIB.getNumber("Rate " + this.title + " 0-5 stars.");
        if(rating < minStars || rating > maxStars ) {
            console.log("Error, not a valid input!");
            BLIB.pressEnter();
            console.clear();
        }
        let new_rating = new Rating(currentUser, rating);
        this.ratings.push(new_rating);
    }

    display() {

    }

    get numRatings() {
        return this.ratings.length;
    }

    get averageRating() {
        let total = 0;
        for(let i of this.ratings) {
            total += i.rating;
        }
        return total / this.ratings.length;
    }
}


// Section 3: program flow

function main() {
    initMovies();
    login();
    while(runProgram) {
        movieMenu();
    }
    return;

    let whileResult = 1;
    while(whileResult ===1) {
        try {
            whileResult = movieManager();
        }

        catch(err) {
            console.log(err);
        }
    }
}


main();
// Section 4: Helper functions

function initMovies() {
    for(let i of ourMovies) {
        let new_movie = new Movie(i);
        movies.push(new_movie);
    }
}

function login() {
    console.clear();
    currentUser = BLIB.getKeyboard('\nWhat is your username? ');
}

function movieMenu() {
    displayMovies();
    movieManager();
}

function displayMovies() {
    console.clear();
    let i = 1;
    for (let movie of movies) {
        console.log(`${i}.`);
        console.log(movie.title);
        console.log(`There are ${movie.ratings.length} review(s) for this title.`);
        console.log();
        i++;
    }
}

function displayAverages() {
    let movie = chooseMovie();
    console.log(` The average rating for ${movie.title} is ${movie.averageRating} stars. `);
    BLIB.pressEnter(); //Freezes screen
}

function chooseMovie() {
    return BLIB.getOption("Choose Movie: ", movies);
}


function movieManager() {
    BLIB.displayMenu(ACTION_MENU);
    let action = ACTION_MENU.get(BLIB.getOption("Choice: ", ACTION_MENU.keys()));
    action[1]();
}

function setExit() {
    runProgram = 0;
}

function addRating() {
    let movie = chooseMovie();
    movie.addRating();
}