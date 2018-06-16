var audioContext;
try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
} catch (e) {
    console.error(e);
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update:update
    },
    audio: {
       context: audioContext
   }
};
var game = new Phaser.Game(config);
var circle;
var triangle;
var square;
var direction = true;
var movement = true;
var correct = true;
var answer = "triangle";
var ding;

function preload ()
{

    this.load.image('sky', './assets/background.png')
    this.load.image('square', './assets/square.png');
    this.load.image('circle', './assets/circle.png');
    this.load.image('triangle', 'assets/triangle.png');
    this.load.audio('ding', ['./assets/ding.mp3']);
}

function create ()
{
    this.add.image(400, 300, 'sky');

    circle = this.physics.add.sprite(100, 100, 'circle');
    triangle = this.physics.add.sprite(400, 100, 'triangle');
    square = this.physics.add.sprite(700, 100, 'square');

    ding = this.sound.add('ding');
}

function update ()
{
    var sprite;
    if (correct){
        if (answer == "circle"){
            sprite=circle;
        }else if(answer=="square"){
            sprite=square;
        }else{
            sprite=triangle;
        }
    }
    if (movement){

        if (direction){
            if (sprite.y>=70){
                sprite.y-=3;
            }else{
                ding.play();
                direction =!direction;
            }
        }else{
            if (sprite.y>=100){
                direction = !direction;
            }
            sprite.y+=3;
        }
    }
}
