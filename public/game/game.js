var audioContext;
var socket = io('http://192.168.0.100:3000');

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
var countdown;
var slider_position = 30;
var is_lever_down = false;
var complete_jump = false;
var arrow;
var frame_rate = 300;
var one;
var two;
var three;
var number;
var num_tries = 0;
var num_correct = 0;


function act_on_position(position) {
    slider_position = position;
}

function preload ()
{

    this.load.image('sky', '../assets/background.png')
    this.load.image('square', '../assets/square.png');
    this.load.image('circle', '../assets/circle.png');
    this.load.image('triangle', '../assets/triangle.png');
    this.load.image('arrow', '../assets/arrow.png');
    this.load.image('arrow-left', '../assets/arrow-left.png');
    this.load.image('arrow-right', '../assets/arrow-right.png');
    this.load.audio('ding', ['../assets/ding.mp3']);
    this.load.audio('countdown', ['../assets/countdown.mp3']);
    this.load.image('one', '../assets/one.png');
    this.load.image('two', '../assets/two.png');
    this.load.image('three', '../assets/three.png');
}

function create ()
{
    this.add.image(400, 300, 'sky');

    circle = this.physics.add.sprite(100, 100, 'circle');
    triangle = this.physics.add.sprite(400, 100, 'triangle');
    square = this.physics.add.sprite(700, 100, 'square');
    arrow = this.physics.add.sprite(400, 300, 'arrow');
    number = this.physics.add.sprite(400, 550, 'three');

    ding = this.sound.add('ding');
    countdown = this.sound.add('countdown');

    var rand_num = Math.floor((Math.random() * 3));
    if (rand_num==0){
        rand_shape = this.physics.add.sprite(400, 400, 'circle');
        answer = "circle";
    }else if (rand_num==1){
        rand_shape = this.physics.add.sprite(400, 400, 'triangle');
        answer = "triangle";
    }else{
        rand_shape = this.physics.add.sprite(400, 400, 'square');
        answer = "square";
    }
}

function update (){
    arrow.destroy();
    if (slider_position<=20){
        arrow = this.physics.add.sprite(400, 300, 'arrow-left');
    }else if (slider_position <=45){
        arrow = this.physics.add.sprite(400, 300, 'arrow');
    }else{
        arrow = this.physics.add.sprite(400, 300, 'arrow-right');
    }
    if (this.input.mouse.manager.activePointer.isDown && frame_rate==0){
        number.destroy();
        num_tries++;
        rand_shape = this.physics.add.sprite(400, 500, answer);
        arrow.destroy();
        if (this.input.y<=150){
            if (this.input.x<=150){
                arrow = this.physics.add.sprite(400, 300, 'arrow-left');
                if(answer == "circle"){
                    console.log(correct)
                    correct = true;
                    movement = true;
                }
            }else if (this.input.x >350 && this.input.x<=450){
                arrow = this.physics.add.sprite(400, 300, 'arrow');
                if (answer == "triangle"){
                    console.log(correct)
                    correct = true;
                    movement = true;
                }
            }else if (this.input.x >650 && this.input.x<=750){
                arrow = this.physics.add.sprite(400, 300, 'arrow-right');
                if (answer =="square"){
                    console.log(correct)
                    correct = true;
                    movement = true;
                }
            }
        }
    }else if (is_lever_down && frame_rate==0) {
        number.destroy();
        num_tries++;
        rand_shape = this.physics.add.sprite(400, 500, answer);
            if (slider_position<=20){

                if(answer == "circle"){
                    console.log(correct)
                    correct = true;
                    movement = true;
                }
            }else if (slider_position <=45){
                if (answer == "triangle"){
                    console.log(correct)
                    correct = true;
                    movement = true;
                }
            }else if (slider_position>40){
                if (answer =="square"){
                    console.log(correct)
                    correct = true;
                    movement = true;
                }
        }
        is_lever_down = false;
    }
    var sprite={};
    if (correct){
        num_correct++;
        frame_rate=300;

        if (rand_shape.y>100){
            rand_shape.y-=16;
        }
        if (answer == "circle"){
            sprite=circle;
            if (rand_shape.x>100){
                rand_shape.x-=15;
            }
        }else if(answer=="square"){
            sprite=square;
            if (rand_shape.x<700){
                rand_shape.x+=15;
            }
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
        rand_shape.destroy();
        var rand_num = Math.floor((Math.random() * 3));
        if (rand_num==0){
            rand_shape = this.physics.add.sprite(400, 400, 'circle');
            answer = "circle";
        }else if (rand_num==1){
            rand_shape = this.physics.add.sprite(400, 400, 'triangle');
            answer = "triangle";
        }else{
            rand_shape = this.physics.add.sprite(400, 400, 'square');
            answer = "square";
        }
        movement = false;
        correct = false;
        up_direction = true;
        number = this.physics.add.sprite(400, 550, 'three');
    }

    if (frame_rate==0){
        number.destroy();
        rand_shape.destroy();
    }else{
        frame_rate--;
        if ((frame_rate%100)==0){
            countdown.play();
            number.destroy();
            if ((frame_rate/100)==2){
                number = this.physics.add.sprite(400, 550, 'two');
            }else if ((frame_rate/100)==1){
                number = this.physics.add.sprite(400, 550, 'one');
            }
        }
    }
}
