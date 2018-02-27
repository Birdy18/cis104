/**
 * Author: Trevor M. Birdsall
 * Version: 1.0.0
 * Purpose: Run a kiosk at a movie theater
 */

//Section 1: Pragma and Requirements
"Use strict";
const PROMPT = require("readline-sync");

// Section 2: Global variables and classes
let movies = [];
let currentUser;
let runProgram = 1;
let movieDir = new Map();
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
        return this.title + this.ratings.toString();
    }

    addRating() {
        let minStars = 0, maxStars = 5;
        let rating = Number(PROMPT.question("Rate " + this.title + " 0-5 stars."));
        if(isNaN(rating) || rating < minStars || rating > maxStars ) {
            console.log("Error, not a valid input!");
            PROMPT.question("Press Enter to continue");
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
        movieDir.set(i, new_movie);
    }
}

function login() {
    currentUser = PROMPT.question('\nWhat is your username?')
}

function movieMenu() {
    displayMovies();
    movieManager();
}

function displayMovies() {
    for(let movie of movies) {
        console.log(movie);
    }
}

function displayAverages() {
    let movie = chooseMovie();
    console.log(movie.averageRating)
}

function chooseMovie() {
    let movie = Number(PROMPT.question("What movie do you want to review? Use ID! (1-" + movies.length + "): "));
    if(movie-1 < 0 || movie > movies.length || isNaN(movie)) {
        console.log("ERROR: Pick a proper movie ID!");
    }
    return movies[movie-1];
}

function displayMenu() {
    let output = "";
    for (let key of ACTION_MENU.keys()) {
        output += key + ": " + ACTION_MENU.get(key)[0] +'\n';
    }
    console.log(output);
}

function movieManager() {
    displayMenu();
    let option = PROMPT.question("Choice: ");
    if (!ACTION_MENU.has(option)) {
        //console.clear();
        console.log("This is not a valid choice, try again!");
        return;
    }
    ACTION_MENU.get(option)[1]();
}

function setExit() {
    runProgram = 0;
}

function addRating() {
    let movie = chooseMovie();
    movie.addRating();
}