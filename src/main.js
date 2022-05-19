'use strict';

// global variables
let keySPACE;

// main game object
let config = {
    type: Phaser.WEBGL,
    width: 840,
    height: 525,
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
    scene: [Play]
};

let game = new Phaser.Game(config);