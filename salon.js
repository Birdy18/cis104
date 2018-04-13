"use strict";
const BLIB = require('./birdlib');
const IO = require('fs');

let masterFile = [], newTransactions = [], coupons = [], noclientFile = [];

function main() {
    loadClient();
    loadTransaction();
}

main();

function errClients(newClient) {//Adding new client into noclientFile array
    if(noclientFile !== []) {
        let test = true;
        for(let i = 0; i < noclientFile.length; i++) {
            if(newClient === noclientFile[i]) {
                test = false;
                break;
            }
        }
        if(test) {
            noclientFile.push(newClient);
        }
    } else {
        noclientFile.push(newClient);
    }
}

function addClientPricePaid() {//Find client within master file
    let test = false;
    const LENGTH_TO_ARRAY_VALUE = Number(1);
    for(let i = 0; i < newTransactions.length; i++) {
        for(let j = 0; j < masterFile.length; j++) {
            if(newTransactions[i][0] === masterFile[j][0]) {
                masterFile[j][3] += newTransactions[i][2];
            }
            if(j === masterFile.length - LENGTH_TO_ARRAY_VALUE) {
                errClients(newTransactions[i][0]);
            }
        }
    }
}

function makeCoupon() {
    const CouponAmount = 750;
    for (let i = 0; i < masterFile.length; i++ ) {
        if (masterFile[i][3] >= CouponAmount ) {
            coupons.push(`Customer ${masterFile[i][1]} ${masterFile[i][2]} has recieved a coupon.`)
        }
    }
}

function loadClient() {
    let clientFile = IO.readFileSync('data/client_data.csv' , 'utf8');
    let lines = clientFile.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        masterFile.push(lines[i].toString().split(/,/));
    }
}
function loadTransaction() {
    let transFile = IO.readFileSync('data/transdata_data.csv' , 'utf8');
    let lines = transFile.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
        newTransactions.push(lines[i].toString().split(/,/));
    }
}

function printCoupon() {
    for (let i = 0; i < coupons.length; i++) {
        console.log(coupons[i]);
    }
}