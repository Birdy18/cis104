"use strict";
const BLIB = require('./birdlib');
const IO = require('fs');

let continueResponse;
let numClients, menuChoice;
let client = [];
let runProgram = 1;
let limitCoupon = 750;
function main() {
    setContinueResponse();
    console.log(client);
    setMenuChoice();
    switch (menuChoice) {
        case 1: addClient();
            break;
        case 2: deleteClient();
            break;
        case 3:
            break;
        case 4: listClients();
            break;
        case 5: loadClient();
            break;
        case 6: setExit();
            break;
    }
}

main();

function setMenuChoice() {
    menuChoice = -1;
    while (menuChoice !== 1 && menuChoice !== 2 && menuChoice !== 3 && menuChoice !== 4 && menuChoice !== 5 && menuChoice !== 6 && menuChoice !== 7) {
        menuChoice = BLIB.getNumber(
            `\tPlease choose an option from the menu: 
            \t\t1) Add Client
            \t\t2) Delete Client
            \t\t3) Show Transaction
            \t\t4) List Clients
            \t\t5) Save
            \t\t6) Load
            \t\t7) Exit
            \t\tChoose: `
        )
    }
}

function addClient(newClient) {
    console.clear();
    let count = 1;
    client[newClient] = [];
    let numClient = client.length;
    client[newClient] = [];
    console.log('Client ${count}:');
    while (!client[newClient][0] || !/^[0-9 -]{4}$/.test(client[newClient][0])) {
        client[newClient][0] = BLIB.getNumber('\nPlease enter your ID number ');
        if (!/^[0-9 -]{4}$/.test(client[newClient][0])) {
            console.log(`${client[newClient][0]} IS INVALID, PLEASE TRY AGAIN! `)
        }
    }
    while (!client[newClient][1] || !/^[a-zA-Z -]{1,30}$/.test(client[newClient][1])) {
        client[newClient][1] = BLIB.getKeyboard('\nPlease enter your first name ');
        if (!/^[a-zA-Z -]{1,30}$/.test(client[newClient][1])) {
            console.log(`${client[newClient][1]} IS INVALID, PLEASE TRY AGAIN! `)
        }
    }
    while (!client[newClient][2] || !/^[a-zA-Z -]{1,40}$/.test(client[newClient][2])) {
        client[newClient][2] = BLIB.getKeyboard('\nPlease enter your last name ');
        if (!/^[a-zA-Z -]{1,40}$/.test(client[newClient][2])) {
            console.log(`${client[newClient][2]} IS INVALID, PLEASE TRY AGAIN! `)
        }
    }
    client[newClient][3] = BLIB.getNumber('\nHow much have you contributed? ');
    if (client[newClient][3] >= limitCoupon) {
        console.log('\nCONGRADULATIONS! YOU EARNED A COUPON! ')
    }
    console.log(``);
    count++;
    numClient++;
    client.push(client);
}

function deleteClient() {
    let deleteClient;
    listClients();
    while (!deleteClient || deleteClient < 0 || deleteClient > client.length - 1) {
        deleteClient = BLIB.getKeyboard('\nPlease enter the client ID number you want to delete: ');
        if ((!deleteClient || deleteClient < 0 || deleteClient > client.length - 1)) {
            console.log(`${deleteClient} IS INVALID, PLEASE TRY AGAIN`)
        }
}
    client.splice(deleteClient, 1);
}

function setContinueResponse() {
    if (continueResponse) {
        continueResponse = -1;
        while (continueResponse !== 0 && continueResponse !== 1) {
            continueResponse = BLIB.getNumber('\nDo you want to continue? [0=no, 1=yes]: ')
        }
    } else {
        continueResponse = 1;
    }
}

function showTransaction() {

}

function loadClient() {
    let clientFile = IO.readFileSync('data/client_data.csv' , 'utf8');
    let lines = clientFile.toString().split(/\r?\n/);
    for (let line of lines) {
        client.push(line.toString().split(/,/));
    }
}

function setCoupon() {

}

function listClients() {
    console.clear();
}

function setExit() {
    runProgram = 0;
}