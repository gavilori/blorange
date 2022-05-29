class Select extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, length, width, fillColor,status) {
        super(scene,x,y,width,length,fillColor);
        if(status=="clear"){
            this.fillColor = 0x00FF00;
        }else if(status == "open"){
            this.fillColor = 0xFF0000;
        }else if(status == "lock"){
            this.fillColor = 0x000000;
        }
        this.scene.add.existing(this);
    }
}