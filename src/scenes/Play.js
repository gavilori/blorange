class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {

    }

    create() {
        let textConfig = {
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
        this.add.text(game.config.width/2, game.config.height/2, "Play Scene", textConfig).setOrigin(0.5);
    }

    update() {

    }
}