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
        if (yourPosition < 1 || yourPosition > 30) {
            console.log('\nNo! Papu Papu hits you! ');
            yourHP -= bossHit;
            console.log('Your HP: ' + yourHP + '');
        }

        if (yourPosition === bossAttack) {
            yourHP -= bossHit;
            console.log('\nYour HP: ' + yourHP + '');
        }
        else {
            console.log('\nYou dodged his attack! ');
        }
            let choice = BLIB.getNumber('\nWhat is your next move? [0=dodge, 1=attack] ');
        if (choice < 0 || choice > 1) {
            console.log('\nNot a valid choice! ');
        }
        if (choice === 1) {
            bossHealth -= yourHit;
            console.log('\nPapu Papu: ' + bossHealth + '');

        }
        if (choice === 0) {
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
        console.log('\nRipper Roo bounces to square' + bossAttack + '.');
        let yourPosition = BLIB.getNumber('\nWhat tile are you on before Ripper Roo pounces on you? ');
        if (yourPosition > min || yourPosition < max) {
            console.log('\nOh no, Ripper Roo pounced you!');
            yourHP -= bossHit;
            console.log('Your HP: ' + yourHP + '')
        }

        if (bossHealth === defeat) {
            console.log('\nYou defeated Ripper Roo, you leap over to the other side while the knocked-out Ripper Roo lies motionless on the platform ');
            return bossMenu();
        }
    }
}

function fightKoalaKong() {
    let bossHealth = 4;
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