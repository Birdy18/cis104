/*
    Author: Trevor Birdsall
    Class: CIS 104
    Version: 1.0
    Purpose: To find the total cost of the house

 */

const BASE = 50000;
const BEDCOST = 17000;
const BATHCOST = 12500;
const CARCOST = 6000;
const rls = require('readline-sync');

function ask_question(question_text) {
    console.clear();
    let get_value = rls.question(question_text);
    if(isNaN(get_value)) {
        throw "Invalid input! Not a number!";
    }
    return get_value;
}

function main() {
    console.clear();
    var nameComp = "River Falls Homes Construction Company";
    try {
        var lotnum = ask_question("What is your lot number? ");
        var bednum = ask_question("How many bedrooms? ");
        var bathnum = ask_question("How many bathroooms? ");
        var carnum = ask_question("How many cars in the garage? ");
    }
    catch(err) {
        console.log(err);
        return;
    }

    var total_bed_cost = BEDCOST * bednum;
    var total_bath_cost = BATHCOST * bathnum;
    var total_car_cost = CARCOST * carnum;
    var total_cost = BASE + total_bed_cost + total_bath_cost + total_car_cost;
    console.log("TotalCost = " + total_cost);
}

main();