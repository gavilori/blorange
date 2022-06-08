class Prologue extends Phaser.Scene {
    constructor() {
        super("prologueScene");
    }

    preload() {
        this.load.image('prologue', './assets/art/prologue.png');
    }

    create() {
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.textConfig = {
            fontFamily: "Verdana",
            fontSize: '15px',
            color: '#dedede',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let shadowConfig = {
            fontFamily: "Verdana",
            fontSize: '15px',
            color: '#0a0a0a',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.test = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'prologue').setOrigin(0);
        
        this.add.sprite(game.config.width/4+8, game.config.height/2-50, 'menu_item').setOrigin(0.5).setDisplaySize(280,80);
        this.add.sprite(3*game.config.width/4-8, game.config.height/2-50, 'menu_item').setOrigin(0.5).setDisplaySize(280,80);
        this.add.sprite(game.config.width/4+8, game.config.height/2+50, 'menu_item').setOrigin(0.5).setDisplaySize(280,80);
        this.add.sprite(3*game.config.width/4-8, game.config.height/2+50, 'menu_item').setOrigin(0.5).setDisplaySize(280,80);


        //text shadow
        this.add.text(game.config.width/4+10, game.config.height/2-48, "One day, Blorange finds a\nstrange mirror.", shadowConfig).setOrigin(0.5);
        this.add.text(3*game.config.width/4-6, game.config.height/2-48, "They go up to investigate it,\nbut the mirror absorbs the Orange\nout of them, separating the two!", shadowConfig).setOrigin(0.5);
        this.add.text(game.config.width/4+10, game.config.height/2+52, "The mirror disappears, and Blue\nis suddenly placed in an odd\ndungeon.", shadowConfig).setOrigin(0.5);
        this.add.text(3*game.config.width/4-6, game.config.height/2+52, "Orange also appears to be in the\nsame dungeon, except something\nseems...different about it.", shadowConfig).setOrigin(0.5);

        //text
        this.add.text(game.config.width/4+8, game.config.height/2-50, "One day, Blorange finds a\nstrange mirror.", this.textConfig).setOrigin(0.5);
        this.add.text(3*game.config.width/4-8, game.config.height/2-50, "They go up to investigate it,\nbut the mirror absorbs the Orange\nout of them, separating the two!", this.textConfig).setOrigin(0.5);
        
        this.add.text(game.config.width/4+8, game.config.height/2+50, "The mirror disappears, and Blue\nis suddenly placed in an odd\ndungeon.", this.textConfig).setOrigin(0.5);
        this.add.text(3*game.config.width/4-8, game.config.height/2+50, "Orange also appears to be in the\nsame dungeon, except something\nseems...different about it.", this.textConfig).setOrigin(0.5);
        
        this.add.text(game.config.width/2, game.config.height-16, "Press [ESC] or [ENTER] to go to Level Select", this.textConfig).setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC) || Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('levelScene');
        }
    }
}