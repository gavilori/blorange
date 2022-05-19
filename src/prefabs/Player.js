class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, isActive) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.isActive = isActive;
    }
}