class Level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }

    preload() {
        this.load.image('grid', './assets/art/bg.png');
        this.load.image('bbox', './assets/art/box_2.png');
        this.load.image('obox', './assets/art/box_1.png');
        this.load.image('p1', './assets/art/player_1.png');
        this.load.image('p2', './assets/art/player_2.png');
        this.load.image('const', './assets/art/constant.png');
        this.load.audio('switch', './assets/audio/switch.wav');
        this.load.audio('win', './assets/audio/victory.wav');

    }

    create() {
        this.switch1 = false;
        this.switch2 = false;
        this.switch3 = false;
        this.switch4 = false;
        this.cursorPos = 1;
        this.cursorPosx = game.config.width/2-150;
        this.cursorPosy = game.config.height/2-200;
        this.menu = false;
        this.tooltip = true;
        this.press1 = false;
        this.press2 = false;
        this.screen = 1;
        this.grid_blue = this.add.tileSprite(false, false, game.config.width, game.config.height, 'grid2').setOrigin(0);
        this.grid_blue.alpha = 0;
        this.grid_orange = this.add.tileSprite(false, false, game.config.width, game.config.height, 'grid').setOrigin(0);
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

        this.player1 = new Player(this, 288, game.config.height-80,'p1', 0, true).setOrigin(0).setSize(25,25);;
        this.player2 = new Player(this, 288, game.config.height-80,'p2', 0, false).setOrigin(0).setSize(25,25);;


        this.players = this.add.group();
        this.players.add(this.player1);
        this.players.add(this.player2);
        this.boxO = this.add.group();
        this.boxB = this.add.group();
        this.boxC = this.add.group();
        this.player2.alpha=(0);
        this.player1.alpha=(1);
        this.physics.add.collider(this.players,this.boxC,);
        this.physics.add.collider(this.boxB,this.boxC,);
        this.physics.add.collider(this.boxO,this.boxC,);
        this.physics.add.collider(this.player2,this.boxB,(player,box)=>{
            let check = false;
            if(player.body.touching.up){
                for(let i  =0; i<this.boxesB.length;i++){
                
                    if(this.boxesB[i].y==box.y-32&&this.boxesB[i].x==box.x){
                        check = true;
                        break;
                    }
                }
                for(let i  =0; i<this.boxesC.length;i++){
                
                    if(this.boxesC[i].y==box.y-32&&this.boxesC[i].x==box.x){
                        check = true;
                        break;
                    }
                }
                if(!check){
                box.y-=32;
                }
            }else if(player.body.touching.down){
                for(let i  =0; i<this.boxesB.length;i++){
                
                    if(this.boxesB[i].y==box.y+32&&this.boxesB[i].x==box.x){
                        check = true;
                        break;
                    }
                }
                for(let i  =0; i<this.boxesC.length;i++){
                
                    if(this.boxesC[i].y==box.y+32&&this.boxesC[i].x==box.x){
                        check = true;
                        break;
                    }
                }
                if(!check){
                box.y+=32;
                }
            }else if(player.body.touching.left){
                for(let i  =0; i<this.boxesB.length;i++){
                
                    if(this.boxesB[i].x==box.x-32&&this.boxesB[i].y==box.y){
                        check = true;
                        break;
                    }
                }
                for(let i  =0; i<this.boxesC.length;i++){
                
                    if(this.boxesC[i].x==box.x-32&&this.boxesC[i].y==box.y){
                        check = true;
                        break;
                    }
                }
                if(!check){
                box.x-=32;
                }
            }else if(player.body.touching.right){
                for(let i  =0; i<this.boxesB.length;i++){
                
                    if(this.boxesB[i].x==box.x+32&&this.boxesB[i].y==box.y){
                        check = true;
                        break;
                    }
                }
                for(let i  =0; i<this.boxesC.length;i++){
                
                    if(this.boxesC[i].x==box.x+32&&this.boxesC[i].y==box.y){
                        check = true;
                        break;
                    }
                }
                if(!check){
                box.x+=32;
                }
            }


        });


        this.physics.add.collider(this.player1,this.boxO,(playerTwo,boxTwo)=>{
            let check = false;
            if(playerTwo.body.touching.up){
                for(let i  =0; i<this.boxesO.length;i++){
                
                    if(this.boxesO[i].y==boxTwo.y-32&&this.boxesO[i].x==boxTwo.x){
                        check = true;
                        break;
                    }
                }
                for(let i  =0; i<this.boxesC.length;i++){
                
                    if(this.boxesC[i].y==boxTwo.y-32&&this.boxesC[i].x==boxTwo.x){
                        check = true;
                        break;
                    }
                }
                if(!check){
                boxTwo.y-=32;
                }
            }else if(playerTwo.body.touching.down){
                for(let i  =0; i<this.boxesO.length;i++){
                
                    if(this.boxesO[i].y==boxTwo.y+32&&this.boxesO[i].x==boxTwo.x){
                        check = true;
                        break;
                    }
                }
                for(let i  =0; i<this.boxesC.length;i++){
                
                    if(this.boxesC[i].y==boxTwo.y+32&&this.boxesC[i].x==boxTwo.x){
                        check = true;
                        break;
                    }
                }
                if(!check){
                boxTwo.y+=32;
                }
            }else if(playerTwo.body.touching.left){
                for(let i  =0; i<this.boxesO.length;i++){
                
                    if(this.boxesO[i].x==boxTwo.x-32&&this.boxesO[i].y==boxTwo.y){
                        check = true;
                        break;
                    }
                }
                for(let i  =0; i<this.boxesC.length;i++){
                
                    if(this.boxesC[i].x==boxTwo.x-32&&this.boxesC[i].y==boxTwo.y){
                        check = true;
                        break;
                    }
                }
                if(!check){
                boxTwo.x-=32;
                }
            }else if(playerTwo.body.touching.right){
                for(let i  =0; i<this.boxesO.length;i++){
                
                    if(this.boxesO[i].x==boxTwo.x+32&&this.boxesO[i].y==boxTwo.y){
                        check = true;
                        break;
                    }
                }
                for(let i  =0; i<this.boxesC.length;i++){
                
                    if(this.boxesC[i].x==boxTwo.x+32&&this.boxesC[i].y==boxTwo.y){
                        check = true;
                        break;
                    }
                }
                if(!check){
                boxTwo.x+=32;
                }
            }
        
        
        });



        

        let skip = [
            [ false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true],
            [ false, false, false, "switch", false, false, false, false, false, false, false, "switch", false, false, false, false, false, false, true, true],
            [ false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true],
            [ false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false],
            [ true, true, true, "blue", true, true, true, "blue", true, true, true, "blue", true, true, true, true, "blue", true, true, true],
            [ true, true, true, "blue", true, true, true, "blue", true, true, true, "blue", true, true, true, true, "blue", true, true, true],
            [ false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false],
            [ false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, true],
            [ false, false, false, false, false, false, false, "switch", false, false, false, false, false, false, false, false, "switch", false, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true]
        ];


        let skip2 = [
            [ false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true],
            [ false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, true, true],
            [ false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, true],
            [ false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false],
            [ true, true, true, "orange", true, true, true, "orange", true, true, true, "orange", true, true, true, true, "orange", true, true, true],
            [ true, true, true, "orange", true, true, true, "orange", true, true, true, "orange", true, true, true, true, "orange", true, true, true],
            [ false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, false],
            [ false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, false, true],
            [ false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true, false, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true],
            [ false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true]
        ];

       this.boxesB = [];
       this.boxesO = [];
       this.boxesC = [];
       this.switches = [];


       for(let i = 0;i<=20;i++){ //column
        for(let j = 0;j<=20;j++){ // row

            if(!skip[i][j]){
            let const_box = this.physics.add.sprite(i*32, j*32,'const').setOrigin(0);
            const_box.body.immovable = true;
            this.boxC.add(const_box);
            this.boxesC.push(const_box);
            }else if(skip[i][j]=="blue"){
                this.boxesB.push( this.physics.add.sprite(i*32, j*32,'bbox').setOrigin(0)); 
                this.boxesB[this.boxesB.length-1].allowGravity=false;
                this.boxesB[this.boxesB.length-1].setSize(25,25);
                this.boxesB[this.boxesB.length-1].setDisplaySize(32,32);
                this.boxesB[this.boxesB.length-1].alpha = 0;
                this.boxesB[this.boxesB.length-1].body.immovable = true;
                this.boxB.add(this.boxesB[this.boxesB.length-1]);  
            }else if(skip[i][j]=="switch"){
                let switchy = this.add.rectangle(i*32,j*32,32,32,0xFF0000).setOrigin(0)
                this.switches.push(switchy);
                this.physics.add.existing(switchy);
            }
            if(skip2[i][j]=="orange"){
                this.boxesO.push( this.physics.add.sprite(i*32, j*32,'obox').setOrigin(0)); 
                this.boxesO[this.boxesO.length-1].allowGravity=false;
                this.boxesO[this.boxesO.length-1].setSize(25,25);
                this.boxesO[this.boxesO.length-1].setDisplaySize(32,32);
                this.boxesO[this.boxesO.length-1].alpha = 1;
                this.boxesO[this.boxesO.length-1].body.immovable = true ;
                this.boxO.add(this.boxesO[this.boxesO.length-1]);  
            }
            
        }
    }
        

        for(let i  =0; i<this.boxesO.length;i++){
            this.boxesO[i].setDepth(1);
            for(let j =0; j<this.boxesO.length;j++){
                if(this.boxesO[i]==this.boxesO[j]){
                    continue;
                }
                this.physics.add.collider(this.boxesO[i],this.boxesO[j]);
            }
        }
        for(let i  =0; i<this.boxesB.length;i++){
            this.boxesB[i].setDepth(1);
            for(let j =0; j<this.boxesB.length;j++){
                if(this.boxesB[i]==this.boxesB[j]){
                    continue;
                }
                this.physics.add.collider(this.boxesB[i],this.boxesB[j]);
            }
        }

        // for(let i  =0; i<this.switches.length;i++){
        //     this.physics.add.existing(this.switches[i]);
        // }


        this.switches[0].alpha = 0;
        this.switches[1].alpha = 0;
        this.collide1 = this.physics.add.collider(this.boxesO,this.switches[2],()=>{
            this.switch1 = true;
            this.switches[2].fillColor = 0x7CFC00;
        });
        this.collide1.overlapOnly = true;
        this.collide2 = this.physics.add.collider(this.boxesO,this.switches[3],()=>{
            this.switch2 = true;
            this.switches[3].fillColor = 0x7CFC00;
        });
        this.collide2.overlapOnly = true;
        this.collide3 = this.physics.add.collider(this.boxesB,this.switches[0],()=>{
            this.switch3 = true;
            this.switches[0].fillColor = 0x7CFC00;
        });
       this.collide3.overlapOnly = true;
        this.collide4 = this.physics.add.collider(this.boxesB,this.switches[1],()=>{
            this.switch4 = true;
            this.switches[1].fillColor = 0x7CFC00;
        });
        this.collide4.overlapOnly = true;

       this.switch = this.sound.add('switch');
       this.end = this.sound.add('win');

       this.createTooltip();
    }

    update() {
 
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

        if(this.tooltip){
            if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.menu = false;
            this.tooltip = false;
            this.deleteTooltip();
            }
        }

       

        if(this.menu){
            for(let i = 0;i<this.boxesB.length;i++){
                this.boxesB[i].body.setVelocityX(0);
                this.boxesB[i].body.setVelocityY(0);
            }
            for(let i = 0;i<this.boxesO.length;i++){
                this.boxesO[i].body.setVelocityX(0);
                this.boxesO[i].body.setVelocityY(0);
            }
            this.player2.body.setVelocityX(0);
            this.player1.body.setVelocityY(0);
            this.player1.body.setVelocityX(0);
            this.player2.body.setVelocityY(0);
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
                    this.scene.start(this);
                    break;
                case 2:
                    this.scene.start('levelScene');
                    break;
                case 3:
                    this.scene.start('menuScene');
                    break;
            
                default:
                    break;
            }
        }

    }
        
        if(!this.menu){
            if(this.switch1&&this.switch2&&this.switch2&&this.switch3&&this.switch4){
                this.add.rectangle(game.config.width/2, game.config.height/2,640,32,0x0).setDepth(1);
                this.add.text(game.config.width/2, game.config.height/2, "LEVEL CLEAR", this.textConfig).setOrigin(0.5).setDepth(1);
                if(!this.end.isPlaying){
                    this.end.play();
                    }
                this.time.delayedCall(2000, () => {
                    level1 = "clear";
                    if(level2!="clear"){
                    level2 = "open";
                    }
                    this.scene.start("levelScene");
                    }, null, this);

            }
           
        if(!this.press1||!this.press2){
            if(Phaser.Input.Keyboard.JustDown(keyShift)){
                this.switch.play();
                switch(this.screen){
                case 1:
                    this.screen = 2;
                    this.player1.alpha=(0);
                    this.player2.alpha=1;
                    this.grid_blue.alpha = 1;
                    this.grid_orange.alpha = 0;
                    for(let i = 0;i<this.boxesB.length;i++){
                        this.boxesB[i].alpha = 1;  
                    }
                    for(let i = 0;i<this.boxesO.length;i++){
                        this.boxesO[i].alpha = 0;  
                    }
                    this.switches[2].alpha = 0;
                    this.switches[3].alpha = 0;
                    this.switches[0].alpha = 1;
                    this.switches[1].alpha = 1;
                    break;
                case 2:
                    this.screen = 1;
                    this.player2.alpha=(0);
                    this.player1.alpha=(1);
                    this.grid_blue.alpha = 0;
                    this.grid_orange.alpha = 1;
                    for(let i = 0;i<this.boxesB.length;i++){
                        this.boxesB[i].alpha = 0;
                        
                    }
                    for(let i = 0;i<this.boxesO.length;i++){
                        this.boxesO[i].alpha = 1;  
                    }
                    this.switches[2].alpha = 1;
                    this.switches[3].alpha = 1;
                    this.switches[0].alpha = 0;
                    this.switches[1].alpha = 0;
                    break;
                }
            }
        }

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
   


        for(let i = 0;i<this.boxesB.length;i++){
            this.boxesB[i].body.setVelocityX(0);
            this.boxesB[i].body.setVelocityY(0);
        }
        for(let i = 0;i<this.boxesO.length;i++){
            this.boxesO[i].body.setVelocityX(0);
            this.boxesO[i].body.setVelocityY(0);
        }
    }
}

