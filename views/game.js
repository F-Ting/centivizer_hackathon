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
var rand_shape;
var up_direction = true;
var movement = false;
var correct = false;
var answer;
var ding;
var complete_jump = false;

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

    var rand_num = Math.floor((Math.random() * 3));
    if (rand_num==0){
        rand_shape = this.physics.add.sprite(400, 300, 'circle');
        answer = "circle";
    }else if (rand_num==1){
        rand_shape = this.physics.add.sprite(400, 300, 'triangle');
        answer = "triangle";
    }else{
        rand_shape = this.physics.add.sprite(400, 300, 'square');
        answer = "square";
    }
}

function update (){
    if (this.input.mouse.manager.activePointer.isDown){
        if (this.input.y<=150){
            if (this.input.x<=150){
                if(answer == "circle"){
                    console.log(correct)
                    correct = true;
                    movement = true;
                }
            }else if (this.input.x >350 && this.input.x<=450){
                if (answer == "triangle"){
                    console.log(correct)
                    correct = true;
                    movement = true;
                }
            }else if (this.input.x >650 && this.input.x<=750){
                if (answer =="square"){
                    console.log(correct)
                    correct = true;
                    movement = true;
                }
            }
        }
    }
    var sprite={};
    if (correct){
        if (answer == "circle"){
            sprite=circle;
        }else if(answer=="square"){
            sprite=square;
        }else if (answer=="triangle"){
            sprite=triangle;
        }
    }

    if (movement){
        if (up_direction){
            if (sprite.y>=70){
                sprite.y-=3;
            }else{
                ding.play();
                up_direction =!up_direction;
            }
        }else{
            if (sprite.y>=100){
                movement = false;
                complete_jump = true;
            }
            sprite.y+=3;
        }
    }

    if (complete_jump){
        complete_jump = false;
        console.log("here");
        rand_shape.destroy();
        var rand_num = Math.floor((Math.random() * 3));
        if (rand_num==0){
            rand_shape = this.physics.add.sprite(400, 300, 'circle');
            answer = "circle";
        }else if (rand_num==1){
            rand_shape = this.physics.add.sprite(400, 300, 'triangle');
            answer = "triangle";
        }else{
            rand_shape = this.physics.add.sprite(400, 300, 'square');
            answer = "square";
        }
        console.log("here2")
        movement = false;
        correct = false;
        up_direction = true;
        console.log(correct);

    }

}

function rand_sprite_generator(game){
    var rand_num = Math.floor((Math.random() * 3));
    if (rand_num==0){
        rand_shape = this.physics.add.sprite(400, 300, 'circle');
    }else if (rand_num==1){
        rand_shape = this.physics.add.sprite(400, 300, 'triangle');
    }else{
        rand_shape = this.physics.add.sprite(400, 300, 'square');
    }
}
