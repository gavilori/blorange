class Chamber3 extends Phaser.Scene {
    constructor() {
        super("chamber3Scene");
    }



    create() {
        this.boxState;
        this.soundPress = this.sound.add('press');
        this.switch1 = false;
        this.switch2 = false;
        this.switch3 = false;
        this.switch4 = false;
        this.cursorPos = 1;
        this.cursorPosx = game.config.width-200;
        this.cursorPosy = game.config.height/2-300;
        this.menu = false;
        this.tooltip = true;
        this.press1 = false;
        this.press2 = false;
        this.screen = 1;
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

        this.player1 = new Player(this, 352, 128,'p1', 0, true).setOrigin(0).setSize(30,30);
        this.player2 = new Player(this, 352, 64,'p2', 0, false).setOrigin(0).setSize(25,25);
        //this.player1.body.immovable = true;
        


        this.players = this.add.group();
        this.players.add(this.player1);
        this.players.add(this.player2);
        this.boxO = this.add.group();
        this.boxB = this.add.group();
        this.boxC = this.add.group();
        this.spikes = this.add.group();
        this.switchesB = this.add.group();
        this.switchesO = this.add.group();
        this.player2.alpha=(0);
        this.player1.alpha=(1);
        this.physics.add.collider(this.players,this.boxC);
        this.physics.add.collider(this.boxB,this.boxC);
        this.physics.add.collider(this.boxO,this.boxC);
        this.physics.add.collider(this.player2,this.boxB,(player,box)=>{
            let check = false;
            if(player.body.touching.up){
                for(let i  =0; i<this.boxesB.length;i++){
                
                    if(this.boxesB[i].y==box.y-32&&this.boxesB[i].x==box.x){
                        check = true;
                        break;
                    }
                }
                for(let i  =0; i<this.boxesO.length;i++){
                
                    if(this.boxesO[i].y==box.y-32&&this.boxesO[i].x==box.x){
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
                for(let i  =0; i<this.boxesO.length;i++){
                
                    if(this.boxesO[i].y==box.y+32&&this.boxesO[i].x==box.x){
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
                for(let i  =0; i<this.boxesO.length;i++){
                
                    if(this.boxesO[i].x==box.x-32&&this.boxesO[i].y==box.y){
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
                for(let i  =0; i<this.boxesO.length;i++){
                
                    if(this.boxesO[i].x==box.x+32&&this.boxesO[i].y==box.y){
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
            playerTwo.body.setVelocityX(0);
            playerTwo.body.setVelocityY(0);
            if(playerTwo.body.touching.up){
                for(let i  =0; i<this.boxesO.length;i++){
                
                    if(this.boxesO[i].y==boxTwo.y-32&&this.boxesO[i].x==boxTwo.x){
                        check = true;
                        break;
                    }
                }
                for(let i  =0; i<this.boxesB.length;i++){
                
                    if(this.boxesB[i].y==boxTwo.y-32&&this.boxesB[i].x==boxTwo.x){
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
                for(let i  =0; i<this.boxesB.length;i++){
                
                    if(this.boxesB[i].y==boxTwo.y+32&&this.boxesB[i].x==boxTwo.x){
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
                for(let i  =0; i<this.boxesB.length;i++){
                
                    if(this.boxesB[i].x==boxTwo.x-32&&this.boxesB[i].y==boxTwo.y){
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
                for(let i  =0; i<this.boxesB.length;i++){
                
                    if(this.boxesB[i].x==boxTwo.x+32&&this.boxesB[i].y==boxTwo.y){
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
        this.physics.add.collider(this.player1,this.boxB    );
        this.physics.add.collider(this.player2,this.boxO    );
        this.spikeCollide = this.physics.add.collider(this.players,this.spikes,()=>{
            this.scene.start(this);
        });

        this.spikeCollide.overlapOnly = true;

   
        

        let skip = [
            
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [ false, true, true, true, true, true, true, true, true, false, false, true, "blue", true, true, true, true, "blue", "blue", false],
            [ false, true, "blue", true, true, true, true, true, true, false, false, true, true, false, false, true, true, true, true, false],
            [ false, true, true, true, true, true, true, true, true, false, false, true, true, true, true, true, true, true, true, false],
            [ false, true, true, true, false, false, true, true, true, false, true, true, false, true, true, true, true, false, true, false],
            [ false, true, true, true, false, false, true, true, true, true, true, true, false, true, true, false, true, true, true, false],
            [ false, true, true, true, true, true, true, true, true, true, false, true, false, true, true, true, true, true, true, false],
            [ false, true, true, true, true, true, true, true, true, false, false, true, false, false, false, true, true, true, true, false],
            [ false, true, true, true, true, true, true, true, "switch", false, false, true, true, true, true, true, true, "blue", "blue", false],
            [ false, false, false, false, true, true, false, false, false, false, false, false, false, true, true, false, false, false, false, false],
            [ false, false, false, false, false, true, true, false, false, false, false, false, false, false, true, true, false, false, false, false],
            [ false, true, true, true, true, true, true, true, true, false, false, "switch", true, true, true, true, true, true, true, false],
            [ false, true, true, true, true, true, true, true, true, false, false, true, true, true, true, true, true, true, true, false],
            [ false, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, false],
            [ false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false],
            [ false, true, true, true, "blue", true, true, true, true, true, false, true, true, true, true, true, false, true, true, false],
            [ false, true, true, true, true, true, true, true, true, false, false, true, true, true, true, true, true, true, true, false],
            [ false, true, true, true, true, true, true, true, true, false, false, "blue", true, true, true, true, true, true, true, false],
            [ false, "switch", true, true, true, true, true, true, true, false, false, true, true, true, true, true, true, true, true, false],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        ];


        let skip2 = [
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [ false, true, true, true, true, "orange", true, true, true, false, false, true, "blue", true, true, true, true, "blue", "blue", false],
            [ false, true, "blue", true, true, "orange", true, true, true, false, false, true, true, false, false, true, true, true, true, false],
            [ false, true, true, true, true, "orange", true, true, true, false, false, true, true, true, true, true, true, true, true, false],
            [ false, true, true, true, false, false, true, true, true, false, true, true, false, true, true, true, true, false, true, false],
            [ false, "orange", "orange", "orange", false, false, true, true, true, true, true, true, false, true, true, false, true, true, true, false],
            [ false, true, true, true, true, true, true, true, true, true, false, true, false, true, "orange", true, true, true, true, false],
            [ false, true, true, true, true, true, true, true, true, false, false, true, false, false, false, true, true, true, true, false],
            [ false, true, true, true, true, true, true, true, "switchB", false, false, "switch", true, true, true, true, true, "blue", "blue", false],
            [ false, false, false, false, true, true, false, false, false, false, false, false, false, true, true, false, false, false, false, false],
            [ false, false, false, false, false, true, true, false, false, false, false, false, false, false, true, true, false, false, false, false],
            [ false, true, true, true, true, true, true, true, "switch", false, false, "switchB", true, true, "orange", true, true, true, "orange", false],
            [ false, true, true, true, true, true, true, true, true, false, false, true, true, true, true, true, true, true, "orange", false],
            [ false, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, false],
            [ false, true, true, true, true, true, true, true, true, true, "orange", "orange", true, true, true, true, true, true, true, false],
            [ false, true, true, true, "blue", true, true, true, true, true, false, true, true, true, true, true, false, true, true, false],
            [ false, true, true, true, true, true, true, true, true, false, false, true, true, true, true, true, true, true, true, false],
            [ false, true, "orange", true, true, true, true, true, true, false, false, "blue", true, true, true, true, true, true, true, false],
            [ false, "switchB", true, true, true, true, true, true, true, false, false, true, true, true, true, true, true, true, true, false],
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        ];

        this.press = [
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
        ];

       this.boxesB = [];
       this.boxesO = [];
       this.boxesC = [];
       this.switchArrB = [];
       this.switchArrO = [];
       
       


        for(let i = 0;i<20;i++){ //column
            for(let j = 0;j<20;j++){ // row

                if(!skip[i][j]){
                let const_box = this.physics.add.sprite(i*32, j*32,'const').setOrigin(0).setSize(32,32);
                const_box.body.immovable = true;
                this.boxC.add(const_box);
                this.boxesC.push(const_box);
                }else if(skip[i][j]=="blue"){
                    this.boxesB.push( this.physics.add.sprite(i*32, j*32,'gray').setOrigin(0)); 
                    this.boxesB[this.boxesB.length-1].allowGravity=false;
                    this.boxesB[this.boxesB.length-1].setSize(32,32);
                    this.boxesB[this.boxesB.length-1].setDisplaySize(32,32);
                   
                    this.boxesB[this.boxesB.length-1].body.immovable = true;
                    this.boxB.add(this.boxesB[this.boxesB.length-1]);  
                }else if(skip[i][j]=="switch"){
                    let switchy = this.add.rectangle(i*32,j*32,32,32,0xFF0000).setOrigin(0)
                    this.switchArrB.push(switchy);
                    this.physics.add.existing(switchy);
                    this.switchesB.add(switchy);
                    switchy.alpha = 0;
                    this.physics.add.collider(this.boxB,switchy,(box,switch1)=>{
                        switch1.fillColor = 0x00FF00;
                        console.log("i"+i+": j:"+j);
                        if(this.press[i][j] ==true){
                        this.soundPress.play();
                        }
                        this.press[i][j] = false;
            
                    });
                }else if(skip[i][j]=="spike"){
                    let spiky = this.physics.add.sprite(i*32, j*32,'spike').setOrigin(0).setSize(25,25);
                    this.spikes.add(spiky)
                }
                if(skip2[i][j]=="orange"){
                    this.boxesO.push( this.physics.add.sprite(i*32, j*32,'obox').setOrigin(0)); 
                    this.boxesO[this.boxesO.length-1].allowGravity=false;
                    this.boxesO[this.boxesO.length-1].setSize(32,32);
                    this.boxesO[this.boxesO.length-1].setDisplaySize(32,32);
                    this.boxesO[this.boxesO.length-1].alpha = 1;
                   this.boxesO[this.boxesO.length-1].body.immovable = true ;
                    this.boxO.add(this.boxesO[this.boxesO.length-1]);  
                }else if(skip2[i][j]=="switch"){
                    let switchy = this.add.rectangle(i*32,j*32,32,32,0xFF0000).setOrigin(0)
                    this.switchArrO.push(switchy);
                    this.physics.add.existing(switchy);
                    this.switchesO.add(switchy);
                    this.collide = this.physics.add.collider(this.boxO,switchy,(box,switch1)=>{
                        switch1.fillColor = 0x00FF00;
                        console.log(i+":"+j);
                        if(this.press[i][j] ==true){
                        this.soundPress.play();
                        }
                        this.press[i][j] = false;
            
                    });
                    this.collide.overlapOnly = true;
                }
                
            }

            
        }
        //this.walls = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'trans3').setOrigin(0);

        for(let i = -1;i<0;i++){ //column
            for(let j = 0;j<=20;j++){ // row
                let const_box = this.physics.add.sprite(i*32, j*32,'const').setOrigin(0).setSize(33,33);
                const_box.body.immovable = true;
                this.boxC.add(const_box);
                this.boxesC.push(const_box);
            }
        }

       
            for(let j = 0;j<=20;j++){ // row
                let const_box = this.physics.add.sprite(640, j*32,'const').setOrigin(0).setSize(33,33);
                const_box.body.immovable = true;
                this.boxC.add(const_box);
                this.boxesC.push(const_box);
            }

            for(let j = 0;j<=20;j++){ // row
                let const_box = this.physics.add.sprite(j*32, -32,'const').setOrigin(0).setSize(33,33);
                const_box.body.immovable = true;
                this.boxC.add(const_box);
                this.boxesC.push(const_box);
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
            this.physics.add.collider(this.boxesB[i],this.player2,()=>{
                if(this.player2.body.isTouching.Up){
                    this.boxesB[i].y-=32;
                }
            });
            for(let j =0; j<this.boxesB.length;j++){
                if(this.boxesB[i]==this.boxesB[j]){
                    continue;
                }
                this.physics.add.collider(this.boxesB[i],this.boxesB[j]);
            }
        }



       this.switch = this.sound.add('switch');
       this.end = this.sound.add('win');
       this.move = this.sound.add('scroll');
       this.select = this.sound.add('select');
       if(!bgm.isPlaying){
        
        bgm.setLoop(true);
        bgm.play();
       }
      
       this.createTooltip();
    }

    update() {
        this.grid_orange.tilePositionX+=SCROLL_SPEED;
        this.grid_blue.tilePositionX+=SCROLL_SPEED;
 
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

        if(this.tooltip){
            if(Phaser.Input.Keyboard.JustDown(keyENTER)){
                this.select.play();
            //this.menu = false;
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
            if(Phaser.Input.Keyboard.JustDown(keyUP)){
                this.move.play();
                if(this.cursorPos==1){
                    this.cursorPos = 4;
                }else{
            this.cursorPos--;
                }
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            this.move.play();
            if(this.cursorPos==4){
                this.cursorPos = 1;
            }else{
        this.cursorPos++;
            }
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
        
        if(!this.menu&&!this.tooltip){
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

           
         

            if(!this.press[18][1]&&!this.press[8][8]&&!this.press[8][11]&&!this.press[11][11]&&!this.press[11][8]){
                bgm.setLoop(false);
            bgm.stop();
                this.add.rectangle(game.config.width/2, game.config.height/2,640,32,0x0).setDepth(1);
                this.add.text(game.config.width/2, game.config.height/2, "CHAMBER CLEAR", this.textConfig).setOrigin(0.5).setDepth(1);
                if(!this.end.isPlaying){
                    this.end.play();
                    }
                this.time.delayedCall(2000, () => {
                    sub3 = "clear";
                    if(level4!="clear"){
                    sub4 = "open";
                    }
                    this.scene.start("levelScene");
                    }, null, this);

            }
           
         
        
            if(Phaser.Input.Keyboard.JustDown(keyShift)&&!this.moving){
                this.switch.play();
                switch(this.screen){
                case 1:
                    this.screen = 2;
                    this.player1.alpha=(.2);
                    this.player2.alpha=1;
                    this.grid_blue.alpha = 1;
                    this.grid_orange.alpha = 0;
                    for(let i = 0;i<this.boxesB.length;i++){
                        this.boxesB[i].setTexture('bbox');
                        
                        this.boxesB[i].alpha = 1;  
                    }
                    for(let i = 0;i<this.boxesO.length;i++){
                        this.boxesO[i].setTexture('gray'); 
                    }
                    for(let i = 0;i<this.switchArrB.length;i++){
                        this.switchArrB[i].alpha = 1;  
                    }
                    for(let i = 0;i<this.switchArrO.length;i++){
                        this.switchArrO[i].alpha = 0;  
                    }
                   // this.switchArrB[this.switchArrB.length-2].alpha = 0;
                    break;
                case 2:
                    this.screen = 1;
                    this.player2.alpha=(.2);
                    this.player1.alpha=(1);
                    this.grid_blue.alpha = 0;
                    this.grid_orange.alpha = 1;
                    for(let i = 0;i<this.boxesB.length;i++){
                        this.boxesB[i].setTexture('gray');
                        
                        
                    }
                    for(let i = 0;i<this.boxesO.length;i++){
                        this.boxesO[i].setTexture('obox');
                    }
                    for(let i = 0;i<this.switchArrB.length;i++){
                        this.switchArrB[i].alpha = 0;  
                    }
                    for(let i = 0;i<this.switchArrO.length;i++){
                        this.switchArrO[i].alpha = 1;  
                    }
                    //this.switchArrB[this.switchArrB.length-2].alpha = 1;
                    
                    break;
                }
            }
        

        if(keyDOWN.isDown&&this.screen == 1&&!this.moving){
            this.player1.body.setVelocityY(this.MOVE_SPEED);
            this.moving = true;
        }else if(keyUP.isDown&&this.screen == 1&&!this.moving){
            this.player1.body.setVelocityY(-this.MOVE_SPEED);
            this.moving = true;
        }else{
            //this.player1.body.setVelocityY(0);
        }

        if(keyLEFT.isDown&&this.screen == 1&&!this.moving){
            this.player1.body.setVelocityX(-this.MOVE_SPEED);
            this.moving = true;
        }else if(keyRIGHT.isDown&&this.screen == 1&&!this.moving){
            this.player1.body.setVelocityX(this.MOVE_SPEED);
            this.moving = true;
        }else{
            //this.player1.body.setVelocityX(0);
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


        if(this.player1.body.velocity.x==0&&this.player1.body.velocity.y==0){
            this.moving = false;
        }
        // console.log("X vel: "+this.player1.body.velocity.x+" Y vel: "+this.player1.body.velocity.y);
        // console.log("I AM MOVING: "+this.moving);
        console.log(this.player1.x);

        
   


        
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
    this.help = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'pause').setOrigin(0).setDepth(1);
    this.name = this.add.text(game.config.width/2, game.config.height/2-230, "Slip & Slide", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText1 = this.add.text(game.config.width/2, game.config.height/2-150, "Boxes are consistent between both scenes.", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText2 = this.add.text(game.config.width/2, game.config.height/2-100, "Characters can only push their own color boxes.", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText5 = this.add.text(game.config.width/2, game.config.height/2+10, "Orange Player", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText6 = this.add.text(game.config.width/2, game.config.height/2+40, "Slide in a direction with arrow keys", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText7 = this.add.text(game.config.width/2, game.config.height/2+70, "stops when hitting a solid object.", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText4 = this.add.text(game.config.width/2, game.config.height-150, "press TAB to toggle grid", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText3 = this.add.text(game.config.width/2, game.config.height-100, "press ENTER to continue", this.textConfig).setOrigin(0.5).setDepth(1);

}

deleteTooltip(){
    
    this.help.destroy();
    this.name.destroy();
    this.helpText1.destroy();
    this.helpText2.destroy();
    this.helpText3.destroy();
    this.helpText4.destroy();
    this.helpText5.destroy();
    this.helpText6.destroy();
    this.helpText7.destroy();

}


}