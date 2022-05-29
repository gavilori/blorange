class Push extends Phaser.Scene {
    constructor() {
        super("pushScene");
    }

    preload() {
        this.load.image('grid', './assets/art/bg.png');
        this.load.image('bbox', './assets/art/box_2.png');
        this.load.image('obox', './assets/art/box_1.png');
        this.load.image('p1', './assets/art/player_1.png');
        this.load.image('p2', './assets/art/player_2.png');
        this.load.audio('switch', './assets/audio/switch.wav');
        this.load.audio('win', './assets/audio/victory.wav');

    }

    create() {
        this.cursorPos = 1;
        this.cursorPosx = game.config.width/2-150;
        this.cursorPosy = game.config.height/2-200;
        this.menu = false;
        this.press1 = false;
        this.press2 = false;
        this.screen = 1;
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
        this.add.text(game.config.width/2, game.config.height/2, "MENU SCENE", this.textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2-50, "Blue pushes blue box", this.textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2-200, "PRESS SPACE NEXT SCENE", this.textConfig).setOrigin(0.5);
        this.player1 = new Player(this, 64, game.config.height/2,'p1', 0, true).setOrigin(0);
        this.player2 = new Player(this, 576, game.config.height/2,'p2', 0, false).setOrigin(0);
        this.orangeBox = this.physics.add.sprite(96, game.config.height/2,'obox').setOrigin(0);
        this.orangeBox.body.allowGravity = false;
        this.blueBox = this.physics.add.sprite(544, game.config.height/2+30,'bbox').setOrigin(0);
        this.blueBox.body.allowGravity = false;
        //this.player1.body.immovable=true;
        this.physics.add.collider(this.player1, this.orangeBox);
        this.physics.add.collider(this.player2, this.blueBox);
        this.players = this.add.group();
        this.players.add(this.player1);
        this.players.add(this.player2);

        this.player2.alpha=(0.5);
        this.player1.alpha=(1);

        




        
       this.switch = this.sound.add('switch');
       this.end = this.sound.add('win');


  
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

       

        if(this.menu){
            this.player2.body.setVelocityX(0);
            this.player1.body.setVelocityY(0);
            this.player1.body.setVelocityX(0);
            this.player2.body.setVelocityY(0);
            if(Phaser.Input.Keyboard.JustDown(keyUP)&&this.cursorPos>1){
            this.cursorPos--;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)&&this.cursorPos<2){
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
            // case 3:
            //     this.cursorPosy = game.config.height/2;
            //     this.cursor.y = this.cursorPosy;
            //     break;

        }


        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            switch (this.cursorPos) {
                case 1:
                    this.scene.start(this);
                    break;
                case 2:
                    this.scene.start('menuScene');
                    break;
                case 3:
                    this.scene.start('moveScene');
                    break;
            
                default:
                    break;
            }
        }
    }






        // everything that should happen when menu is not active
        if(!this.menu){
            if(Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.scene.start('switchScene');    
            }
        if(Phaser.Input.Keyboard.JustDown(keyShift)){
            this.switch.play();
            console.log("IN THE SWITCH");
        switch(this.screen){
            case 1:
                this.screen = 2;
                this.player1.alpha=(0.5);
                this.player2.alpha=1;
                break;
            case 2:
                this.screen = 1;
                this.player2.alpha=(0.5);
                this.player1.alpha=(1);
                break;

        }

        }

     console.log(keyDOWN.isDown);
        if(keyDOWN.isDown&&this.screen == 1){
            this.player1.body.setVelocityY(this.MOVE_SPEED);
        }else if(keyUP.isDown&&this.screen == 1){
            this.player1.body.setVelocityY(-this.MOVE_SPEED);
        }else{
            this.player1.body.setVelocityY(0);
        }

        if(keyLEFT.isDown&&this.screen == 1){
            this.player1.body.setVelocityX(-this.MOVE_SPEED);
        }else if(keyRIGHT.isDown&&this.screen == 1){
            this.player1.body.setVelocityX(this.MOVE_SPEED);
        }else{
            this.player1.body.setVelocityX(0);
        }

        if(keyDOWN.isDown&&this.screen == 2){
            this.player2.body.setVelocityY(this.MOVE_SPEED);
        }else if(keyUP.isDown&&this.screen == 2){
            this.player2.body.setVelocityY(-this.MOVE_SPEED);
        }else{
            this.player2.body.setVelocityY(0);
        }

        if(keyLEFT.isDown&&this.screen == 2){
            this.player2.body.setVelocityX(-this.MOVE_SPEED);
        }else if(keyRIGHT.isDown&&this.screen == 2){
            this.player2.body.setVelocityX(this.MOVE_SPEED);
        }else{
            this.player2.body.setVelocityX(0);
        }


        this.orangeBox.body.setVelocityX(0);
        this.orangeBox.body.setVelocityY(0);
        this.blueBox.body.setVelocityX(0);
        this.blueBox.body.setVelocityY(0);


        
        }
    }
createMenu(){

    this.test = this.add.rectangle(32, 32, 576, 576, 0x6666ff).setOrigin(0);
    this.restart = this.add.text(game.config.width/2, game.config.height/2-200, "Restart", this.textConfig).setOrigin(0.5);
    this.level = this.add.text(game.config.width/2, game.config.height/2-100, "Menu", this.textConfig).setOrigin(0.5);
    this.cursor = this.add.sprite(this.cursorPosx, this.cursorPosy,'cursor').setOrigin(0.5);
}

deleteMenu(){
    this.test.alpha = 0;
    this.restart.alpha = 0;
    this.level.alpha = 0;
    this.cursor.alpha = 0;
}
}