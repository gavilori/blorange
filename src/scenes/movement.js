class Move extends Phaser.Scene {
    constructor() {
        super("moveScene");
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
        this.add.text(game.config.width/2, game.config.height/2, "Arrow keys to move", this.textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2-50, "Shift to switch between blue and orange", this.textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2-200, "PRESS SPACE NEXT SCENE", this.textConfig).setOrigin(0.5);

        this.player1 = new Player(this, 64, game.config.height/2,'p1', 0, true).setOrigin(0);
        this.player2 = new Player(this, 576, game.config.height/2,'p2', 0, false).setOrigin(0);
        this.player1.body.immovable=true;

        this.players = this.add.group();
        this.players.add(this.player1);
        this.players.add(this.player2);

        this.player2.alpha=(0.5);
        this.player1.alpha=(1);


        
       this.switch = this.sound.add('switch');
       this.end = this.sound.add('win');
    }

    update() {
        console.log("THIS PLAYER IN CONTROL: "+this.screen);
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('pushScene');    
        }
        if(!this.press1||!this.press2){
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
   


        
    }
}
}