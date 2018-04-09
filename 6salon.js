"use strict";
const BLIB = require('./birdlib');
const IO = require('fs');

let continueResponse;
let numClients, menuChoice;
let client = [];
let runProgram = 1;
let limitCoupon = 750;
function main() {
    if (continueResponse !== 0 && continueResponse !== 1) {
        setContinueResponse();
    }
    while (continueResponse === 1) {
        const ADD_CLIENT = 0; DELETE_CLIENT = 1;
    }
    loadClient();
    console.log(client);
    setMenuChoice();
    switch (menuChoice) {
        case 1: modifyClient(ADD_CLIENT);
            break;
        case 2: modifyClient(DELETE_CLIENT);
            break;
        case 3:
            break;
        case 4: listClients();
            break;
        case 5:
            break;
        case 6:
            break;
        case 7: setExit();
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

function modifyClient(ADD_DELETE) {
    console.clear();
    let count = 1;
    if (ADD_DELETE === ADD_CLIENT) {
        while (numClients > 0) {
            let numClient = client.length;
            client[newClient] = [];
            console.log('Client ${count}:');
            while(!client[newClient][0] || !/^[0-9 -]{4}$/.test(client[newClient][0])) {
                client[newClient][0] = BLIB.getNumber('\nPlease enter your ID number ');
                if (! /^[0-9 -]{4}$/.test(client[newClient][0])) {
                    console.log(`${client[newClient[0]]} IS INVALID, PLEASE TRY AGAIN! `)
                }
            }
            while(!client[newClient][1] || !/^[a-zA-Z -]{1,30}$/.test(client[newClient][1])) {
                client[newClient][1] = BLIB.getKeyboard('\nPlease enter your first name ');
                if (! /^[a-zA-Z -]{1,30}$/.test(client[newClient][1])) {
                    console.log(`${client[newClient[1]]} IS INVALID, PLEASE TRY AGAIN! `)
                }
            }
            while(!client[newClient[2]] || !/^[a-zA-Z -]{1,40}$/.test(client[newClient[2]])) {
                client[newClient][2] = BLIB.getKeyboard('\nPlease enter your last name ');
                if (! /^[a-zA-Z -]{1,40}$/.test(client[newClient[2]])) {
                    console.log(`${client[newClient][2]} IS INVALID, PLEASE TRY AGAIN! `)
                }
            }
            let client[newClient][3] = BLIB.getNumber()
            console.log(``);
            count++;
            numClient++;
        }
    } else {
        let deleteClient;
        deleteClient = BLIB.getKeyboard('\nWould you like to delete student? [0=no][1=yes] ');
        if (deleteClient === 1) {
            client.splice(deleteClient, 1)
        }
        else {
            return;
        }
    }
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
    process.stdout.write('\x1B[2J\x1B[0f');
    const COLUMNS = 5;
    console.log(`ID   FIRST    LAST   `);
    for (let i = 0; i < client.length; i++) {
        process.stdout.write(`${i}   `);
        for (let j = 0; j < COLUMNS; j++) {
            if (j < COLUMNS - 1) {
                process.stdout.write(`${client[i][j]}, `);
            } else {
                process.stdout.write(`${client[i][j]}\n `);
            }
        }
    }
}

function setExit() {
    runProgram = 0;
}