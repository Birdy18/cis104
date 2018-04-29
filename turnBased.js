"use strict";
const IO = require('fs');
const BLIB = require('./birdlib.js');

const HERO_DATA = new Map()

class Unit {
    constructor(name, title, type, weapon, level, HP, ATK, SPD, DEF, RES) {
        this.name = name;
        this.title = title;
        this.type = type;
        this.weapon = weapon;
        this.level = level;
        this.health = HP;
        this.attack = ATK;
        this.speed = SPD;
        this.defense = DEF;
        this.resistance = RES;
    }
    getHit(source) {
        if (this.type = 'Physical') {
            let damage = source.attack - this.defense;
            if (damage >= this.defense) {
                damage = 0
            }
            this.health -= damage;
            return damage;
        }
        if (this.type = 'Magic') {
            let damage = source.attack - this.resistance;
            if (damage >= this.resistance) {
                damage = 0;
            }
            this.health -= damage;
            return damage;
        }
    }
}