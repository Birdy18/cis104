/**
 * Author: Trevor Birdsall
 * Version: 1.0.0
 * Reason: This is a final exam, has a little bit of all that was taught
 */

"use strict";
const IO = require('fs');
const BLIB = require('./birdlib.js');
const PROMPT = require('readline-sync');

const BROTHERS_DATA = [['Mario', 20, 24, 15, 'Hammer'], ['Luigi', 31, 18, 17, 'Thunder Hand']];
const ENEMY_DATA = new Map()
    .set('Goomba', ['Goomba', 10, 18, 10, "Headbonk"])
    .set('Koopa Troopa', ['Koopa Troopa', 15, 15, 13, "Shell Dash"])
    .set('Pokey',['Pokey', 30, 12, 14, "Spike Topple"])
    .set('Bowser',['Bowser', 54, 22, 22, "FireBall"]);

const SCENARIOS = new Map()
    .set(1, ['Goomba', 'Goomba', 'Koopa Troopa'])
    .set(2, ['Goomba', 'Koopa Troopa', 'Pokey'])
    .set(3, ['Koopa Troopa', 'Koopa Troopa', 'Bowser']);

let runRPG = 1;
let heroes = [];
let beaten = [];

class Fighter {
    constructor(name, health, attack, defense, weapon) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.weapon = weapon;
    }

    onTurn(targets) {
        // run code against my target.
    }

    getHit(source) {
        let damage = source.attack - this.defense;
        if(damage < 1) {
            damage = 1;
        }
        this.health -= damage;
        return damage;
    }

    doAttack(target) {
        let results = target.getHit(this);
        console.log(`${this.name} strikes ${target.name} with ${this.weapon} for ${results} damage!`);
        if(target.health < 1) {
            console.log(`${target.name} is defeated! Kapow!`);
        }
        // This function has to call target.getHit(this).
        // it should also display results of attack. Make it sound cool.
    }

}

class Hero extends Fighter {
    constructor(name, health, attack, defense,weapon) {
        super(name, health, attack, defense,weapon);
    }

    onTurn(targets) {
        // implement choices here!
        // Do I attack? do I defend? Throw in an extra number! match it aginst 1-5 for critical hits or etc.
        console.log('------- Enemies -------');
        for (let i = 0; i < targets.length; i++) {
            console.log(`${i+1}: ${targets[i].name} [Health: ${targets[i].health}]`);
        }
        let target;
        while(!target) {
            let choice = BLIB.getNumber("'\nPick an enemy: ");
            if(targets[choice-1]) {
                target = targets[choice-1];
            }
            else {
                console.log("Not a valid target! They are numbered in order.")
            }
        }

        this.doAttack(target);
    }

}

class Enemy extends Fighter {
    constructor(name, health, attack, defense, weapon) {
        super(name, health, attack, defense,weapon);
    }

    onTurn(targets) {
        // Enemies don't have player choice! AI chooses target randomly.
        let target = targets[Math.floor(Math.random()*targets.length)];

        this.doAttack(target);
    }
}


/*
Create bosses as above. Replace onTurn(target) with the AI decision making for that boss.

Parameters work like this:
Health is how much HP it has.
Attack is how much damage it does.
Defense reduces damage taken, minimum 1 damage no matter what.

 */

function main() {
    console.clear();
    while(runRPG) {
        runMenu();
    }
}

main();

function runMenu() {
    console.log('A: Choose Scenario');
    console.log('B: Save Data');
    console.log('C: Load Data');
    console.log('D: Quit');
    let choice = BLIB.getKeyboard('\nEnter Choice: ').toUpperCase();
    switch(choice) {
        case 'A':
            pickScenario();
            break;
        case 'B':
            saveData();
            break;
        case 'C':
            loadData();
            break;
        case 'D':
            runRPG = 0;
            break;
        default:
            console.log('\nERROR, NOT A CHOICE! ');
            break;
    }
}

