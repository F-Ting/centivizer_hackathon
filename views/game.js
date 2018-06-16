var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};
var game = new Phaser.Game(config);

function preload ()
{
    //this.load.setBaseURL('http://labs.phaser.io');

    //this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('sky', './assets/background.png')
    this.load.image('square', './assets/square.png');
    this.load.image('circle', './assets/circle.png');
    this.load.image('triangle', 'assets/triangle.png');

}

function create ()
{
    this.add.image(400, 300, 'sky');
    this.add.image(100,100,'circle');
    this.add.image(400,100,'triangle');
    this.add.image(700,100,'square');

}
