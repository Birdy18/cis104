/**
 *  Author: Trevor M. Birdsall
 *  Version: 1.0.0
 *  Purpose: In-game stats in karts
 */

"use strict"
const PROMPT = require('readline-sync');

const populateKart = {

}

const KART_MENU = new Map()
    .set('A',[""])

class Kart {
    constructor(kartName, kartSpeed, kartAcceleration, kartWeight, kartHandling, kartOffRoad) {
        this.kartName = kartName;
        this.kartSpeed = kartSpeed;
        this.kartAcceleration = kartAcceleration;
        this.kartWeight = kartWeight;
        this.kartHandling = kartHandling;
        this.kartOffRoad = kartOffRoad;
    }


}

class Tires {
    constructor(tiresName, speed, acceleration, weight, handling, offRoad) {
        this.tiresName = tiresName;

    }
}