function pickScenario() {
    let scenario_ids = Array.from(SCENARIOS.keys())
    scenario_ids.sort((a, b) => {return a - b});

    for (let id of scenario_ids) {
        let beat = beaten.includes(id);
        let tag = '';
        if(beat) {
            tag = ' [Beaten]';
        }
        console.log(`${id}: ${SCENARIOS.get(id).join(', ')}${tag}`);
    }
    let choice;
    let numChoice;
    while(!choice) {
        numChoice = BLIB.getNumber('\nPick Scenario ID: ');
        if(SCENARIOS.has(numChoice)) {
            choice = SCENARIOS.get(numChoice);
        }
        else {
            console.log('\nNOT A CHOICE, PLEASE TRY AGAIN! ');
        }
    }

    if(runScenario(choice)) {
        // If the heroes win...
        // Add the scenario ID to beaten.
        beaten.push(numChoice);
        console.log("Don't forget to save!");
    }
    else {
        console.log("Better luck next time.");
    }

}

function saveData() {
    IO.writeFileSync('mario.sav', beaten.join(' '), 'utf8');
    console.log("Game saved!");
}

function loadData() {
    beaten = [];
    let loadFile = IO.readFileSync('mario.sav', 'utf8');
    let data = loadFile.toString().split(' ');
    for (let id of data) {
        beaten.push(Number(id));
    }
}

// This function returns True if the Heroes win, False if they lose.
function runScenario(scenario) {
    // Create the Mario Bros heroes for player!
    heroes = [];

    for (let hero of BROTHERS_DATA) {
        let brother = new Hero(hero[0], hero[1], hero[2], hero[3], hero[4]);
        heroes.push(brother);
    }

    // Now we load enemy data!
    let enemies = [];

    for (let edata of scenario) {
        let data = ENEMY_DATA.get(edata);
        let enemy = new Enemy(data[0], data[1], data[2], data[3], data[4]);
        enemies.push(enemy);
    }

    let results;
    let clash;

    while(true) {
        // First the heroes go.
        console.log("Heroes Turn!");


        clash = runTurn(heroes, enemies, "steps up to the plate!");
        if(clash[0]) {
            console.log("The heroes win!");
            results = true;
            break;
        }
        else {
            enemies = clash[1];
        }

        console.log("Enemies turn!");
        clash = runTurn(enemies, heroes, "steps up against the heroes!");
        if(clash[0]) {
            console.log("The heroes lose!");
            results = false;
            break;
        }
        else {
            heroes = clash[1];
        }
    }
    return results;

}

// Return true if the actors (the ones taking their turn) beat the victims. Return False if no conclusion.
// We return copies of the input because .filter() does not change an array, it creates a new array. So we have to
// return the data that changed.

function runTurn(actors, victims, description) {
    for(let actor of actors) {
        console.log(`${actor.name} ${description}! Remaining HP: ${actor.health}`);
        actor.onTurn(victims);
        victims = victims.filter(victim => victim.health > 0);
        if(!victims.length) {
            return [true, victims];
        }
    }
    return [false, victims];
}
/*
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

/*
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
/*
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
/*
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
/*
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
/*
function fightNBrio() {
    let bossHealth = 10;
    console.clear();
    let min = Math.ceil(1);
    let max = Math.floor(20);
    console.log('\nYou arrive at Cortex s Castle where you enter Dr. N Brio s lab.  N Brio is mixing his chemicals when he engages you in a fight! ');
    while(true) {
        let bossAttack = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log('\nBrio throws a flask on tile ' + bossAttack + '!');
        let yourPosition = BLIB.getNumber('\nWhere are you before you get hit with the lab flask? ');
        if (yourPosition === bossAttack) {
            console.clear();
            console.log('\nOh no! you got hit! ');
            yourHP -= bossAttack;
            console.log('\nYour HP: ' + yourHP + '');
        }
        let counter = console.log('\nWhats your next move? [0=dodge][1=attack]');
        if (counter === 0) {
            console.clear();
            console.log('\nYou chose to dodge! ');
        }
        if (counter === 1) {
            console.clear();
            console.log('\nYou attack N.Brio!');
            bossHealth -= yourHit;
            console.log('\nDr N.Brio: ' + bossHealth + '');
        }
    }
}

/**
 * @method
 * @desc Dr N.Cortex boss fight mutator
 * @returns {void}
 */
/*
function fightDrNCortex() {
    let bossHealth = 5;
}

/**
 * @method
 * @desc Boss record view mutator
 * @returns {void}
 */
/*
function viewBossRecord() {

}
*/
