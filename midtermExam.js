/**
 * Author: Trevor M. Birdsall
 * Version: 1.0.0
 * Purpose: The Mid-Term Exam
 */

"use strict";
const PROMPT = require('readline-sync');

let base = 1000.00;

let currentUser;
let runProgram = 1;
let cardName, number, PIN, accountAmount, transferAccount;
let Withdrawl,Deposit, Transfer, Inquire, Exit;

const ATM_MENU = new Map()
    .set ('A',["Withdrawl",displayWithdrawl] )
    .set ('B',["Deposit",renderDeposit ])
    .set ('C',["Transfer",transferFunds])
    .set ('E',["Exit", setExit]);

class Account {
    constructor(cardName, number, PIN) {
        this.cardName = cardName;
        this.number = number;
        this.PIN = PIN;
        this.funds = base;
        this.fails = 3;
}
    addAccount() {
        let account = PROMPT.question('\nType in your account');
        let new_account = new Account(cardName, number, PIN);
        this.account.push(new_account);
    }
    PINCheck(checkPIN) {
        if(this.PIN === checkPIN) {
            return true;
        }
        this.fails++;
        return false;
    }
    withdrawl(amount) {
        if(amount > this.funds) {
            console.log("Not the right amount of funds! ")
        }
        this.amount -= amount;
        return this.funds;
    }
    deposit(amount) {
        this.funds += amount;
        return this.funds;
    }
    transfer(destination, source, funds) {
        destination.deposit(amount);
        source.withdrawl(amount);
    }
}

function main() {
    console.clear();
   while(runProgram) {
        displayATMMenu();
    }
    console.log("Come back soon! ");
    return;
}

main();


function displayATMMenu() {
    let output = "";
    for (let key of ATM_MENU.keys()) {
        output += key + ": " + ATM_MENU.get(key)[0] +'\n';
    }
    if(!output.length > 0) {
        return '(No Reviews Availible)';
    }
    let choice = PROMPT.question("Please choose a Choice: ",true);

    if (! ATM_MENU.has(choice)) {
        console.log("Not a valid choice, please try again!")
    }
    ATM_MENU.get(choice)[1]();

}

function ATMManager() {
    displayATMMenu();
    let option = PROMPT.question("Choice: ");
    if (!ATM_MENU.has(option)) {
        console.log('\nThis is not a valid menu choice');
        return;
    }
    ATM_MENU.get(choice)[1]();
}

function displayWithdrawl() {
    Withdrawl = base - this.deposit;
}

function renderDeposit() {
    let amount = PROMPT.question('\nHow much do you wish to deposit ');
    userAccount.deposit(amount);
}
function accountID() {
    accountID = PROMPT.question("Please enter your ID ");
    accountAmount = PROMPT.getNumber("Enter how much you want to transfer");
}

function transferFunds() {
    accountID();
    // noinspection JSAnnotator
    if (transferAccount = bankID.getAccount(accountID) );
    bankID.doTransfer(transferAccount, accountID, accountAmount);
}

function setExit() {
    runProgram = 0;
}