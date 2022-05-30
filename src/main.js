'use strict';

// global variables
let keySPACE;
let keyLEFT;
let keyRIGHT;
let keyUP;
let keyDOWN;
let keyShift;
let keyESC;
let keyENTER;
let MOVE_SPEED;
let level1 = "open";
let level2 = "open";
let level3 = "open";
let level4 = "open";


// main game object
let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 640,
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu,Move,Push,Switch,Level,Level1,Level2]
};

let game = new Phaser.Game(config);
