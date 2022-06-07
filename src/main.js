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
let Boss = "open"

let sub1 = "open";
let sub2 = "open";
let sub3 = "open";
let sub4 = "open";


// main game object
let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 640,
    autoCenter: false,
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
    scene: [Menu,Move,Push,Switch,Level,Level1,Level2,Level3,Level4,Final,Chamber1]
};

let game = new Phaser.Game(config);
