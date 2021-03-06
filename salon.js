/**
* Author: Trevor Birdsall
* Version: 1.0.0
* Purpose: To load files
 */

"use strict";
const IO = require('fs');

let masterFile = [], newTransactions = [], coupons = [], noclientFile = [];

function main() {
    loadClient();
    loadTransaction();
    addClientPricePaid();
    makeCoupons();
    sortError();
    errorReport();
    writeMasterFile();
    printCoupon();
}

main();

/**
 *
 * @param newClient
 * @returns {null}
 */
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
                masterFile[j][3] = Number(masterFile[j][3]) + Number(newTransactions[i][2]);
                break;
            }
            if(j === masterFile.length - LENGTH_TO_ARRAY_VALUE) {
                errClients(newTransactions[i][0]);
            }
        }
    }
}

function makeCoupons() {
    const CouponAmount = 750;
    for (let i = 0; i < masterFile.length; i++ ) {
        if (masterFile[i][3] >= CouponAmount ) {
            coupons.push(`Customer ${masterFile[i][1]} ${masterFile[i][2]} has received a coupon.`)
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
    console.clear();
    for (let i = 0; i < coupons.length; i++) {
        console.log(coupons[i]);
    }
}

function writeMasterFile() {
    for (let i = 0; i < masterFile.length; i++) {
        if (masterFile[i]) {
            for (let j = 0; j < masterFile[i].length; j++) {
                if (j < masterFile[i].length - 1) {
                    IO.appendFileSync(`data/dataX.csv`, `${masterFile[i][j]},`);
                } else if (i < masterFile.length - 1) {
                    IO.appendFileSync('data/dataX.csv', `${masterFile[i][j]}\n`);
                } else {
                    IO.appendFileSync('data/dataX.csv', `${masterFile[i][j]}`);
                }
            }
        }
    }
    IO.unlinkSync(`data/client_data.csv`);
    IO.renameSync(`data/dataX.csv`, `data/client_data.csv`);
}

function errorReport() {
    for (let i = 0; i < noclientFile.length; i++) {
        IO.appendFileSync(`data/noclientdata.csv`, `${noclientFile[i]} does not exist!\n`);
    }
}

function sortError() {
    let temp;
    let k;
    for (let i = 0; i < noclientFile.length; i++) {
        for (let j = 0; j < noclientFile.length; -i-1) {
            k = Number(j) + 1;
            if (noclientFile[j] < noclientFile[k]) {
                temp = noclientFile[j];
                noclientFile[j] = noclientFile[k];
                noclientFile[k] = temp;
            }
        }
    }
}

