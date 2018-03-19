/**
 *  Author: Trevor M. Birdsall
 *  Version: 1.0.0
 *  Purpose: Music related
 */

"use strict"
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
let musicName, musicPrice;
let errorCount = 0;
let errorMax = 3;
let login, account;
let accounts = new Map();
const accountPopulate = [
    [1,"Trevor", 1998],
    [2,"Rocky", 1158],
    [3,"Jiminy",2014],
    [4,"Howard",4120]
];

const MUSIC_LIST = new Map()
    .set('A',["Bronze-Rated (< $3.00)", chooseBronze])
    .set('B',["Silver-Rated ($3.00-$5.99", chooseSilver])
    .set('C',["Gold-Rated ($6.00-$9.99)", chooseGold])
    .set('D',["Platnum-Rated ( > $10.00)", choosePlatnum])
    .set('E',["Exit",endProgram]);

var musicGenre = ["Classical","Easy Listening", "Jazz", "Pop", "Rock", "Other"];

class Music {
    constructor(name, genre, price) {
        music.name = name;
        music.genre = musicGenre;
        music.price = price;
    }
}

class Account {
    constructor(id, name, PIN) {
        this.id = id;
        this.name = name;
        this.pin = PIN;
    }

    addAccount() {
        let account = PROMPT.question('\nPlease type in your account name: ');
        let newAccount = new Account(name, PIN);
        this.account.push(newAccount);
    }

    toString() {
        return this.name + this.pin.toString();
    }

    login(name, PIN) {
        account = this.account.get(name);
        if (!this.account.has(name)) {
            return false;
        }
        if (account.pin != account.name) {
            return false;
        }
    }

    PINCheck(numPIN) {
        if (this.pin === numPIN) {
            return true;
        }
        return false;
    }
}
class Transaction {
    constructor(account, reciept, total, date) {
        transaction.account = account.name;
        transaction.reciept
    }
}


function main() {
    loadApp();
    while(runProgram) {
        activateApp();
    }
    console.log("Please come back, and rock on!! ")
    return;
}

main();

function loadApp() {
    for(let account of accountPopulate) {
        accounts.set(account[0], new Account(account[0],account[1],account[2],account[3]))
    }
}
function runLogin() {
    if (errorCount >= maxError) {
        console.log("TOO MANY ERRORS.");
        runProgram = 0;
        return;
    }

    let id = Number(PROMPT.question('\nPlease type in your ID: '));
    let name = PROMPT.question('Please enter in your name: ');
    let numPIN = Number(PROMPT.question('\nPlease enter your PIN number: '));

    if (!accounts.has(id)) {
        console.log('ERROR INVALID CREDENTIALS!');
        errorCount++;
        return;
    }

    let foundAccount = accounts.get(id);

    if (!foundAccount.name === name) {
        console.log('ERROR INVALID CREDENTIALS!');
        errorCount++;
        return;
    }
    if (!foundAccount.PINCheck(numPIN)) {
        console.log('ERROR INVALID CREDENTIALS!');
        errorCount++;
        return;
    }
    login = foundAccount;

}

function activateApp() {
    if(!login) {
        runLogin();
        return;
    }
    manageMusicList();
}

function displayMusicList() {
    let output = "";
    for (let key of MUSIC_LIST.keys()) {
        output += key + ": " + MUSIC_LIST.get(key)[0] +'\n';
    }
}

function manageMusicList() {
    displayMusicList();
    let option = PROMPT.question("Choice: ").toUpperCase();
    if (!MUSIC_LIST.has(option)) {
        console.log('\nThis is not a valid menu choice');
        return;
    }
    MUSIC_LIST.get(option)[1]();
}

function

function displayTransaction() {

}

function populateMusic() {
    musicName = PROMPT.question('\nWhat is the name of the song? ')
}


function endProgram() {
    runProgram = 0;
}
