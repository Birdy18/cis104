"use strict";
const BLIB = require('./birdlib');

let runProgram = 1;
let amount = 100;
const clients = [
    [1222, "Trevor Birdsall", amount]
];


class Client {
    constructor(id, name, funds) {
        this.id = id;
        this.name = name;
        this.funds = amount;
    }

    sumPurchases() {
        let output = 0;
        if(!this.purchases.length) {
            return output;
        }
        for (let purchase of this.purchases) {
            output += purchase;
        }
        return output;
    }
    numClients() {
        return this.client.length
    }
    toString() {
        return this.client;
    }
    static display() {
        return `${this.id}, ${this.name}, ${this.funds}`
    }
}

function main() {
    beautySalon();
}

main();

function beautySalon() {
    console.log("A: Add Client");
    console.log("B: Delete Client");
    console.log("C: Show Transaction");
    console.log("D: List Clients");
    console.log("E: Load");
    console.log("F: Save");
    console.log("G: Exit");

    let input = BLIB.getKeyboard("Choice: ").toUpperCase();
    if(!input) {
        console.log('\nERROR, NOT A VALID CHOICE!');
        return;
    }

    switch(input) {
        case "A":
            addClients();
            break;
        case "B":
            deleteClient();
            break;
        case "C":
            showTransaction();
            break;
        case "D":
            listClients();
            break;
        case "E":
            loadClient();
            break;
        case "F":
            saveClient();
            break;
        case "G":
            setExit();
            break;
        default:
            console.log("NOT A VALID INPUT, PLEASE TRY AGAIN");
            break;
    }
}

function addClients() {
    let id = BLIB.getNumber('\nPlease enter your ID number: ');
    let name = BLIB.getKeyboard('\nPlease enter your name:  ');
    let funds = BLIB.getNumber('\nHow much have you contributed? ');
    let new_Client = new Client(id, name, funds);
    clients.push(new_Client);
    console.log(listClients());
    return beautySalon();

}

function deleteClient(id) {
    let deleteClient;
    listClients();
    while (!deleteClient || deleteClient < 0 || deleteClient > client.length - 1) {
        deleteClient = BLIB.getKeyboard('\nPlease enter the client ID number you want to delete: ');
        if ((!deleteClient || deleteClient < 0 || deleteClient > client.length - 1 || !deleteClient === clients.id)) {
            console.log(`${deleteClient} IS INVALID, PLEASE TRY AGAIN`);
        }
        else {
            client.splice(deleteClient, 1);
        }
    }
}

function showTransaction() {

}

function compareClients() {
    return b.client - a.client;
}

function sortClients() {
    clients.sort(compareClients);
}

function listClients() {
    console.clear();
    let i = 1;
    for (let client of clients) {
        console.log(`${i}.`);
        console.log(client.toString());
        i++;
    }
    return beautySalon();
}

function loadClient() {
    let clientFile = IO.readFileSync('data/client_data.csv' , 'utf8');
    let lines = clientFile.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        client.push(lines[i].toString().split(/,/));
    }
    return beautySalon();
}

function setExit() {
    runProgram = 0;
}