/**
 * Author: Trevor M. Birdsall
 * Version: 1.0.0
 * Purpose:
 */

"use strict";
const IO = require('fs');
const BLIB = require('./birdlib.js');

let masterFile = [], newTransactions = [], jobs = [], paid = [];

function main() {
    loadAgent();
    loadTransactionFile();
}

main();

function loadAgent() {
    let agentFile = IO.readFileSync('Agency_data/agency_data.csv', 'utf8');
    let lines = agentFile.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        masterFile.push(lines[i].toString().split(/,/));
    }
}

function loadTransactionFile() {
    let transFile = IO.readFileSync('Agency_data/agency_transaction.csv', 'utf8');
    let lines = transFile.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        newTransactions.push(lines[i].toString().split(/,/));
    }
}