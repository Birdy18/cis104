"use strict";
const BLIB = require('./birdlib');
const IO = require('fs');

let continueResponse;
let numClient, menuChoice;
let client = [];

function main() {
    if (continueResponse !== 0 && continueResponse !== 1) {
        setContinueResponse();
    }
    loadClient();
    console.log(client);
}

main();

function setMenuChoice() {
    menuChoice = -1;
    while (menuChoice !== 1 && menuChoice !== 2 && menuChoice !== 3 && menuChoice !== 4 && menuChoice !== 5 && menuChoice !== 6 && menuChoice !== 7) {
        menuChoice = BLIB.getNumber(
            `\tPlease choose an option from the menu: 
            \t\t1) Add Client
            \t\t2) Delete Client
            \t\t3) Show Transaction
            \t\t4) List Clients
            \t\t5) Save
            \t\t6) Load
            \t\t7) Exit
            \t\tChoose: `
        )
    }
}

function setContinueResponse() {
    if (continueResponse) {
        continueResponse = -1;
        while (continueResponse !== 0 && continueResponse !== 1) {
            continueResponse = BLIB.getNumber('\nDo you want to continue? [0=no, 1=yes]: ')
        }
    } else {
        continueResponse = 1;
    }
}

function loadClient() {
    let clientFile = IO.readFileSync('data/client_data.csv' , 'utf8');
    let lines = clientFile.toString().split(/\r?\n/);
    for (let line of lines) {
        client.push(line.toString().split(/,/));
    }
}