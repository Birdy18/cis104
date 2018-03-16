
"use strict"
const PROMPT = require('readline-sync');

let inWeapons = ["Blaster", "Spreader", "Concussion", "Sniper", "Melee", ];

const SPLAT_MENU = new Map()
    .set('A', ["Choose Weapon", chooseWeapon])
    .set('B',["Choose Armor", chooseArmor])
    .set('C',["Choose Upgrade", chooseUpgrade]);

class Weapon {
    constructor(name, minDamage, maxDamage, ammo, minRange, maxRange) {
        weapon.name = name;
        weapon.minDamage = minDamage;
        weapon.maxDamage = maxDamage;
        weapon.ammo = ammo;
        weapon.minRange = minRange;
        weapon.maxRange = maxRange;
    }
}
class Armor {
    constructor(name, upDefense, cost) {
        armor.name = name;
        armor.upDefense = upDefense;
        armor.cost = cost;
    }
}
class Upgrade {
    constructor(name, effect) {
        upgrade.name = name;
        upgrade.effect = [];
    }
}
class Avatar {
    constructor(name, color, weapon, armor, upgrade) {
        this.name = name;
        this.color = color;
        this.weapon = Weapon;
        this.armor = Armor;
        this.upgrade = Upgrade;
    }
}