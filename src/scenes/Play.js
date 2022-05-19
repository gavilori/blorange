class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('grid', './assets/bg.png');
        this.load.image('bbox', './assets/box_2.png');
        this.load.image('obox', './assets/box_1.png');
        this.load.image('p1', './assets/player_1.png');
        this.load.image('p2', './assets/player_2.png');

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
            fontSize: '40px',
            color: '#dedede',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.switch1 = this.add.rectangle(32,576,32,32, 0xFFFF0000).setOrigin(0);
        this.switch2 = this.add.rectangle(576,32,32,32, 0xFFFF0000).setOrigin(0);
        this.player1 = this.physics.add.sprite(64, game.config.height/2,'p1').setOrigin(0);
        this.player2 = this.physics.add.sprite(576, game.config.height/2,'p2').setOrigin(0);
        this.orangeBox = this.physics.add.sprite(96, game.config.height/2,'obox').setOrigin(0);
        this.orangeBox.body.allowGravity = false;
        this.blueBox = this.physics.add.sprite(544, game.config.height/2+30,'bbox').setOrigin(0);
        this.blueBox.body.allowGravity = false;
        this.player1.body.immovable=true;
        this.physics.add.collider(this.player1, this.orangeBox);
        this.physics.add.collider(this.player2, this.blueBox);
        this.players = this.add.group();
        this.players.add(this.player1);
        this.players.add(this.player2);

        this.player2.alpha=(0.5);
        this.player1.alpha=(1);
        this.middle = this.add.rectangle(game.config.width/2,320,32,640, 0x9966ff);
        
        this.physics.add.existing(this.middle);
        this.physics.add.existing(this.switch1);
        this.physics.add.existing(this.switch2);
        this.middle.body.immovable = true;
        this.middle.body.allowGravity = false;
        this.switch1.body.immovable = true;
        this.switch1.body.allowGravity = false;
        this.switch2.body.immovable = true;
        this.switch2.body.allowGravity = false;
       this.checkSwitch =  this.physics.add.collider(this.switch1,this.orangeBox, ()=>{
        this.press1 = true
    });
       this.checkSwitch.overlapOnly = true;
       this.checkSwitch2 =  this.physics.add.collider(this.switch2,this.blueBox, ()=>{
        this.press2 = true
    });
       this.checkSwitch2.overlapOnly = true;
        
        
    }

    update() {
        console.log("THIS PLAYER IN CONTROL: "+this.screen);
        if(this.press1&&this.press2){
            this.add.text(game.config.width/2, game.config.height/2, "END OF DEMO", this.textConfig).setOrigin(0);

        }
        if(!this.press1||!this.press2){
        if(Phaser.Input.Keyboard.JustDown(keyShift)){
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
}