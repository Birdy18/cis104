"use strict";
const BLIB = require('./birdlib');
const IO = require('fs');

let masterFile = [], newTransactions = [], coupons = [], noclientFile = [];

function main() {
    loadClient();
    loadTransaction();
}

main();

function addClients(newClient) {
    if(noclientFile !== []) {
        let test = 1;
        for(let i = 0; i < noclientFile.length; i++) {
            if(newClient === noclientFile[i]) {
                test = 0;
                break;
            }
        }
        if(test) {
            noclientFile.push(newClient);
        }
    } else {
        noclientFile.push(newClient);
    }
}
function showTransaction() {

}

function loadClient() {
    let clientFile = IO.readFileSync('data/client_data.csv' , 'utf8');
    let lines = clientFile.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        masterFile.push(lines[i].toString().split(/,/));
    }
}
function loadTransaction() {
    let transFile = IO.readFileSync('data/transdata_data.csv' , 'utf8');
    let lines = transFile.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        newTransactions.push(lines[i].toString().split(/,/));
    }
}