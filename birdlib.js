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


function matchOptions(search, options) {
    options = Array.from(options);
    options.sort((a, b) => {return a.toString().length - b.toString().length});
    for (let possible of options) {
        if(search.toString().toLowerCase() === possible.toString().toLowerCase()) {
            return possible;
        }
        if(possible.toString().toLowerCase().startsWith(search.toString().toLowerCase())) {
            return possible;
        }
    }
}

exports.matchOptions = matchOptions;

function getOption(question, options) {
    options = Array.from(options);
    let response = getKeyboard(question);
    response = matchOptions(response, options);
    if(!response) {
            console.log(`ERROR: Not a valid choices! Choices are: ${options.join(", ")}`);
            return getOption(question, options);
        }
    return response;
}

exports.getOption = getOption;

function pressEnter() {
    PROMPT.question("Press Enter to continue...");
}

exports.pressEnter = pressEnter;

function displayMenu(menuMap) {
    let output = "";
    for (let key of menuMap.keys()) {
        output += key + ": " + menuMap.get(key)[0] +'\n';
    }
    console.log(output);
}

exports.displayMenu = displayMenu;