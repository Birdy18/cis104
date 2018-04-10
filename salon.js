"use strict";
const BLIB = require('./birdlib');

let runProgram = 1;
let client = [];

const CLIENT_MENU = new Map()
    .set('1',["Add Client", addClient])
    .set('2',["Delete Client", deleteClient])
    .set('3',["Show Transaction", showTransaction])
    .set('4',["List Clients",listClients])
    .set('5',["Exit",setExit]);

class Client {
    constructor(ID, FIRST, LAST, FUNDS) {
        this.id = ID;
        this.first = FIRST;
        this.last = LAST;
        this.funds = FUNDS;
        this.client = [];
    }
    addClient() {
    let first = BLIB.getKeyboard('\nPlease enter your first name:  ');
    let last = BLIB.getKeyboard('\nPlease enter your last name:  ');
    let funds = BLIB.getNumber('\nHow much have you contributted? ');
    let new_Client = new Client(first, last, funds)
        this.client.push(new_Client);
    }
    numClients() {
        return this.client.length
    }
}

function main() {

}

main();

function addClient() {
    this.client.get(client);
}

function deleteClient() {

}

function showTransaction() {
    for (let client of clients) {
        console.log(client.display);
    }
}

function listClients() {

}

function setExit() {
    runProgram = 0;
}