/**
 * Author: Trevor Birdsall
 * Version: 1.0.0
 * Reason: This is a final exam, has a little bit of all that was taught
 */

"use strict";
const IO = require('fs');
const BLIB = require('./birdlib.js');

let runProgram = l;

let masterFile = [], newTransactions = [];

function main() {
    loadKart();
    loadTrans();
}

main();

function mainMenu() {
    console.log('A: Grand Prix  ');
    console.log('B: Time Trial  ');
    console.log('C: Records  ');
    console.log('D: Exit');
}

function menuManager() {
    switch (true) {
        case A:
            grandPrix();
            break;
        case B:
            timeTrial();
            break;
        case C:
            viewRecords();
            break;
        case D:
            setExit();
            break;
    }
}

function grandPrix() {
    let choice = BLIB.getKeyboard('\nChoose your character  ');
    console.log()
}

function timeTrial() {

}

function viewRecords() {

}

function loadKart() {
    let kartFile = IO.readFileSync('Kart_data/karts.csv', 'utf8');
    let lines = kartFile.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        masterFile.push(lines[i].toString().split(/,/));
    }
    console.log('Kart File is loaded! ');
}

function loadTrans() {

}

function setExit() {
    runProgram = 0;
}