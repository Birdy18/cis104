"use strict";
const PROMPT = require('readline-sync');

let accounts = new Map();
let base = 1000.00;

const accountPopulate = [
    [1, "Trevor Birdsall",base,1998],
    [2, "Rocky",base,4000],
    [3, "Jiminy Cricket",base,1556]
];

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
        return this.cardName + this.number + this.PIN + this.balance.toString();
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
        return this.balance;
    }

    deposit(amount) {
        this.balance += amount;
        return this.balance;
    }
    transfer(destination, source, funds) {
        destination.deposit(amount);
        source.withdrawl(amount);
    }
}

function loadATM() {
    for(let account of accountPopulate) {
        accounts.set(account[0], new Account(account[0],account[1], account[2], account[3]));
    }
}

function main() {
    loadATM();

    let acc = accounts.get(1);
    let acc2 = accounts.get(2);
    acc.withdrawal(500);
    acc.withdrawal(250);
    acc2.withdrawal(300);
    console.log(acc);

    for (let a of accounts.values()) {
        console.log(a);
    }
}

main();