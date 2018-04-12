"use strict";
const BLIB = require('./birdlib');

let runProgram = 1;
let client = [];
let wallet = 50;
const clientsPopulate = [
    [1998, "Trevor Birdsall"]
];

const CLIENT_MENU = new Map()
    .set('1',["Add Client", addClients])
    .set('2',["Delete Client", deleteClient])
    .set('3',["Show Transaction", showTransaction])
    .set('4',["List Clients",listClients])
    .set('5',["Exit",setExit]);

class Client {
    constructor(ID, NAME, FUNDS) {
        this.id = ID;
        this.name = NAME;
        this.funds = FUNDS;
    }
    numClients() {
        return this.client.length
    }
    static deleteClient() {
        let deleteClient;
        listClients();
        while (!deleteClient || deleteClient < 0 || deleteClient > client.length - 1) {
            deleteClient = BLIB.getKeyboard('\nPlease enter the client ID number you want to delete: ');
            if ((!deleteClient || deleteClient < 0 || deleteClient > client.length - 1 || !deleteClient === this.id)) {
                console.log(`${deleteClient} IS INVALID, PLEASE TRY AGAIN`)
            }
            client.splice(deleteClient, 1);
        }
    }
    toString() {
        return this.client;
    }
}

function main() {
    console.clear();
    menuManager();
}

main();

function addClients() {
    let id = BLIB.getNumber('\nPlease enter your ID number: ');
    let first = BLIB.getKeyboard('\nPlease enter your first name:  ');
    let last = BLIB.getKeyboard('\nPlease enter your last name:  ');
    let funds = BLIB.getNumber('\nHow much have you contributed? ');
    let new_Client = new Client(first, last, funds);
    client.push(new_Client);
}

function deleteClient() {
    client.deleteClient();
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
    for (let client of clientsPopulate) {
        console.log(client.display);
    }
}

function menuManager() {
    BLIB.displayMenu(CLIENT_MENU);
    let action = CLIENT_MENU.get(BLIB.getOption("Choice: ", CLIENT_MENU.keys()));
    action[1]();
}

function loadClient() {
    let clientFile = IO.readFileSync('data/client_data.csv' , 'utf8');
    let lines = clientFile.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        client.push(lines[i].toString().split(/,/));
    }
}

function setExit() {
    runProgram = 0;
}