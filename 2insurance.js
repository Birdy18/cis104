/*
    Author: Trevor Birdsall
    Class: CIS 104
    Version: 1.0.1
    Purpose: To calculate customer insurance premiums
 */

"use strict";
const PROMPT = require("readline-sync");

let continueResponse;
let policyNum, dueDate, faultNum, custAge, agePRICE, faultPrice, totalPre;
let custLast, custFirst, custBirth;
const basePRICE = 100;
const faultCost = 50;
const minAge = 15;
const maxAge = 60;
const ageOne = 30;
const ageTwo = 45;
const priceOne = 20;
const priceTwo = 10;
const priceThree = 30;

/**
 * @method
 * @desc Calculating premium
 * @returns {null}
 */
function main() {
    if (continueResponse !== 0 && continueResponse !== 1  ) {
     setcontinueResponse()
    }
    if (continueResponse === 1) {
    setPolicyNumber();
    setCustLast();
    setCustFirst();
    setCustBirth();
    setDueDate();
    setFaultNum();
    setTotalPre();
    printTotalPre();
    setcontinueResponse();
    return main();
    }
    printSeeya();
}

main();

/**
 * @method
 * @continueResponse mutator
 * @returns {method}
 */
function setcontinueResponse() {
    if (continueResponse === 1 || continueResponse === 0) {
        continueResponse = Number(PROMPT.question('\nDo you want to continue forward? {0=no, 1=yes }; '));
        if (continueResponse !== 0 && continueResponse !== 1) {
            console.log('${continueResponse} is not the right input, please try again!');
            continueResponse = 1;
            return setcontinueResponse();
        }
    } else {
        continueResponse = 1

    }
}

/**
 * @method
 * @custFirst mutator
 * @returns {null}
 */
function setPolicyNumber() {
    policyNum = Math.floor((Math.random()* 99)+ 1) //random number between 1-99
}

/**
 * @method
 * @custLast mutator
 * @returns {null}
 */
function setCustLast() {
    custLast = PROMPT.question('\nWhat is your last name?');
    console.clear();
}

/**
 * @method
 * @custFirst mutator
 * @returns {null}
 */
function setCustFirst() {
    custFirst = PROMPT.question('\nWhat is your first name?');
    console.clear();
}

/**
 * @method
 * @custBirth mutator
 * @returns {null}
 */
function setCustBirth() {
    let birthYear, birthDay, birthMonth;
    const min_YEAR = 1900;
    let today = new Date();
    const max_YEAR = today.getFullYear()-15;
    const min_MONTH = 1;
    const max_MONTH = 12;
    const min_DAY = 1;
    const max_DAY = 31;
    while (isNaN(birthYear) || birthYear < min_YEAR || birthYear > max_YEAR) {
        birthYear = PROMPT.question('\nWhat year was ' + custFirst + ' born?');
        if (isNaN(birthYear) || birthYear < min_YEAR || birthYear > max_YEAR) {
            console.log("Error, not a valid input!");
            PROMPT.question("press Enter to continue");
            console.clear();
        }
    }
    while (isNaN(birthMonth) || birthMonth < min_MONTH || birthMonth > max_MONTH) {
        birthMonth = PROMPT.question('\nWhat month was ' + custFirst + ' born?');
        if (isNaN(birthMonth) || birthMonth < min_MONTH || birthMonth > max_MONTH) {
            console.log("Error, not a valid input!");
            PROMPT.question("press Enter to continue");
            console.clear();
        }
    }
    while (isNaN(birthDay)|| birthDay < min_DAY || birthDay > max_DAY) {
        birthDay = PROMPT.question('\nWhat day was ' + custFirst + ' born?');
        if (isNaN(birthDay)|| birthDay < min_DAY || birthDay > max_DAY) {
+            console.log("Error, not a valid input!");
            PROMPT.question("press Enter to continue");
            console.clear();
        }
    }

    custBirth = birthMonth + "/" + birthDay + "/" + birthYear;

    setCustAge(birthYear,max_YEAR+15);

}

/**
 * @method
 * @custAge mutator
 ^ @returns {null}
 */
function setCustAge(birth,curYear) {
    let custAge;
    custAge = curYear-birth;
        if (custAge >= minAge && custAge < ageOne) {
            agePRICE = priceOne;
        }else if (custAge >= ageOne && custAge <= ageTwo) {
            agePRICE = priceTwo;
        }else if (custAge >= maxAge) {
            agePRICE = priceThree;
        } else (
            agePRICE = 0``
        )
}

/**
 * @method
 * @dueDate mutator
 * @returns {null}
 */

function setDueDate() {
    let today = new Date();
    dueDate = today.getDate();

}

/**
 * @method
 * @faultNum mutator
 * @returns {null}
 */

function setFaultNum() {
    faultNum = PROMPT.question("\nHow many accidents were " + custFirst + "'s fault? ");
    if (faultNum == 0) {
        faultPrice = 0;
    } else if (faultNum => 1) {
            faultPrice = faultNum * faultCost;
    }
}

/**
 * @method
 * @totalPre mutator
 * @returns {null}
 */

function setTotalPre() {
    totalPre = faultPrice+agePRICE+basePRICE;
}
function printTotalPre() {
    console.clear();
    console.log("Customer's name is " + custFirst + " " + custLast + "." );
    console.log("Mr./Ms./Mrs. " + custLast + " is policy number " + policyNum + ".");
    console.log("His/her premium cost is $" + totalPre + "." );
    console.log("His/her due date is " + dueDate + ".");

}
function printSeeya() {
    console.clear();
    console.log("See you later.");
}
