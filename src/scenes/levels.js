class Level extends Phaser.Scene {
    constructor() {
        super("levelScene");
    }



    create() {
        //define cursor variables
        this.cursorPos = 1;
        this.cursorPosx = game.config.width/2;
        this.cursorPosy = 200;
        
        //start with no menu
        this.menu = false;
       
        //create bg
        this.grid = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg3').setOrigin(0);

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
       
       //fill an array that has the state of the level (open,clear,lock)
        let levels = [];
        levels[1] = level1;
        levels[2] = level2;
        levels[3] = level3;
        levels[4] = level4;



        // create the level select
        let count  = 1;
        this.selects = [];
        for(let i=96;i<608;i+=128){
            
            if(levels[count]=="clear"){
                this.selects[count]=this.add.sprite(i,160,'clear').setOrigin(0);
            }else if(levels[count]=="open"){
                this.selects[count]=this.add.sprite(i,160,'open').setOrigin(0);
            }else if(levels[count]=="lock"){
                this.selects[count]=this.add.sprite(i,160,'lock').setOrigin(0);
            }
            
            count++;
        }


        // place the numbers on the level select
        for(let i=96;i<608;i+=128){
            if(i==96){
                this.add.sprite(i,160,'one').setOrigin(0);
            }
            if(i==96+128&&levels[2]!="lock"){
                this.add.sprite(i,160,'two').setOrigin(0);
            }
            if(i==96+128*2&&levels[3]!="lock"){
                this.add.sprite(i,160,'three').setOrigin(0);
            }
            if(i==96+128*3&&levels[4]!="lock"){
                this.add.sprite(i,160,'four').setOrigin(0);
            }
        }


        // create the pointer 
        this.createMenu();
        this.deleteMenu();

        this.move = this.sound.add('scroll');
        this.lock = this.sound.add('lock');
        this.select = this.sound.add('select');

        if(!menu_bgm.isPlaying){
        
            menu_bgm.setLoop(true);
            menu_bgm.play();
           }
  
    }

    update() {
        this.grid.tilePositionX +=2;


        if(Phaser.Input.Keyboard.JustDown(keyESC)&&!this.tooltip){
            this.select.play();
            switch (this.menu) {
                
                case false:
                    this.createMenu2();
                    this.menu = true
                    break;
                case true:
                    this.deleteMenu2();
                    this.menu = false;
                    break;
                default:
                    break;
            }   
        }

        if(this.menu){
        if(Phaser.Input.Keyboard.JustDown(keyUP)&&this.cursorPos>1){
            this.move.play();
        this.cursorPos--;
    }
    if(Phaser.Input.Keyboard.JustDown(keyDOWN)&&this.cursorPos<1){
        this.move.play();
        this.cursorPos++;
    }
    switch(this.cursorPos){
        case 1:
            this.cursorPosy = game.config.height/2-200;
            this.cursor2.y = this.cursorPosy;
            this.cursor2.x = game.config.width-200;
            break;
        case 2:
            this.cursorPosy = game.config.height/2-200;
            this.cursor2.y = this.cursorPosy;
            this.cursor2.x = game.config.width-200;
            this.cursorPos = 1;
            break;
        case 3:
            this.cursorPosy = game.config.height/2-200;
            this.cursor2.y = this.cursorPosy;
            this.cursor2.x = game.config.width-200;
            this.cursorPos = 1;
            break;
        case 4:
            this.cursorPosy = game.config.height/2-200;
            this.cursor2.y = this.cursorPosy;
            this.cursor2.x = game.config.width-200;
            this.cursorPos = 1;
            break;
    }

    if(Phaser.Input.Keyboard.JustDown(keyENTER)){
        this.select.play();
        switch (this.cursorPos) {
            case 1:
                this.scene.start('menuScene');
                break;

        
            default:
                break;
        }
    }

        
        
    }



        // state machine to track where the cursor is
        if(!this.menu){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)&&this.cursorPos>1){
            this.move.play();
            this.cursorPos--;
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)&&this.cursorPos<4){
            this.move.play();
            this.cursorPos++;
        }
        switch(this.cursorPos){
            case 1:
                this.cursor.y = 200;
                this.cursorPosx = this.selects[1].x+32;
                this.cursor.x = this.cursorPosx;
                break;
            case 2:
                this.cursor.y = 200;
                this.cursorPosx = this.selects[2].x+32;
                this.cursor.x = this.cursorPosx;
                break;
            case 3:
                this.cursor.y = 200;
                this.cursorPosx = this.selects[3].x+32;
                this.cursor.x = this.cursorPosx;
                
                break;
            case 4:
                this.cursor.y =200;
                this.cursorPosx = this.selects[4].x+32;
                this.cursor.x = this.cursorPosx;
                break;

        }

// based on where the cursor is which level to enter
        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            switch (this.cursorPos) {
                case 1:
                    if(level1=="clear"||level1=="open"){
                        menu_bgm.setLoop(false);
                        menu_bgm.stop();
                        this.select.play();
                    this.scene.start('level1Scene');
                    }else{
                        this.lock.play();
                    }
                    break;
                case 2:
                    if(level2=="clear"||level2=="open"){
                        this.select.play();
                        menu_bgm.setLoop(false);
                        menu_bgm.stop();
                        this.scene.start('level2Scene');
                        }else{
                            this.lock.play();
                        }
                    break;
                case 3:
                    if(level3=="clear"||level3=="open"){
                        menu_bgm.setLoop(false);
                        menu_bgm.stop();
                        this.select.play();
                        this.scene.start('level3Scene');
                        }else{
                            this.lock.play();
                        }
                    break;

                case 4:
                    if(level4=="clear"||level4=="open"){
                        menu_bgm.setLoop(false);
                        menu_bgm.stop();
                        this.select.play();
                        this.scene.start('level4Scene');
                        }else{
                            console.log("PLAYING SOUND");
                            this.lock.play();
                        }
                    break;    
            
                default:
                    break;
            }
        }
    






    } 
    }
createMenu(){

    this.test = this.add.rectangle(32, 32, 576, 576, 0x088F8F).setOrigin(0);
    this.restart = this.add.text(game.config.width/2, game.config.height/2-200, "Tutorial", this.textConfig).setOrigin(0.5);
    this.level = this.add.text(game.config.width/2, game.config.height/2-100, "Level select", this.textConfig).setOrigin(0.5);
    this.cursor = this.add.sprite(this.cursorPosx, this.cursorPosy,'cursor').setOrigin(0);
}

deleteMenu(){
    this.test.alpha = 0;
    this.restart.alpha = 0;
    this.level.alpha = 0;
    
    
}

createMenu2(){

    this.test = this.add.rectangle(32, 32, 576, 576, 0x088F8F).setOrigin(0);
    this.restart = this.add.text(game.config.width/2, game.config.height/2-200, "Menu", this.textConfig).setOrigin(0.5);
    this.cursor2 = this.add.sprite(this.cursorPosx, this.cursorPosy,'cursor').setOrigin(0);
}

deleteMenu2(){
    this.test.alpha = 0;
    this.restart.alpha = 0;
    this.level.alpha = 0;
    this.cursor2.destroy();
    
    
}

}