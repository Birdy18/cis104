"use strict";
const PROMPT = require('readline-sync');

function getKeyboard(question) {
    let response = PROMPT.question(question);
    if (!response) {
        console.log("ERROR, TRY AGAIN!");
        return getKeyboard(question);
    }
    return response;
}

exports.getKeyboard = getKeyboard;

function getNumber(question) {
    let response = Number(getKeyboard(question));
    if (isNaN(response)) {
        console.log("ERROR, MUST BE A NUMBER!");
        return getNumber(question);

    }
    return response;
}

exports.getNumber = getNumber;