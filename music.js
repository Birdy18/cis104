/**
 *  Author: Trevor M. Birdsall
 *  Version: 1.0.0
 *  Purpose: Music related
 */

"use strict";
const BLIB = require('./birdlib');

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
let genres = [];

class MusicGenre {
    constructor(name) {
        this.name = name;
        this.purchases = [];
    }
    toString() {
        return this.name;
    }

    sumPurchases() {
        let output = 0;
        if(!this.purchases.length) {
            return output;
        }
        for (let purchase of this.purchases) {
            output += purchase;
        }
        return output;
    }

    display() {
        return `${this.name}: $${this.sumPurchases()}`;

    }

}

function main() {
    console.clear();
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
        genres.push(new MusicGenre(genre));
    }
}

function happyTunes() {
    console.log("A: Purchase Music");
    console.log("B: See Transaction");
    console.log("C: Exit");

    let input = BLIB.getKeyboard("Choice: ").toUpperCase();
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
    for(let genre of genres) {
        console.log(genre.display());
    }
}

function compareGenres(a, b) {
    //return b.purchases.length - a.purchaseslength;
    return b.sumPurchases() - a.sumPurchases();
}

function sortGenres() {
    genres.sort(compareGenres);
}

function purchaseMusic() {
    console.log(`Genres: ${GENRES.join(', ')}`);
    let genre = BLIB.getOption('Choose Genre: ', genres);
    let purchase = BLIB.getNumber('How much are you going to pay: ');
    genre.purchases.push(purchase);
    sortGenres();
    switch (purchase) {
        case purchase > 3.00:
            console.log('\nYou wish to purchae our cheapest product?');
            break;
        case 3.00 > purchase || purchase < 5.99:
            console.log('\nOoooh, good choice! ');
            break;
        case 6.00 > purchase || purchase < 9.99:
            console.log('\nA little expensive isnt it?');
            break;
        case purchase > 10.00:
            console.log('\nHope you can afford it');
            break;
    }
    return happyTunes();
}

function endProgram() {
    runProgram = 0;
}


