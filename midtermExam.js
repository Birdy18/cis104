/**
 * Author: Trevor M. Birdsall
 * Version: 1.0.0
 * Purpose: The Mid-Term Exam
 */

"use strict";
const PROMPT = require('readline-sync');

let base = 1000.00;

let login, account, Withdrawl,transferAccount;
let accounts = new Map();
let runProgram = 1;
let error = 0;
let maxError = 3;
const accountPopulate = [
    [1, "Trevor Birdsall",1998,base],
    [2, "Rocky",4000,base],
    [3, "Jiminy Cricket",1556,base]
];

const ATM_MENU = new Map()
    .set('A',["Withdrawl",displayWithdrawl] )
    .set('B',["Deposit",renderDeposit ])
    .set('C',["Transfer",transferFunds])
    .set('E',["Exit", setExit]);

class Account {
    constructor(id, cardName, number, PIN) {
        this.id = id;
        this.cardName = cardName;
        this.number = number;
        this.PIN = PIN;
        this.funds = base;
}
    addAccount() {
        let account = PROMPT.question('\nType in your account');
        let new_account = new Account(cardName, number, PIN);
        this.account.push(new_account);
    }
    toString() {
        return this.cardName + this.number + this.PIN + this.funds.toString();
    }

    login(cardName, number, PIN) {
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
    }

    PINCheck(checkPIN) {
        if(this.PIN === checkPIN) {
            return true;
        }
        return false;
    }
    withdrawal(amount) {
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
    let id =Number(PROMPT.question('\nPlease type in your ID.'));
    let name = PROMPT.question('Please enter in your name');
    let numPIN = Number(PROMPT.question('\nPlease enter your PIN number.'));
    if (!accounts.has(id)) {
        console.log('ERROR INVALID CREDENTIALS!');
        return;
    if (!accounts.has(name)) {
        console.log('ERROR INVALID CREDENTIALS!');
        return;
        }
    if (!accounts.has(numPIN)) {
        consle.log('ERROR INVALID CREDENTIALS!');
        return;
        }
    }
    let acc = accounts.get(id);
    if (accounts.login(id, name, numPIN)) {
        let login = acc;
    } else {
        error ++;
        if (error === maxError) {
            console.log('ERROR: TOO MANY ERRORS!');
            runProgram = 0;
            return;
        }
    }


    // Run the login check. IF SUCCESSFUL, get the account object from accounts, set login = the retrieved account!
}

function activateATM() {
    if(!login) {
        runLogin();
        return;
    }
    displayATMMenu();
}

function displayATMMenu() {
    let output = "";
    for (let key of ATM_MENU.keys()) {
        output += key + ": " + ATM_MENU.get(key)[0] +'\n';
    }
    let choice = PROMPT.question("Please choose a Choice: ").toUpperCase();

    if (! output.length > 0) {
        return "";
    }
    console.log(output);

}

function ATMManager() {
    displayATMMenu();
    let option = PROMPT.question("Choice: ");
    if (!ATM_MENU.has(choice)) {
        console.log('\nThis is not a valid menu choice');
        return;
    }
    ATM_MENU.get(choice)[0]();
}

function displayWithdrawl() {
    Withdrawl = base - this.deposit;
}

function renderDeposit() {
    let amount = PROMPT.question('\nHow much do you wish to deposit ');
    userAccount.deposit(amount);
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