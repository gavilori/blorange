class Level extends Phaser.Scene {
    constructor() {
        super("levelScene");
    }

    preload() {
        this.load.image('grid', './assets/art/bg.png');
        this.load.image('bbox', './assets/art/box_2.png');
        this.load.image('obox', './assets/art/box_1.png');
        this.load.image('p1', './assets/art/player_1.png');
        this.load.image('p2', './assets/art/player_2.png');
        this.load.audio('switch', './assets/audio/switch.wav');
        this.load.audio('win', './assets/audio/victory.wav');
        this.load.image('cursor', './assets/art/Cursor.png');

    }

    create() {
        this.cursorPos = 1;
        this.cursorPosx = game.config.width/2-150;
        this.cursorPosy = 200;
        
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
       
       
        let levels = [];
        levels[1] = level1;
        levels[2] = level2;
        levels[3] = level3;
        levels[4] = level4;
        let count  = 1;
        this.selects = [];
        for(let i=96;i<+608;i+=128){
            this.add.text(i, 150, "level "+count, this.textConfig).setOrigin(0.5);
            this.selects[count]=new Select(this, i, 160,64, 64, 0xFF0000,levels[count]).setOrigin(0);
            this.add.text(i, 220, levels[count], this.textConfig).setOrigin(0);
            count++;
        }
        this.createMenu();
        this.deleteMenu();

  
    }

    update() {
        



        
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)&&this.cursorPos>1){
            this.cursorPos--;
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)&&this.cursorPos<4){
            this.cursorPos++;
        }
        switch(this.cursorPos){
            case 1:
                this.cursorPosx = this.selects[1].x;
                this.cursor.x = this.cursorPosx;
                break;
            case 2:
                this.cursorPosx = this.selects[2].x;
                this.cursor.x = this.cursorPosx;
                break;
            case 3:
                this.cursorPosx = this.selects[3].x;
                this.cursor.x = this.cursorPosx;
                break;
            case 4:
                this.cursorPosx = this.selects[4].x;
                this.cursor.x = this.cursorPosx;
                break;

        }


        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            switch (this.cursorPos) {
                case 1:
                    this.scene.start('level1Scene');
                    break;
                case 2:
                    this.scene.start('level2Scene');
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
    this.cursor = this.add.sprite(this.cursorPosx, this.cursorPosy,'cursor').setOrigin(0.5);
}

deleteMenu(){
    this.test.alpha = 0;
    this.restart.alpha = 0;
    this.level.alpha = 0;
    
}

}