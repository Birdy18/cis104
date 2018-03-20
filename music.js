/**
 *  Author: Trevor M. Birdsall
 *  Version: 1.0.0
 *  Purpose: Music related
 */

"use strict";
const PROMPT = require('readline-sync');

/**HappyTunes is a progressive web application for downloading music files. Each time a file is purchased, a transaction record is created that includes the music genre and price paid. The available genres are Classical, Easy Listening, Jazz, Pop, Rock, and Other. Develop an application that accepts input data for each transaction and displays a report that lists each of the music genres, along with a count of the number of downloads in each of the following price categories:
 (Classical, Easy Listening, Jazz, Pop, Rock, and Other)
 Over $10.00
 $6.00 through $9.99
 $3.00 through $5.99
 Under $3.00
 It should have the ability to sort by most downloaded genre.
 */

let runProgram = 1;
const GENRES = ["Classical", "Easy Listening", "Jazz", "Pop", "Rock", "Other"];
let genresMap = new Map();

class MusicGenre {
    constructor(name) {
        this.name = name;
        this.purchases = [];
    }
}

function main() {
    loadApp();
    while(runProgram) {
        happyTunes();
    }
    console.log("Please come back, and rock on!!")
}

main();

// Section 4

function loadApp() {
    for(let genre of GENRES) {
        genresMap.set(genre.toUpperCase(), new MusicGenre(genre));
    }
}

function happyTunes() {
    console.log("A: Purchase Music");
    console.log("B: See Transaction");
    console.log("C: Exit");

    let input = PROMPT.question("Choice: ").toUpperCase();
    if(!input) {
        console.log('\nERROR, NOT A VALID CHOICE!');
        return;
    }

    switch(input) {
        case "A":
            purchaseMusic();
            break;
        case "B":
            seeTransaction();
            break;
        case "C":
            endProgram();
            break;
        default:
            console.log('\nERROR, NOT A VALID INPUT!');
            break;
    }
}

function seeTransaction() {
    console.log(genresMap);
}

function purchaseMusic() {
    console.log(`Genres: ${GENRES.join(', ')}`);
    let choice = PROMPT.question('What genre do you want to purchase from: ').toUpperCase();
    if(!choice) {
        console.log('ERROR, NOT A VALID CHOICE!');
        return;
    }
    if(!genresMap.has(choice)) {
        console.log('ERROR, NOT A VALID GENRE!');
        return;
    }
    let genre = genresMap.get(choice);
    let purchase = Number(PROMPT.question('How much are you going to pay: '));
    if(isNaN(purchase)) {
        console.log("NOT A VALID AMOUNT!");
        return;
    }
    genre.purchases.push(purchase);

}

function endProgram() {
    runProgram = 0;
}
