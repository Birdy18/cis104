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
    writeMasterFile();
}

main();

/**
 * @method
 * @desc Loading the agency data file and setting it to the masterfile
 * @returns {null}
 */
function loadAgent() {
    let agentFile = IO.readFileSync('Agency_data/agency_data.csv', 'utf8');
    let lines = agentFile.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        masterFile.push(lines[i].toString().split(/,/));
    }
}

/**
 * @method
 * @desc Loading the agency transaction file and setting it to the newTrancaction array
 * @returns {null}
 */
function loadTransactionFile() {
    let transFile = IO.readFileSync('Agency_data/agency_transaction.csv', 'utf8');
    let lines = transFile.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        newTransactions.push(lines[i].toString().split(/,/));
    }
}

function writeMasterFile() {
    for (let i = 0; i < masterFile.length; i++) {
        if (masterFile[i]) {
            for (let j = 0; j < masterFile[i].length; j++) {
                if (j < masterFile[i].length - 1) {
                    IO.appendFileSync(`Agency_data/dataX.csv`, `${masterFile[i][j]},`);
                } else if (i < masterFile.length - 1) {
                    IO.appendFileSync('Agency_data/dataX.csv', `${masterFile[i][j]}\n`);
                } else {
                    IO.appendFileSync('Agency_data/dataX.csv', `${masterFile[i][j]}`);
                }
            }
        }
    }
    IO.unlinkSync(`Agency_data/agency_data.csv`);
    IO.renameSync(`Agency_data/dataX.csv`, `Agency_data/agency_data.csv`);
}

function calculateFunds() {
    for (let i = 0; i < masterFile.length; i++) {
        for (let j = 0; j < newTransactions.length; j++) {
            if (masterFile[i][0] === newTransactions[j][3]){
                paid.push(masterFile[i][0],[Number(masterFile[i][4]) * Number(newTransactions[j][4])]);
                break;
            }
        }
    }
}

function jobCheck() {
    for (let i = 0; i < masterFile.length; i++) {
        for (let j = 0; j < newTransactions.length; j++) {
            if (masterFile[i][0] === newTransactions[j][0]) {
                jobs.push(masterFile[i][0]);
            }
        }
    }
}