class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('grid', './assets/art/bg.png');
        this.load.image('grid2', './assets/art/bg2.png');
        this.load.image('grid3', './assets/art/grid.png');
        this.load.image('grid4', './assets/art/bg4.png');
        this.load.image('bg3', './assets/art/bg3.png');
        this.load.image('trans1', './assets/art/trans1.png');
        this.load.image('trans2', './assets/art/trans2.png');
        this.load.image('trans3', './assets/art/trans3.png');
        this.load.image('trans4', './assets/art/trans4.png');
        this.load.image('bbox', './assets/art/box_2.png');
        this.load.image('obox', './assets/art/box_1.png');
        this.load.image('gray', './assets/art/gray_box.png');
        this.load.image('const', './assets/art/constant.png');
        this.load.image('p1', './assets/art/player_1.png');
        this.load.image('p2', './assets/art/player_2.png');
        this.load.image('cursor', './assets/art/Cursor.png');
        this.load.image('clear', './assets/art/level_clear.png');
        this.load.image('open', './assets/art/level_unclear.png');
        this.load.image('lock', './assets/art/level_locked.png');
        this.load.image('one', './assets/art/one.png');
        this.load.image('two', './assets/art/two.png');
        this.load.image('three', './assets/art/three.png');
        this.load.image('four', './assets/art/four.png');
        this.load.image('spike', './assets/art/spike.png');
        this.load.image('skull', './assets/art/skull.png');
        this.load.image('pause', './assets/art/pause-bg.png');
        



        this.load.audio('switch', './assets/audio/switch.wav');
        this.load.audio('win', './assets/audio/victory.wav');
        this.load.audio('switch', './assets/audio/switch.wav');
        this.load.audio('press', './assets/audio/switch_press.wav');
        this.load.audio('scroll', './assets/audio/move.wav');
        this.load.audio('lock', './assets/audio/locked.wav');
        this.load.audio('select', './assets/audio/select.wav');
        this.load.audio('level_bgm','./assets/audio/final-game-play.mp3');
        this.load.audio('menu_bgm','./assets/audio/menu.mp3');
        this.load.audio('final','./assets/audio/Boss.mp3');
    }

    create() {
        if(first){
        final_bgm = this.sound.add('final');
        menu_bgm = this.sound.add('menu_bgm');
        bgm = this.sound.add('level_bgm');
        first = false;
        }
        
        this.cursorPos = 1;
        this.cursorPosx = game.config.width-200;
        this.cursorPosy = game.config.height/2-300;
        
        this.menu = false;
       
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
        this.createMenu();
        this.move = this.sound.add('scroll');
        this.select = this.sound.add('select');
        if(!menu_bgm.isPlaying){
            
            
            menu_bgm.setLoop(true);
            menu_bgm.play();
           }

  
    }

    update() {
        this.grid.tilePositionX +=2;
        console.log("CURSOR POS"+this.cursorPos);
        



        
            if(Phaser.Input.Keyboard.JustDown(keyUP)){
                this.move.play();
                if(this.cursorPos==1){
                    this.cursorPos = 3
                }else{
            this.cursorPos--;
                }
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            this.move.play();
            if(this.cursorPos==3){
                this.cursorPos = 1
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

        }


        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.select.play();
            switch (this.cursorPos) {
                case 1:
                    this.scene.start('levelScene');
                    break;
                case 2:
                    this.scene.start('chamber4Scene');
                    break;

                case 3:
                    if(level1!="clear"){
                    level1 = "open";
                    }

                    if(level2!="clear"){
                    level2 = "open";
                    }

                    if(level3!="clear"){
                    level3 = "open";
                    }

                    if(level4!="clear"){
                    level4 = "open";
                    }
                    //Boss = "open";
                    break;

            
                default:
                    break;
            }
        }
    






        // everything that should happen when menu is not active
       
    }
createMenu(){

    this.test = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'pause').setOrigin(0);
    this.restart = this.add.text(game.config.width/2, game.config.height/2-200, "Level Select", this.textConfig).setOrigin(0.5);
    this.level = this.add.text(game.config.width/2, game.config.height/2-100, "Credits", this.textConfig).setOrigin(0.5);
    this.dev = this.add.text(game.config.width/2, game.config.height/2, "DEV MODE UNLOCK LEVELS", this.textConfig).setOrigin(0.5);
    this.cursor = this.add.sprite(this.cursorPosx, this.cursorPosy,'cursor').setOrigin(0);
}

}