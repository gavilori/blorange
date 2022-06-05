class Level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }



    create() {
        //switch variables pressed or not pressed
        this.switch1 = false;
        this.switch2 = false;
        this.switch3 = false;
        this.switch4 = false;

        //make the cursor variables
        this.cursorPos = 1;
        this.cursorPosx = game.config.width-200;
        this.cursorPosy = game.config.height/2-300;

        //start with no menu
        this.menu = false;

        // tooltip show up at the beginning
        this.tooltip = true;

        //check for switch press
        this.press1 = false;
        this.press2 = false;

        // screen starts on the orange side
        this.screen = 1;

        //create the backghrounds
        this.grid_blue = this.add.tileSprite(false, false, game.config.width, game.config.height, 'grid2').setOrigin(0);
        this.grid_blue.alpha = 0;
        this.grid_orange = this.add.tileSprite(false, false, game.config.width, game.config.height, 'grid').setOrigin(0);
        this.grid_orange.alpha = 1
        this.grid = this.add.tileSprite(false, false, game.config.width, game.config.height, 'grid3').setOrigin(0).setAlpha(0);
        


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
         keyTAB =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
         
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


        //create our players and set up their physics
        this.player1 = new Player(this, 288, game.config.height-80,'p1', 0, true).setOrigin(0).setSize(25,25);
        this.player2 = new Player(this, 288, game.config.height-80,'p2', 0, false).setOrigin(0).setSize(25,25);
        this.player2.alpha=(0);
        this.player1.alpha=(1);


        this.players = this.add.group();
        this.players.add(this.player1);
        this.players.add(this.player2);

        //physics groups for our objects
        this.boxO = this.add.group();
        this.boxB = this.add.group();
        this.boxC = this.add.group();

        //collider between players and objects
        this.physics.add.collider(this.players,this.boxC,); //player and non move blocks
        this.physics.add.collider(this.boxB,this.boxC,); //blue box and non move blocks
        this.physics.add.collider(this.boxO,this.boxC,); // orange box and non move blocks


        this.physics.add.collider(this.player2,this.boxB,(player,box)=>{   //collider between the blue player and blue boxes
            let check = false;
            if(player.body.touching.up){ //pushing up on box
                for(let i  =0; i<this.boxesB.length;i++){ //check if box will clip into another box
                
                    if(this.boxesB[i].y==box.y-32&&this.boxesB[i].x==box.x){
                        check = true;
                        break;
                    }
                }
                for(let i  =0; i<this.boxesC.length;i++){ //check if box will clip into non move block
                
                    if(this.boxesC[i].y==box.y-32&&this.boxesC[i].x==box.x){
                        check = true;
                        break;
                    }
                }
                if(!check){
                box.y-=32; //move block up screen
                }
            }else if(player.body.touching.down){ //player push down on box
                for(let i  =0; i<this.boxesB.length;i++){
                
                    if(this.boxesB[i].y==box.y+32&&this.boxesB[i].x==box.x){ //check if box will clip into another box
                        check = true;
                        break;
                    }
                }
                for(let i  =0; i<this.boxesC.length;i++){ //check if box will clip into non move block
                
                    if(this.boxesC[i].y==box.y+32&&this.boxesC[i].x==box.x){
                        check = true;
                        break;
                    }
                }
                if(!check){
                box.y+=32; //move block down screen
                }
            }else if(player.body.touching.left){ //player push left on box
                for(let i  =0; i<this.boxesB.length;i++){
                
                    if(this.boxesB[i].x==box.x-32&&this.boxesB[i].y==box.y){ //check if box will clip into another box
                        check = true;
                        break;
                    }
                }
                for(let i  =0; i<this.boxesC.length;i++){
                
                    if(this.boxesC[i].x==box.x-32&&this.boxesC[i].y==box.y){ //check if box will clip into non move block
                        check = true;
                        break;
                    }
                }
                if(!check){
                box.x-=32; //move block left screen
                }
            }else if(player.body.touching.right){//player push right on box
                for(let i  =0; i<this.boxesB.length;i++){
                
                    if(this.boxesB[i].x==box.x+32&&this.boxesB[i].y==box.y){ //check if box will clip into another box
                        check = true;
                        break;
                    }
                }
                for(let i  =0; i<this.boxesC.length;i++){ //check if box will clip into non move block
                
                    if(this.boxesC[i].x==box.x+32&&this.boxesC[i].y==box.y){
                        check = true;
                        break;
                    }
                }
                if(!check){
                box.x+=32; //move block right
                }
            }
            
            

        });

        //same as previous collider but for orange box
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
                console.log("AWIHUDGAIWUDGAOWUDH");
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




        
        //array that will serve as tile map for blue screen and persisting objects
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

        //array for orange screen objects
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


        //arrays to hold out objects
       this.boxesB = [];
       this.boxesO = [];
       this.boxesC = [];
       this.switches = [];


       for(let i = 0;i<=20;i++){ //column
        for(let j = 0;j<=20;j++){ // row

            if(!skip[i][j]){ // place a constant block based on array
            let const_box = this.physics.add.sprite(i*32, j*32,'const').setOrigin(0).setAlpha(0);
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
            }else if(skip[i][j]=="switch"){ // blue boxes based on array
                let switchy = this.add.rectangle(i*32,j*32,32,32,0xFF0000).setOrigin(0)
                this.switches.push(switchy);
                this.physics.add.existing(switchy);
            }
            if(skip2[i][j]=="orange"){ //orange based on array
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
    this.walls = this.add.tileSprite(false, false, game.config.width, game.config.height, 'trans1').setOrigin(0);
        

        for(let i  =0; i<this.boxesO.length;i++){ // set colliders between all the orange boxes
            this.boxesO[i].setDepth(1);
            for(let j =0; j<this.boxesO.length;j++){
                if(this.boxesO[i]==this.boxesO[j]){
                    continue;
                }
                this.physics.add.collider(this.boxesO[i],this.boxesO[j]);
            }
        }
        for(let i  =0; i<this.boxesB.length;i++){ // set colliders between all the blue boxes
            this.boxesB[i].setDepth(1);
            for(let j =0; j<this.boxesB.length;j++){
                if(this.boxesB[i]==this.boxesB[j]){
                    continue;
                }
                this.physics.add.collider(this.boxesB[i],this.boxesB[j]);
            }
        }



        //start blue screen switches as non visible
        this.switches[0].alpha = 0;
        this.switches[1].alpha = 0;


        //collider for the switch and orange boxes
        this.collide1 = this.physics.add.collider(this.boxesO,this.switches[2],()=>{
            if(this.switch1 ==false){
                this.soundPress.play();
                }
            this.switch1 = true;
            this.switches[2].fillColor = 0x7CFC00;
        });
        this.collide1.overlapOnly = true;

        //collider for the switch and orange boxes
        this.collide2 = this.physics.add.collider(this.boxesO,this.switches[3],()=>{
            if(this.switch2 ==false){
                this.soundPress.play();
                }
            this.switch2 = true;
            this.switches[3].fillColor = 0x7CFC00;
        });
        this.collide2.overlapOnly = true;

        //collider for the switch and blue boxes
        this.collide3 = this.physics.add.collider(this.boxesB,this.switches[0],()=>{
            if(this.switch3 ==false){
                this.soundPress.play();
                }
            this.switch3 = true;
            this.switches[0].fillColor = 0x7CFC00;
        });
       this.collide3.overlapOnly = true;

       //collider for the switch and blue boxes
        this.collide4 = this.physics.add.collider(this.boxesB,this.switches[1],()=>{
            if(this.switch4 ==false){
                    this.soundPress.play();
                    }
            this.switch4 = true;
            this.switches[1].fillColor = 0x7CFC00;
        });
        this.collide4.overlapOnly = true;

       
        //add our sounds
       this.switch = this.sound.add('switch');
       this.end = this.sound.add('win');
       this.soundPress = this.sound.add('press');
       this.move = this.sound.add('scroll');
       this.select = this.sound.add('select');
      
       console.log(bgm.isPlaying);
       if(!bgm.isPlaying){
        
        bgm.setLoop(true);
        bgm.play();
       }
      

       this.createTooltip();
    }

    update() {
        //scroll the bg
        this.grid_orange.tilePositionX+=SCROLL_SPEED;
        this.grid_blue.tilePositionX+=SCROLL_SPEED;
 


        //toggle the menu
        if(Phaser.Input.Keyboard.JustDown(keyESC)&&!this.tooltip){
            this.select.play();
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

        //exit out of the tooltip at the beg
        if(this.tooltip){
            if(Phaser.Input.Keyboard.JustDown(keyENTER)){
                this.select.play();
            //this.menu = false;
            this.tooltip = false;
            this.deleteTooltip();
            }
        }

       
        //stop movement on screen when menu shows up
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

            //move cursor in the menu
            if(Phaser.Input.Keyboard.JustDown(keyUP)&&this.cursorPos>1){
                this.move.play();
            this.cursorPos--;
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)&&this.cursorPos<4){
            this.move.play();
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

            case 4:
                this.cursorPosy = game.config.height/2+100;
                this.cursor.y = this.cursorPosy;
                break;  
        }

// selecting your option on the menu by pressing enter
        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.select.play();
            switch (this.cursorPos) {
                case 1:
                    
                    this.scene.start(this);
                    break;
                case 2:
                    bgm.setLoop(false);
                    bgm.stop();
                    this.scene.start('levelScene');
                    break;
                case 3:
                    bgm.setLoop(false);
                    bgm.stop();
                    this.scene.start('menuScene');
                    break;

                case 4:
                    this.tooltip = true;
                    this.createTooltip();
                    break; 
            
                default:
                    break;
            }
        }

    }
        

    //everything that happens without the menu
        if(!this.menu&&!this.tooltip){


            //end the level
            if(this.switch1&&this.switch2&&this.switch2&&this.switch3&&this.switch4){
                bgm.setLoop(false);
            bgm.stop();
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
           

            // if the game is not over
        if(!this.press1||!this.press2){

            // toggle the grid
            if(Phaser.Input.Keyboard.JustDown(keyTAB)){
                switch (this.grid.alpha) {
                    case 1:
                        this.grid.alpha = 0;
                        break;

                    case 0:
                        this.grid.alpha = 1;
                        break;
                
                    default:
                        break;
                }
            }


            
            if(Phaser.Input.Keyboard.JustDown(keyShift)){
                this.switch.play();
                switch(this.screen){
                case 1:
                    this.screen = 2;
                    this.player1.alpha=(.2);
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
                    this.player2.alpha=(.2);
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

    this.test = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'pause').setOrigin(0).setDepth(1);
    this.test.setDepth(1);
    this.restart = this.add.text(game.config.width/2, game.config.height/2-200, "Restart", this.textConfig).setOrigin(0.5);
    this.restart.setDepth(1);
    this.level = this.add.text(game.config.width/2, game.config.height/2-100, "Level Select", this.textConfig).setOrigin(0.5);
    this.level.setDepth(1);
    this.menuText = this.add.text(game.config.width/2, game.config.height/2, "Menu", this.textConfig).setOrigin(0.5);
    this.tipText = this.add.text(game.config.width/2, game.config.height/2+100, "Controls", this.textConfig).setOrigin(0.5).setDepth(1);
    this.menuText.setDepth(1);
    this.cursor = this.add.sprite(this.cursorPosx, this.cursorPosy,'cursor').setOrigin(0);
    this.cursor.setDepth(1);
}

deleteMenu(){
    this.test.alpha = 0;
    this.restart.alpha = 0;
    this.level.alpha = 0;
    this.menuText.alpha = 0;
    this.cursor.alpha = 0;
    this.tipText.alpha = 0;
}

createTooltip(){
    this.help = this.add.tileSprite(0, -15, game.config.width, game.config.height, 'pause').setOrigin(0).setDepth(1);
    this.name = this.add.text(game.config.width/2, game.config.height/2-250, "Fill In The Blanks", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText1 = this.add.text(game.config.width/2, game.config.height/2-200, "Press shift two SWITCH between characters", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText2 = this.add.text(game.config.width/2, game.config.height/2-100, "use BLUE to push the Blue boxes", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText3 = this.add.text(game.config.width/2, game.config.height/2, "push the boxes onto all the SWITCHES to win", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText5 = this.add.text(game.config.width/2, game.config.height-150, "press TAB to toggle grid", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText4 = this.add.text(game.config.width/2, game.config.height-100, "press ENTER to continue", this.textConfig).setOrigin(0.5).setDepth(1);

}

deleteTooltip(){
    
    this.help.destroy();
    this.name.destroy();
    this.helpText1.destroy();
    this.helpText2.destroy();
    this.helpText3.destroy();
    this.helpText4.destroy();
    this.helpText5.destroy();
}
}