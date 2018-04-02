
"use strict"
const PROMPT = require('readline-sync');

let inWeapons = ["Blaster", "Spreader", "Concussion", "Sniper", "Melee", ];

const weaponPopulate = [
    ["Standard", inWeapons[0], 10, 20 ,25, 3, 4 ],
    ["Bumble_Rumble", inWeapons[0], 15, 30, 25, 3, 4],
    ["Pink_Fushisha", inWeapons[0], 25, 45, 25, 3, 4],
    ["Icy_Tractor", inWeapons[0], 35, 55, 30, 3, 4],

]

//const SPLAT_MENU = new Map()
    //.set('A', ["Choose Weapon", chooseWeapon])
    //.set('B',["Choose Armor", chooseArmor])
    //.set('C',["Choose Upgrade", chooseUpgrade]);

class Weapon {
    constructor(name, type, minDamage, maxDamage, ammo, minRange, maxRange) {
        weapon.name = name;
        weapon.type = type;
        weapon.minDamage = minDamage;
        weapon.maxDamage = maxDamage;
        weapon.ammo = ammo;
        weapon.minRange = minRange; //Cells
        weapon.maxRange = maxRange; //Cells
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
        upgrade.effect = effect;
    }
}
class Avatar {
    constructor(name, level, color, weapon, armor, upgrade) {
        this.name = name;
        this.level = levelup.level;
        this.color = color;
        this.weapon = Weapon;
        this.armor = Armor;
        this.upgrade = Upgrade;
    }
}
class Experience {
    constructor(smallKO, mediumKO, largeKO, nextEXP) {
        experience.small = smallKO;
        experience.medium = mediumKO;
        experience.large = largeKO;
        experience.next = nextEXP;
    }
}

function main() {

}

main();

function LevelUp() {

}

