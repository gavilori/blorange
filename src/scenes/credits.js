class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        this.grid = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg3').setOrigin(0);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.textConfig = {
            fontFamily: "Verdana",
            fontSize: '35px',
            color: '#dedede',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.test = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'pause').setOrigin(0);
        this.restart = this.add.text(game.config.width/2, game.config.height/2-200, "Credits", this.textConfig).setOrigin(0.5);
        
        this.textConfig.fontSize = '20px';
        this.add.text(game.config.width/2, game.config.height/2-140, "Main Programmer, Level Designer", this.textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2-110, "Jonathan Alvarez", this.textConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2-50, "Audio Designer, Graphics Artist, Level Designer", this.textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2-20, "Gyle Viloria", this.textConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2+40, "Graphics Artist", this.textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2+70, "Rebecca Slason", this.textConfig).setOrigin(0.5);
        
        this.add.text(game.config.width/2, game.config.height-100, "Press [ESC] to return to Menu", this.textConfig).setOrigin(0.5);
    }

    update() {
        this.grid.tilePositionX +=2;
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('menuScene')
        }
    }
}