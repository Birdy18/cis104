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
    }
    addClient() {

    }
}

function main() {

}

main();

function setExit() {
    runProgram = 0;
}