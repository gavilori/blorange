class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('grid', './assets/art/bg.png');
        this.load.image('grid2', './assets/art/bg2.png');
        this.load.image('grid3', './assets/art/grid.png');
        this.load.image('bbox', './assets/art/box_2.png');
        this.load.image('obox', './assets/art/box_1.png');
        this.load.image('p1', './assets/art/player_1.png');
        this.load.image('p2', './assets/art/player_2.png');
        this.load.audio('switch', './assets/audio/switch.wav');
        this.load.audio('win', './assets/audio/victory.wav');
        this.load.audio('switch', './assets/audio/switch_press.wav');
        this.load.image('cursor', './assets/art/Cursor.png');
        this.load.audio('press', './assets/audio/switch_press.wav');

    }

    create() {
        this.cursorPos = 1;
        this.cursorPosx = game.config.width/2-150;
        this.cursorPosy = game.config.height/2-200;
        
        this.menu = false;
       
        this.grid = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'grid').setOrigin(0);

         // define keys
         this.MOVE_SPEED = 100;
         keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
         keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
         keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
         keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
         keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
         keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
         keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
         keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.textConfig = {
            fontFamily: "Verdana",
            fontSize: '20px',
            color: '#dedede',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.createMenu();

  
    }

    update() {
        console.log("CURSOR POS"+this.cursorPos);
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            
            switch (this.menu) {
                case false:
                    this.createMenu();
                    this.menu = true
                    break;
                case true:
                    this.deleteMenu();
                    this.menu = false;
                    break;
                default:
                    break;
            }   
        }



        
            if(Phaser.Input.Keyboard.JustDown(keyUP)&&this.cursorPos>1){
            this.cursorPos--;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)&&this.cursorPos<3){
            this.cursorPos++;
        }
        switch(this.cursorPos){
            case 1:
                this.cursorPosy = game.config.height/2-200;
                this.cursor.y = this.cursorPosy;
                break;
            case 2:
                this.cursorPosy = game.config.height/2-100;
                this.cursor.y = this.cursorPosy;
                break;
            case 3:
                this.cursorPosy = game.config.height/2;
                this.cursor.y = this.cursorPosy;
                break;

        }


        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            switch (this.cursorPos) {
                case 1:
                    this.scene.start('moveScene');
                    break;
                case 2:
                    this.scene.start('levelScene');
                    break;
                case 3:
                    this.scene.start('moveScene');
                    break;
            
                default:
                    break;
            }
        }
    






        // everything that should happen when menu is not active
       
    }
createMenu(){

    this.test = this.add.rectangle(32, 32, 576, 576, 0x088F8F).setOrigin(0);
    this.restart = this.add.text(game.config.width/2, game.config.height/2-200, "Tutorial", this.textConfig).setOrigin(0.5);
    this.level = this.add.text(game.config.width/2, game.config.height/2-100, "Level select", this.textConfig).setOrigin(0.5);
    this.credits = this.add.text(game.config.width/2, game.config.height/2, "Credits", this.textConfig).setOrigin(0.5);
    this.cursor = this.add.sprite(this.cursorPosx, this.cursorPosy,'cursor').setOrigin(0.5);
}

}