createMenu(){

    this.test = this.add.rectangle(32, 32, 576, 576, 0x6666ff).setOrigin(0);
    this.test.setDepth(1);
    this.restart = this.add.text(game.config.width/2, game.config.height/2-200, "Restart", this.textConfig).setOrigin(0.5);
    this.restart.setDepth(1);
    this.level = this.add.text(game.config.width/2, game.config.height/2-100, "Level Select", this.textConfig).setOrigin(0.5);
    this.level.setDepth(1);
    this.menuText = this.add.text(game.config.width/2, game.config.height/2, "Menu", this.textConfig).setOrigin(0.5);
    this.menuText.setDepth(1);
    this.cursor = this.add.sprite(this.cursorPosx, this.cursorPosy,'cursor').setOrigin(0.5);
    this.cursor.setDepth(1);
}

deleteMenu(){
    this.test.alpha = 0;
    this.restart.alpha = 0;
    this.level.alpha = 0;
    this.menuText.alpha = 0;
    this.cursor.alpha = 0;
}

createTooltip(){
    this.help = this.add.rectangle(32, 32, 576, 576, 0x6666ff).setOrigin(0).setDepth(1);
    this.name = this.add.text(game.config.width/2, game.config.height/2-350, "Fill In The Blanks", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText1 = this.add.text(game.config.width/2, game.config.height/2-200, "Press shift two SWITCH between characters", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText2 = this.add.text(game.config.width/2, game.config.height/2-100, "use BLUE to push the Blue boxes", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText3 = this.add.text(game.config.width/2, game.config.height/2, "push the boxes onto all the SWITCHES to win", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText4 = this.add.text(game.config.width/2, game.config.height-100, "press ENTER to continue", this.textConfig).setOrigin(0.5).setDepth(1);

}

deleteTooltip(){
    
    this.help.destroy();
    this.name.destroy();
    this.helpText1.destroy();
    this.helpText2.destroy();
    this.helpText3.destroy();
    this.helpText4.destroy();
}
}