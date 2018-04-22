/**
 * Author: Trevor Birdsall
 * Version: 1.0.0
 * Reason: This is a final exam, has a little bit of all that was taught
 */

"use strict";
const IO = require('fs');
const BLIB = require('./birdlib.js');
const PROMPT = require('readline-sync');
let yourHP = 3;
let yourHit = 1;
let bossHit = 1;
let defeat = 0;

function main() {
    bossMenu();
}

main();

function bossMenu() {
    console.log('A: Fight Papu Papu');
    console.log('B: Fight Ripper Roo');
    console.log('C: Fight Koala Kong');
    console.log('D: Fight Pinstripe Potoroo');
    console.log('E: Fight Dr N.Brio');
    console.log('F: Fight Dr.Neo Cortex');
    console.log('G: View Boss Records');

    let input = BLIB.getKeyboard('Choice: ').toUpperCase();
    if (! input) {
        console.log('\nNOT A VALID MENU CHOICE, PLEASE TRY AGAIN! ');
        return;
    }
    switch(input) {
        case 'A': fightPapuPapu();
            break;
        case 'B': fightRipperRoo();
            break;
        case 'C': fightKoalaKong();
            break;
        case 'D': fightPinstripe();
            break;
        case 'E': fightNBrio();
            break;
        case 'F': fightDrNCortex();
            break;
        case 'G': viewBossRecord();
            break;
    }
}

function fightPapuPapu() {
    console.clear();
    let bossHealth = 5;
    let min = Math.ceil(1);
    let max = Math.floor(30);
    console.log('\nPapu Papu is asleep in his tribal throne, but you crashing through the roof woke him up, making him very angry! He walks to the center of his hut and whacks down his staff...');
    while (true) {
        let bossAttack = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log('\nPapu Papu whacks his staff on tile ' + bossAttack + "!");
        let yourPosition = BLIB.getNumber('\nWhere are you before he attacks? ');
        if (yourPosition < min || yourPosition > max) {
            console.clear();
            console.log('\nNo! Papu Papu hits you! ');
            yourHP -= bossHit;
            console.log('Your HP: ' + yourHP + '');
        }
        if (yourPosition === bossAttack) {
            console.clear();
            yourHP -= bossHit;
            console.log('\nYour HP: ' + yourHP + '');
        }
        else {
            console.clear();
            console.log('\nYou dodged his attack! ');
        }
            let choice = BLIB.getNumber('\nWhat is your next move? [0=dodge, 1=attack] ');
        if (choice < 0 || choice > 1) {
            console.clear();
            console.log('\nNot a valid choice! ');
        }
        if (choice === 1) {
            console.clear();
            bossHealth -= yourHit;
            console.log('\nPapu Papu: ' + bossHealth + '');
        }
        if (choice === 0) {
            console.clear();
            console.log('\nYou chose to dodge! ');
        }
        if (yourHP === defeat) {
            console.log('\nGame Over');
            return bossMenu();
        }
        if (bossHealth === defeat) {
            console.log('\nYou defeated Papu Papu! You bounce on the unconcious Papu Papu s belly and escape his hut! ');
            return bossMenu();
        }
    }
}

function fightRipperRoo() {
    console.clear();
    let bossHealth = 3;
    let min = Math.ceil(1);
    let max = Math.floor(9);
    let bomb = 1;
    console.log('You are at a waterfall when all of a sudden, a crazy blue kangaroo in a straight-jacket comes bouncing in and attacks you!');
    while (true) {
        let bossAttack = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log('\nRipper Roo bounces to square ' + bossAttack + '.');
        let yourPosition = BLIB.getNumber('\nWhat tile are you on before Ripper Roo pounces on you? ');
        if (yourPosition < min || yourPosition > max) {
            console.clear();
            console.log('\nOh no, Ripper Roo pounced you!');
            yourHP -= bossHit;
            console.log('Your HP: ' + yourHP + '');
        }
        let bombPosition = Math.floor(Math.random() * (max - min + 1)) + min;
        console.clear();
        console.log('\nThe bomb is on tile ' + bombPosition + '');
        if (yourPosition === bombPosition) {
            console.log('\nYou kick the bomb at Ripper Roo ');
            bossHealth -= bomb;
            console.log('Ripper Roo: ' + bossHealth + '');
        }
        if (bossAttack === bombPosition) {
            console.clear();
            console.log('\nRipper Roo foolishly lands on a dangerous platform! ');
            bossHealth -= bomb;
            console.log('Ripper Roo: ' + bossHealth + '');
        }
        if (yourHP === defeat) {
            console.log('\nGame Over ');
            return bossMenu();
        }
        if (bossHealth === defeat) {
            console.log('\nYou defeated Ripper Roo, you leap over to the other side while the knocked-out Ripper Roo lies motionless on the platform ');
            return bossMenu();
        }
    }
}

function fightKoalaKong() {
    console.clear();
    let bossHealth = 4;
    let min = Math.ceil(1);
    let max = Math.floor(6);
    let rock = 1;
    console.log('\nYou travel to the caverns when a rail path for minecarts stand between you and a muscular koala with yellow pants taunts you, gorging you to fight! ');
    while(true) {
        let bossAttack = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log('\nKoala Kong takes a giant boulder and chucks it at you at position ' + bossAttack + '');
        let yourPosition = BLIB.getNumber('\nWhere are you before the rock hits you? ');
        if (yourPosition < min || yourPosition > max) {
            console.clear();
            console.log('Oh no! The rock hits you! ');
            yourHP -= rock;
            console.log('Your HP: ' + yourHP + '');
        }
        if (yourPosition === bossAttack) {
            console.clear();
            console.log('Oh no, the rock hit you! ');
            yourHP -= rock;
            console.log('Your HP: ' + yourHP + '');
        }
        console.log('Oh no! TNT Crates are falling! ');
        let cratePosition1 = Math.floor(Math.random() * (max - min + 1)) + min;
        let cratePosition2 = Math.floor(Math.random() * (max - min + 1)) + min;
        if (yourPosition === cratePosition1 || yourPosition === cratePosition2) {
            console.log('You got hit by the TNT! ');
            yourHP -= bossHit;
            console.log('Your HP: ' + yourHP + '');
        }
        console.log('Koala throws his last rock at you before taunting you by flexing his furry body, get him!');
        let rockPosition = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log('\nIt lands at position ' + rockPosition + '');
        let yourCounter = BLIB.getNumber('\nWhere will you move? ');
        if (rockPosition === yourCounter) {
            console.clear();
            console.log('\nYou spin the rock back at him! Make him pay for taunting you! ');
            bossHealth -= rock;
            console.log('Koala Kong: ' + bossHealth + '');
        }
        if (yourHP === defeat) {
            console.clear();
            console.log('\nGame Over');
            return bossMenu();
        }
        if (bossHealth === defeat) {
            console.log('\nYou defeated Koala Kong! He jumps on the railing to intimidate you before a minecart rolls by and carries him away! ');
            return bossMenu();
        }
    }
}

function fightPinstripe() {
    let bossHealth = 6;
}

function fightNBrio() {
    let bossHealth = 10;
}

function fightDrNCortex() {
    let bossHealth = 5;
}

function viewBossRecord() {

}