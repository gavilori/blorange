class Level3 extends Phaser.Scene {
    constructor() {
        super("level3Scene");
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
        this.grid = this.add.tileSprite(false, false, game.config.width, game.config.height, 'grid3').setOrigin(0);



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

        this.player1 = new Player(this, 32, game.config.height-64,'p1', 0, true).setOrigin(0).setSize(30,30);
        this.player2 = new Player(this, 32, game.config.height-64,'p2', 0, false).setOrigin(0).setSize(25,25);
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
                    playerTwo.x = boxTwo.x;
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
                    this.fixPos(playerTwo,boxTwo);
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
            
            [ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true],
            [ false, false, false, "spike", false, "spike", false, "spike", false, "spike", false, true, false, false, false, true, true, true, true, true],
            [ false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, true],
            [ false, "spike", true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, true, "blue", true, true, true],
            [ false, "spike", true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, true],
            [ false, false, true, true, true, true, true, true, true, true, true, true, true, false, false,"spike", "spike", "spike", "spike", "spike"],
            [ false, false, false, true, true, true, false, "spike", false, "spike", false, "spike", false, false, false, false, false, false, false, false],
            [ false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [ false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [ true, true, true, true, true, true, false, false, true, true, true, true, true, true, true, true, false, false, false, false],
            [ true, true, true, true, true, true, false, false, true, true, true, true, true, true, true, true, false, false, false, false],
            [ "spike", "spike", true, true, true, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false],
            [ "spike", "spike", true, "spike", "spike", false, false, true, true, true, true, true, true, true, true, true, false, false, false, false],
            [ true, true, true, "spike", true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false],
            [ true, true, true, "spike", true, true, false, false, true, true, true, true, true, true, true, true, true, true, true, false],
            [ true, true, true, true, true, true, false, false, true, true, true, true, true, true, true, true, false, false, false, false],
            [ true, true, true, true, true, true, false, false, true, true, true, true, true, true, true, true, false, false, false, false],
            [ "spike", true, true, true, true, "spike", false, false, true, true, true, "switch", true, true, true, true, false, false, false, false],
            [ "spike", "spike", "spike", "spike", "spike", "spike", false, false, true, true, true, true, true, true, true, true, false, false, false, false],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
        ];


        let skip2 = [
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, "switch", true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, "orange", true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, "orange", true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, "switch", true, true, true, true, true, true, true, true],
            [ true, true, true, true, "switch", true, true, true, true, true, true, "orange", true, true, true, true, "orange", true, "switch", true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, "orange", true, "switch", true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
            [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
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
       this.switchArrB = []
       this.switchArrO = []
       
       


        for(let i = 0;i<=20;i++){ //column
            for(let j = 0;j<=20;j++){ // row

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
                    let spiky = this.physics.add.sprite(i*32, j*32,'spike').setOrigin(0);
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
       this.createTooltip();
    }

    update() {
        this.grid_orange.tilePositionX+=5;
        this.grid_blue.tilePositionX+=5;
 
        if(Phaser.Input.Keyboard.JustDown(keyESC)&&!this.tooltip){
            
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

           
            if(this.boxesO[0].x>this.player1.x&&(-1*(this.boxesO[0].y)+(this.player1.y)>=-16&&-1*(this.boxesO[0].y)+(this.player1.y)<=16)){
                this.boxState = "right";
            }else if(this.boxesO[0].x<this.player1.x&&(-1*(this.boxesO[0].y)+(this.player1.y)>=-16&&-1*(this.boxesO[0].y)+(this.player1.y)<=16)){
                this.boxState = "left";
            }else if((-1*(this.boxesO[0].x)+(this.player1.x)>=-16&&-1*(this.boxesO[0].x)+(this.player1.x)<=16)&&this.boxesO[0].y<this.player1.y){
                this.boxState = "up";
            }else if(this.boxesO[0].x>this.player1.x&&this.boxesO[0].y<this.player1.y){
                this.boxState = "upright";
            }else if(this.boxesO[0].x<this.player1.x&&this.boxesO[0].y<this.player1.y){
                this.boxState = "upleft";
            }else if((-1*(this.boxesO[0].x)+(this.player1.x)>=-16&&-1*(this.boxesO[0].x)+(this.player1.x)<=16)&&this.boxesO[0].y>this.player1.y){
                this.boxState = "down";
            }else if(this.boxesO[0].x<this.player1.x&&this.boxesO[0].y>this.player1.y){
                this.boxState = "downleft";
            }
            else if(this.boxesO[0].x>this.player1.x&&this.boxesO[0].y>this.player1.y){
                this.boxState = "downright";
            }






            
            if(keySPACE.isDown&&this.screen == 1){
            switch (this.boxState) {
                case "right":
                    this.boxesO[0].setVelocityX(-50);
                    //this.boxesO.setVelocityY();
                    break;
                
                case "left":
                    this.boxesO[0].setVelocityX(+50);
                    //this.boxesO.setVelocityY();
                    
                    break;

                case "up":
                    //this.boxesO.setVelocityX(+50);
                    this.boxesO[0].setVelocityY(+50);
                    
                    break;

                case "down":
                    //this.boxesO.setVelocityX(+50);
                    this.boxesO[0].setVelocityY(-50);
                    
                    break;
                
                case "upright":
                    this.boxesO[0].setVelocityX(-50);
                    this.boxesO[0].setVelocityY(+50);
                    
                    break;
                
                case "upleft":
                    this.boxesO[0].setVelocityX(+50);
                    this.boxesO[0].setVelocityY(+50);
                    
                    break;

                case "downleft":
                    this.boxesO[0].setVelocityX(+50);
                    this.boxesO[0].setVelocityY(-50);
                    
                    break;

                case "downright":
                    this.boxesO[0].setVelocityX(-50);
                    this.boxesO[0].setVelocityY(-50);
                    
                    break;
            
                default:
                    break;
            }
        }else{
            this.boxesO[0].body.setVelocityX(0);
        this.boxesO[0].body.setVelocityY(0);
        }

            if(!this.press[2][11]&&!this.press[12][4]&&!this.press[15][18]&&!this.press[18][11]&&!this.press[12][4]){
                this.add.rectangle(game.config.width/2, game.config.height/2,640,32,0x0).setDepth(1);
                this.add.text(game.config.width/2, game.config.height/2, "LEVEL CLEAR", this.textConfig).setOrigin(0.5).setDepth(1);
                if(!this.end.isPlaying){
                    this.end.play();
                    }
                this.time.delayedCall(2000, () => {
                    level3 = "clear";
                    if(level4!="clear"){
                    level4 = "open";
                    }
                    this.scene.start("levelScene");
                    }, null, this);

            }
           
         
        
            if(Phaser.Input.Keyboard.JustDown(keyShift)&&!this.moving){
                this.switch.play();
                switch(this.screen){
                case 1:
                    this.screen = 2;
                    this.player1.alpha=(0);
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
                    this.player2.alpha=(0);
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

    this.test = this.add.rectangle(32, 32, 576, 576, 0x6666ff).setOrigin(0);
    this.test.setDepth(1);
    this.restart = this.add.text(game.config.width/2, game.config.height/2-200, "Restart", this.textConfig).setOrigin(0.5);
    this.restart.setDepth(1);
    this.level = this.add.text(game.config.width/2, game.config.height/2-100, "Level Select", this.textConfig).setOrigin(0.5);
    this.level.setDepth(1);
    this.menuText = this.add.text(game.config.width/2, game.config.height/2, "Menu", this.textConfig).setOrigin(0.5);
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
}


createTooltip(){
    this.help = this.add.rectangle(32, 32, 576, 576, 0x6666ff).setOrigin(0).setDepth(1);
    this.name = this.add.text(game.config.width/2, game.config.height/2-350, "Push & Pull", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText1 = this.add.text(game.config.width/2, game.config.height/2-100, "press SPACE with ORANGE to pull the box towards you", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText2 = this.add.text(game.config.width/2, game.config.height/2, "use BLUE to push the boxes", this.textConfig).setOrigin(0.5).setDepth(1);
    this.helpText3 = this.add.text(game.config.width/2, game.config.height-100, "press ENTER to continue", this.textConfig).setOrigin(0.5).setDepth(1);

}

deleteTooltip(){
    
    this.help.destroy();
    this.name.destroy();
    this.helpText1.destroy();
    this.helpText2.destroy();
    this.helpText3.destroy();
}

fixPos(player,box){
    let x1 = player.x;
    let x2 = box.x;
    let rem = x2 - x1;
    this.player1.x = x2;
    this.player1.x -=rem;

}
}