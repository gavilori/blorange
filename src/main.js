'use strict';

// global variables
let keySPACE;
let keyLEFT;
let keyRIGHT;
let keyUP;
let keyDOWN;
let keyShift;
let MOVE_SPEED 

// main game object
let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 640,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Move,Push,Switch,Play]
};

let game = new Phaser.Game(config);