/**
 * Author: Trevor Birdsall
 * Version: 1.0.0
 * Reason: This is a final exam, has a little bit of all that was taught
 */

"use strict";
const IO = require('fs');
const BLIB = require('./birdlib.js');
const PROMPT = require('readline-sync');
const BOSSES = ["Papu Papu", "Ripper Roo", "Koala Kong", "Pinstripe Potoroo", "Dr. N Brio", "Dr.Neo Cortex"];
let yourHP = 3;
let yourHit = 1;
let bossHit = 1;
let defeat = 0;

class Boss {
    constructor(name) {
        this.name = name;
        this.defeats = [];
    }
    toString() {
        return `${this.name}: $${this.defeatCount()}`;
    }
}

function main() {
    console.clear();
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

/**
 * @method
 * @desc Papu Papu boss fight mutator
 * @returns {void}
 */
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
            console.log('\nOh no! You got hit by his staff!');
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
            console.log('\nYou chose to attack! ');
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
            this.name[0] += defeatCount;
            return bossMenu();
        }
    }
}

/**
 * @method
 * @desc Ripper Roo boss fight mutator
 * @returns {void}
 */
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

/**
 * @method
 * @desc Koala Kong boss fight mutator
 * @returns {void}
 */
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

/**
 * @method
 * @desc Pinstripe Potoroo boss fight mutator
 * @returns {void}
 */
function fightPinstripe() {
    let bossHealth = 6;
    console.clear();
    let min = Math.ceil(1);
    let max = Math.floor(3);
    console.log('\nYou arrive at Dr.Cortex Power Plant, where you are attacked by his bodyguard and his tommy gun! ');
    while (true) {
        let bossAttack = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log('\nPinstripe begins to fire his tommy gun at you at position ' + bossAttack + '!');
        let yourPosition = BLIB.getNumber('\nWhere are you when he shoots at you? [1= Stand still][2= The chair][3= The table] ');
        if (yourPosition === 1) {
            console.clear();
            console.log('\nYou choose to stand still!');
            console.log('\nOh no, he shot you!');
            yourHP -= bossHit;
            console.log('\nYour HP: ' + yourHP + '');
        }
        if (yourPosition === 2) {
            console.clear();
            console.log('\nYou choose to go near the chair! ');
            let duck = BLIB.getNumber('\nDo you want to duck? [0=no][1=yes] ');
            if (yourPosition === bossAttack && duck === 0) {
                console.clear();
                console.log('\nOh on, you got hit! ');
                yourHP -= bossHit;
                console.log('\nYour HP: ' + yourHP + '');
            }
            if (duck === 1) {
                console.clear();
                console.log('\nYou ducked to avoid gunfire! ');
            }
            console.log('\nLook, Pinstripe s gun is malfunctioning! ');
            let counter = BLIB.getNumber('\nWhat do you want to do? [0=evade][1=attack]');
            if (counter === 0) {
                console.clear();
                console.log('\nYou chose to evade! ');
            }
            if (counter === 1) {
                console.clear();
                console.log('\nYou chose to attack Pinstripe! ');
                bossHealth -= yourHit;
                console.log('\nPinstripe Potoroo: ' + bossHealth + '');
            }
        }
        if (yourPosition === 3) {
            console.clear();
            console.log('\nYou choose to go near the table! ');
            let duck1 = BLIB.getNumber('\nDo you want to duck? [0=no][1=yes] ');
            if (duck1 === 0) {
                console.clear();
                console.log('\nOh on, you got hit! ');
                yourHP -= bossHit;
                console.log('\nYour HP: ' + yourHP + '');
            }
            if (duck1 === 1) {
                console.clear();
                console.log('\nYou ducked to avoid gunfire! ');
            }
            console.log('\nLook, Pinstripe s gun is malfunctioning! ');
            let counter = BLIB.getNumber('\nWhat do you want to do? [0=evade][1=attack]');
            if (counter === 0) {
                console.clear();
                console.log('\nYou chose to evade! ');
            }
            if (counter === 1) {
                console.clear();
                console.log('\nYou chose to attack Pinstripe! ');
                bossHealth -= yourHit;
                console.log('\nPinstripe Potoroo: ' + bossHealth + '');
            }
        }
        if (yourHP === defeat) {
            console.clear();
            console.log('\nGame Over ');
            return bossMenu();
        }
        if (bossHealth === defeat) {
            console.clear();
            console.log('\nYou defeated Pinstripe Potoroo, he spins around, his tommy gun goes off damaging the core of the power plant, shutting it down.  Pinstripe passes out from exhaustion while a lamp falls on him, knocking him out! ');
        }
    }
}

/**
 * @method
 * @desc Dr.N Brio boss fight mutator
 * @returns {void}
 */
function fightNBrio() {
    let bossHealth = 10;
    console.clear();
    let min = Math.ceil(1);
    let max = Math.floor(20);
    console.log('\nYou arrive at Cortex s Castle where you enter Dr. N Brio s lab.  N Brio is mixing his chemicals when he engages you in a fight! ');
    while(true) {

    }
}

/**
 * @method
 * @desc Dr N.Cortex boss fight mutator
 * @returns {void}
 */
function fightDrNCortex() {
    let bossHealth = 5;
}

/**
 * @method
 * @desc Boss record view mutator
 * @returns {void}
 */
function viewBossRecord() {

}