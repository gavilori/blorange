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
        this.end = this.sound.add('win');
        this.cursorPos = 1;
        this.cursorPosx = game.config.width/2-150;
        this.cursorPosy = game.config.height/2-200;
        this.menu = false;
        this.press1 = false;
        this.press2 = false;
        this.screen = 1;
        
        
        this.grid_orange = this.add.tileSprite(false, false, game.config.width, game.config.height, 'grid4').setOrigin(0);
        this.grid_orange.alpha = 1

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


        this.player1 = new Player(this, game.config.height/2-10, game.config.height/2+160,'p1', 0, true).setOrigin(0);
        this.player2 = new Player(this, game.config.height/2+10, game.config.height/2+160,'p2', 0, false).setOrigin(0);

        this.mirror = new Player(this, game.config.height/2+10, game.config.height/2-160,'mirror', 0, false).setOrigin(0);


        this.players = this.add.group();
        this.players.add(this.player1);
        this.players.add(this.player2);

        this.boxC = this.add.group();

        this.physics.add.collider(this.players,this.boxC);
        this.game_finish = this.physics.add.collider(this.players,this.mirror,()=>{
            bgm.setLoop(false);
            bgm.stop();
                this.add.rectangle(game.config.width/2, game.config.height/2,640,32,0x0).setDepth(1);
                this.add.text(game.config.width/2, game.config.height/2, "GAME CLEAR", this.textConfig).setOrigin(0.5).setDepth(1);
                if(!this.end.isPlaying){
                    this.end.play();
                    }
                this.time.delayedCall(2500, () => {
                    
                    final_bgm.setLoop(false);
                    final_bgm.stop();
                    this.scene.start("menuScene");
                    }, null, this);
        });

        this.game_finish.overlapOnly = true;
            

            
        

        
        this.player1.alpha=(1);
        for(let i = -1;i<0;i++){ //column
            for(let j = 0;j<=20;j++){ // row
                let const_box = this.physics.add.sprite(i*32, j*32,'const').setOrigin(0).setSize(33,33);
                const_box.body.immovable = true;
                this.boxC.add(const_box);
                
            }
        }

       
            for(let j = 0;j<=20;j++){ // row
                let const_box = this.physics.add.sprite(640, j*32,'const').setOrigin(0).setSize(33,33);
                const_box.body.immovable = true;
                this.boxC.add(const_box);
                
            }

            for(let j = 0;j<=20;j++){ // row
                let const_box = this.physics.add.sprite(j*32, -32,'const').setOrigin(0).setSize(33,33);
                const_box.body.immovable = true;
                this.boxC.add(const_box);
                
            }

            for(let j = 0;j<=20;j++){ // row
                let const_box = this.physics.add.sprite( j*32,640,'const').setOrigin(0).setSize(33,33);
                const_box.body.immovable = true;
                this.boxC.add(const_box);
                
            }
        


        
       this.switch = this.sound.add('switch');
       this.end = this.sound.add('win');
    }

    update() {
        this.grid_orange.tilePositionX+=SCROLL_SPEED;
        
        console.log("THIS PLAYER IN CONTROL: "+this.screen);
        

       

        
        
        if(!this.menu){
            
        if(!this.press1||!this.press2){
        if(Phaser.Input.Keyboard.JustDown(keyShift)){
            this.switch.play();
            console.log("IN THE SWITCH");
        switch(this.screen){
            case 1:
                this.screen = 2;
                
                this.player2.alpha=1;
                break;
            case 2:
                this.screen = 1;
                
                this.player1.alpha=(1);
                break;

        }

    }

        console.log(keyDOWN.isDown);
        if(keyDOWN.isDown){
            this.player1.body.setVelocityY(this.MOVE_SPEED);
            this.player2.body.setVelocityY(this.MOVE_SPEED);
        }else if(keyUP.isDown){
            this.player1.body.setVelocityY(-this.MOVE_SPEED);
            this.player2.body.setVelocityY(-this.MOVE_SPEED);
        }else{
            this.player1.body.setVelocityY(0);
            this.player2.body.setVelocityY(0);
        }

        if(keyLEFT.isDown){
            this.player1.body.setVelocityX(-this.MOVE_SPEED);
            this.player2.body.setVelocityX(-this.MOVE_SPEED);
        }else if(keyRIGHT.isDown){
            this.player1.body.setVelocityX(this.MOVE_SPEED);
            this.player2.body.setVelocityX(this.MOVE_SPEED);
        }else{
            this.player1.body.setVelocityX(0);
            this.player2.body.setVelocityX(0);
        }

        
   


        
    }
}
}

}