/**
 * Author: Trevor M. Birdsall
 * Version: 1.0.0
 * Purpose: The Mid-Term Exam
 */

"use strict";
const PROMPT = require('readline-sync');

let wallet = 500.00;
let base = 1000.00;
let login, account;
let accounts = new Map();
let runProgram = 1;
let errorCount = 0;
let maxError = 3;
const accountPopulate = [
    [1, "Trevor Birdsall",base,1998],
    [2, "Rocky",base,4000],
    [3, "Jiminy Cricket",base,1556]
];

const ATM_MENU = new Map()
    .set('A',["Withdrawl",doWithdrawal] )
    .set('B',["Deposit",doDeposit ])
    .set('C',["Transfer",doTransfer])
    .set('E',["Exit", setExit]);

class Account {
    constructor(id, cardName, balance, PIN) {
        this.id = id;
        this.cardName = cardName;
        this.balance = balance;
        this.PIN = PIN;
}
    addAccount() {
        let account = PROMPT.question('\nType in your account', true);
        let new_account = new Account(cardName, number, PIN);
        this.account.push(new_account);
    }
    toString() {
        return this.cardName + this.number + this.PIN + this.funds.toString();
    }

    login(id, cardName, number, PIN) {
        account = this.account.get(cardName);
        if(!this.account.has(cardName)) {
            return false;
        }
        if(account.number != cardName) {
            return false;
        }
        if(account.PIN != cardname || account.PIN != number) {
            return false;
        }
        return true;
    }

    PINCheck(numPIN) {
        if(this.PIN === numPIN) {
            return true;
        }
        return false;
    }
    withdrawal(amount) {
        if(amount > this.balance) {
            console.log("Not the right amount of funds! ");
            return;
        }
        this.balance -= amount;
        return true;
    }
    deposit(amount) {
        this.balance += amount;
        return true;
    }
    transfer(destination, amount) {
        if(!this.withdrawal(amount)) {
            console.log("Can not transfer, too much funds! ");
            return;
        }
        destination.deposit(amount);

    }
}

function main() {
    loadATM();
    while(runProgram) {
       activateATM();
    }
    console.log("Come back soon! ");
    return;
}

main();

function loadATM() {
    for(let account of accountPopulate) {
        accounts.set(account[0], new Account(account[0],account[1], account[2], account[3]));
    }
}

function runLogin() {
    if (errorCount >= maxError) {
        console.log("TOO MANY ERRORS.");
        runProgram = 0;
        return;
    }

    let id = Number(PROMPT.question('\nPlease type in your ID: '));
    let name = PROMPT.question('Please enter in your name: ');
    let numPIN = Number(PROMPT.question('\nPlease enter your PIN number: '));

    if (!accounts.has(id)) {
        console.log('ERROR INVALID CREDENTIALS!');
        errorCount++;
        return;
    }

    let foundAccount = accounts.get(id);

    if (!foundAccount.name === name) {
        console.log('ERROR INVALID CREDENTIALS!');
        errorCount++;
        return;
    }
    if (!foundAccount.PINCheck(numPIN)) {
        console.log('ERROR INVALID CREDENTIALS!');
        errorCount++;
        return;
    }
    login = foundAccount;

}

function runLogout() {
    login = 0;
    return;
}

function activateATM() {
    if(!login) {
        runLogin();
        return;
    }
    ATMManager();
}

function displayATMMenu() {
    let output = "";
    for (let key of ATM_MENU.keys()) {
        output += key + ": " + ATM_MENU.get(key)[0] +'\n';
    }
    console.log(output);
    console.log("Account Balance: $" + login.balance);
    console.log("Your Wallet: $" + wallet);
}

function ATMManager() {
    displayATMMenu();
    let option = PROMPT.question("Choice: ").toUpperCase();
    if (!ATM_MENU.has(option)) {
        console.log('\nThis is not a valid menu choice');
        return;
    }
    ATM_MENU.get(option)[1]();
}

function doWithdrawal() {
    let amount = Number(PROMPT.question('\nHow much money do you wish to withdraw: '));
    if(login.withdrawal(amount)) {
        wallet += amount;
    }
    if (isNaN(amount)) {
        console.log("ERROR, INSUFFICIENT WITHDRAWL AMOUNT")
        setExit();
    }
}

function doDeposit() {
    let amount = Number(PROMPT.question('\nHow much do you wish to deposit:  '));
    if(amount > wallet) {
        console.log("Insuffiecent funds");
        return;
    }
    if(isNaN(amount)) {
        console.log("INVALID DEPOSIT AMOUNT");
        setExit();
    }
    wallet -= amount;
    login.deposit(amount);
}

function doTransfer() {
    let id = Number(PROMPT.question('\nPlease type in the destination ID: '));
    if (!accounts.has(id)) {
        console.log('ERROR: ACCOUNT NOT FOUND');
        return login;
    }
    let foundAccount = accounts.get(id);
    let amount = Number(PROMPT.question('\nHow much money do you wish to transfer: '));
    if (isNaN(amount)) {
        console.log("ERROR, NOT A VALID INPPUT!");
        setExit();
    }
    login.transfer(foundAccount,amount);
    console.log(login);
    console.log(foundAccount);
}

function setExit() {
    runProgram = 0;
}