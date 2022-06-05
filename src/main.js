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
let keyTAB;
let MOVE_SPEED;
let bgm;
let menu_bgm;
let first = true;
let SCROLL_SPEED = 2;
let level1 = "open";
let level2 = "lock";
let level3 = "lock";
let level4 = "lock";
let Boss = "Lock"


// main game object
let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 640,
    autoCenter: false,
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
    scene: [Menu,Move,Push,Switch,Level,Level1,Level2,Level3,Level4]
};

let game = new Phaser.Game(config);
