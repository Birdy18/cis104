/**
 *  Author: Trevor M. Birdsall
 *  Version: 1.0.0
 *  Purpose: Music related
 */

"use strict"
const PROMPT = require('readline-sync');

/*HappyTunes is a progressive web application for downloading music files. Each time a file is purchased, a transaction record is created that includes the music genre and price paid. The available genres are Classical, Easy Listening, Jazz, Pop, Rock, and Other. Develop an application that accepts input data for each transaction and displays a report that lists each of the music genres, along with a count of the number of downloads in each of the following price categories:
(Classical, Easy Listening, Jazz, Pop, Rock, and Other)
    Over $10.00
$6.00 through $9.99
$3.00 through $5.99
Under $3.00
It should have the ability to sort by most downloaded genre.
*/

let runProgram = 1;
let musicName, musicPrice;

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
    constructor(name, PIN) {
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
}
class Transaction {
    constructor(account, reciept, total, date) {
        transaction.account = account.name;
        transaction.reciept
    }
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

function displayTransaction() {

}

function populateMusic() {
    musicName = PROMPT.question('\nWhat is the name of the song? ')
}


function endProgram() {
    runProgram = 0;
}
