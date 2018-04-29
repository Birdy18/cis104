/**
 * Author: Trevor Birdsall
 * Version: 1.0.0
 * Reason: This is a final exam, has a little bit of all that was taught
 */

"use strict";
const IO = require('fs');
const BLIB = require('./birdlib.js');
const PROMPT = require('readline-sync');

const BROTHERS_DATA = [['Mario', 35, 43, 24, 'Hammer'], ['Luigi', 59, 32, 29, 'Thunder Hand'], ['Trevor', 52, 36, 28, 'Punch'], ['Rocky', 50, 30, 35, 'Butt Bash']];
const ENEMY_DATA = new Map()
    .set('Goomba', ['Goomba', 10, 18, 10, "Headbonk"])
    .set('Koopa Troopa', ['Koopa Troopa', 15, 15, 13, "Shell Dash"])
    .set('Pokey',['Pokey', 30, 12, 14, "Spike Topple"])
    .set('Cheep Cheep', ['Cheep Cheep', 20, 12, 18, "Fishy Tackle"])
    .set('Urchin', ['Urchin',5, 30, 30, "Urchin Launchin!"])
    .set('Blooper', ['Blooper',40, 17, 15, "Ink Shot"])
    .set('Eel', ['Eel', 25, 33, 13, "Big Bite"])
    .set('Fire Bro', ['Fire Bro', 23, 31, 13, "Fireball"])
    .set('Boomerang Bro', ['Boomerang Bro', 45, 17, 15, "Boomerang Throw"])
    .set('Hammer Bro', ['Hammer Bro', 33, 25, 22, 'Hammer Throw'])
    .set('Bowser',['Bowser', 54, 22, 22, "FireBall"])
    .set('Dry Bowser', ['Dry Bowser', 110, 36, 30, "Bone Throw"]);

const SCENARIOS = new Map()
    .set(1, ['Goomba', 'Goomba', 'Koopa Troopa'])
    .set(2, ['Goomba', 'Koopa Troopa', 'Pokey'])
    .set(3, ['Koopa Troopa', 'Koopa Troopa', 'Bowser'])
    .set(4, ['Goomba', 'Koopa Troopa', 'Pokey', 'Bowser'])
    .set(5, ['Cheep Cheep', 'Blooper'])
    .set(6, ['Urchin', 'Eel'])
    .set(7, ['Hammer Bro', 'Fire Bro'])
    .set(8, ['Boomerang Bro'])
    .set(9, ['Hammer Bro', 'Fire Bro', 'Boomerang Bro'])
    .set(10,['Dry Bowser']);

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

/**
 * @returns
 * @desc Menu activation mutator
 * @returns {null}
 */
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

/**
 * @method
 * @desc Choosing scenario mutator
 * @returns {null}
 */
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

/**
 * @method
 * @desc Saving data mutator
 * @returns {null}
 */
function saveData() {
    IO.writeFileSync('mario.sav', beaten.join(' '), 'utf8');
    console.log("Game saved!");
}

/**
 * @method
 * @desc Loading data mutator
 * @returns {null}
 */
function loadData() {
    beaten = [];
    let loadFile = IO.readFileSync('mario.sav', 'utf8');
    let data = loadFile.toString().split(' ');
    for (let id of data) {
        beaten.push(Number(id));
    }
}

/**
 * @method
 * @param scenario
 * @desc This activates all of the data of both enemies and heroes as well as the battling involved
 * @returns {*}
 */
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
        clash = runTurn(enemies, heroes, "steps up against the heroes!" );
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
/**
 * @method
 * @param actors
 * @param victims
 * @param description
 * @desc This runs the turns and what's going on in those turns
 * @returns {*[]}
 */
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