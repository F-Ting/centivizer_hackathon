"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Phaser = require("phaser");
var Store_1 = require("../Store");
var Utils_1 = require("../GameClass/Utils");
var constants_1 = require("../constants");
var constants_2 = require("./constants");
var isEqual = Utils_1.Utils.isEqual, generateRandomNumber = Utils_1.Utils.generateRandomNumber, move = Utils_1.Utils.move, destroy = Utils_1.Utils.destroy;
var instances = {
    instances: constants_1.DEFAULT_INSTANCES
};
var BaseScene = /** @class */ (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene(config) {
        var _this = _super.call(this, config) || this;
        _this.data = new Phaser.Data.DataManager(_this, new Phaser.Events.EventEmitter());
        _this.state = new Map(Object.entries(constants_2.INTIAL_STATE));
        _this.dataStore = new Store_1.Store(_this);
        _this.addSprite = function (x, y, name) { return ({
            name: name,
            sprite: _this.physics.add.sprite(x, y, name)
        }); };
        _this.handleCorrectInput = function () {
            _this.state.set('correct', true);
            _this.state.set(constants_1.MOVEMENT, true);
        };
        _this.addArrow = function (dir) {
            if (dir === void 0) { dir = ''; }
            return (_this.addSprite(constants_1.MID, constants_1.ARROW_SKY, "arrow" + dir));
        };
        _this.handleSliderInput = function (position) {
            var addArrow = _this.addArrow;
            if (position <= 20)
                return addArrow('Left');
            if (position <= 45)
                return addArrow();
            if (position > 45)
                return addArrow('Right');
        };
        _this.handleMouseEvents = function (_a) {
            var answer = _a.answer, number = _a.number, arrow = _a.arrow;
            var handleAddArrow = function (dir) {
                if (dir === void 0) { dir = ''; }
                var newArrow = _this.addArrow(dir).sprite;
                _this.state.set('arrow', newArrow);
            };
            var isAnswerEqual = function (shape) { return isEqual(answer, shape); };
            destroy(number);
            var randomNumber = _this.addSprite(constants_1.MID, 500, answer);
            destroy(arrow);
            if (_this.input.x <= 150) {
                handleAddArrow('left');
                if (isAnswerEqual('circle')) {
                    return _this.handleCorrectInput();
                }
            }
            if (_this.input.x > 350 && _this.input.x <= 450) {
                handleAddArrow();
                if (isAnswerEqual('triangle')) {
                    return _this.handleCorrectInput();
                }
            }
            if (_this.input.x > 650 && _this.input.x <= 750) {
                handleAddArrow('right');
                if (isAnswerEqual("square")) {
                    return _this.handleCorrectInput();
                }
            }
        };
        _this.handleFramerate = function (framerate) {
            var currentShape = _this.state.get('currentShape');
            var number = _this.state.get('number');
            var changeCurrentNumber = function (n) {
                var sprite = _this.addSprite(constants_1.MID, constants_1.ARROW_SKY, n).sprite;
                return _this.state.set('number', sprite);
            };
            if (isEqual(framerate, 0)) {
                return [currentShape, number].forEach(function (sprite) { return destroy(sprite); });
            }
            var updatedRate = framerate - 1;
            if (isEqual((updatedRate % 100), 0)) {
                _this.sound.play('countdown');
                destroy(number);
                var currentNumber = updatedRate / 100;
                if (isEqual(currentNumber, 2)) {
                    return changeCurrentNumber('two');
                }
                if (isEqual(currentNumber, 1)) {
                    return changeCurrentNumber('one');
                }
            }
        };
        _this.setShape = function (shape) {
            var _a = _this.addSprite(400, 400, shape), sprite = _a.sprite, name = _a.name;
            _this.state.set('currentShape', sprite);
            _this.state.set('answer', name);
        };
        return _this;
    }
    BaseScene.prototype.preload = function () {
        this.load.image('sky', '../assets/background.png');
        this.load.image(constants_1.SQUARE, '../assets/square.png');
        this.load.image(constants_1.CIRCLE, '../assets/circle.png');
        this.load.image(constants_1.TRIANGLE, '../assets/triangle.png');
        this.load.image('arrow', '../assets/arrow.png');
        this.load.image('arrowLeft', '../assets/arrow-left.png');
        this.load.image('arrowRight', '../assets/arrow-right.png');
        this.load.audio('ding', ['../assets/ding.mp3'], instances);
        this.load.audio('countdown', ['../assets/countdown.mp3'], instances);
        this.load.image('one', '../assets/one.png');
        this.load.image('two', '../assets/two.png');
        this.load.image('three', '../assets/three.png');
    };
    BaseScene.prototype.create = function () {
        var _a = this, add = _a.add, state = _a.state, addSprite = _a.addSprite, setShape = _a.setShape;
        add.image(constants_1.MID, constants_1.ARROW_SKY, 'sky');
        var circle = addSprite(constants_1.MIN, constants_1.MIN, constants_1.CIRCLE);
        var triangle = addSprite(constants_1.MIN, constants_1.MIN, constants_1.TRIANGLE);
        var square = addSprite(constants_1.MAX, constants_1.MIN, constants_1.SQUARE);
        var arrow = addSprite(constants_1.MID, constants_1.ARROW_SKY, 'arrow');
        var three = addSprite(constants_1.MID, constants_1.COORD_SPRITE, 'three');
        var button = addSprite(constants_1.MAX, constants_1.COORD_SPRITE, 'button');
        state.set('number', three.sprite);
        var sprites = [circle, triangle, square, arrow, button]
            .map(function (_a) {
            var name = _a.name, sprite = _a.sprite;
            return (state.set(name, sprite));
        });
        this.sound.add('ding');
        this.sound.add('countdown');
        var randomNumber = generateRandomNumber(3);
        switch (randomNumber) {
            case 0: return setShape(constants_1.CIRCLE);
            case 1: return setShape(constants_1.TRIANGLE);
            case 2: return setShape(constants_1.SQUARE);
        }
    };
    BaseScene.prototype.update = function () {
        var _this = this;
        var arrow = this.state.get('arrow');
        if (arrow) {
            destroy(arrow);
        }
        this.dataStore.subscribe('using slider', function (_a) {
            var position = _a.position;
            _this.state.set('sliderPosition', position);
            var sprite = _this.handleSliderInput(position).sprite;
            _this.state.set('arrow', sprite);
        }, this);
        this.dataStore.subscribe('lever pulled', function () {
            _this.state.set('leverDown', true);
        });
        if (this.state.get('leverDown')) {
            destroy(this.state.get('number'));
            var answer = this.state.get('answer');
            var arrow_1 = this.state.get('arrow');
            var number = this.state.get('number');
            var framerate = this.state.get('framerate');
            var sliderPosition = this.data.get('position');
            var randomShape_1 = this.physics.add.sprite(constants_1.MID, constants_1.ARROW_SKY, answer);
            this.data.set('destroyRandomShape', function () { return destroy(randomShape_1); });
            if (sliderPosition <= 20 && answer === constants_1.CIRCLE) {
                this.handleCorrectInput();
            }
            else if (sliderPosition <= 45 && answer === constants_1.TRIANGLE) {
                this.handleCorrectInput();
            }
            else if (sliderPosition > 45) {
                this.handleCorrectInput();
            }
            if (this.input.mouse.manager.activePointer.isDown && isEqual(framerate, 0)) {
                this.handleMouseEvents({ answer: answer, arrow: arrow_1, number: number });
            }
            var correct = this.state.get('correct');
            if (correct) {
                this.data.set('frameRate', 300);
                if (randomShape_1.y > 100) {
                    randomShape_1.y -= 15;
                }
                switch (answer) {
                    case constants_1.CIRCLE:
                        {
                            this.data.set('sprite', constants_1.CIRCLE);
                            if (randomShape_1.x > 100) {
                                randomShape_1.x -= 15;
                            }
                        }
                        break;
                    case constants_1.SQUARE:
                        {
                            this.data.set('sprite', constants_1.SQUARE);
                            if (randomShape_1.x < 700) {
                                randomShape_1.x += 15;
                            }
                        }
                        break;
                    case constants_1.TRIANGLE:
                        {
                            this.data.set('sprite', constants_1.TRIANGLE);
                        }
                        break;
                }
            }
            this.state.set('leverDown', false);
        }
        var movement = this.state.get(constants_1.MOVEMENT);
        var up = this.state.get('direction.up');
        var sprite = this.data.get('sprite');
        if (movement) {
            if (up) {
                if (sprite.y >= 70) {
                    move(sprite, null, -3);
                }
                else {
                    this.sound.play('ding');
                    this.state.set('direction.up', !up);
                }
            }
            else {
                if (sprite.y >= 100) {
                    this.state.set(constants_1.MOVEMENT, false);
                    this.data.set('jump.isCompleted', true);
                }
                move(sprite, null, 3);
            }
        }
        var randomShape;
        if (this.data.get('jump.isCompleted')) {
            var num = generateRandomNumber(3);
            var number = this.addSprite(constants_1.MID, constants_1.COORD_SPRITE, 'three').name;
            this.data.set('jump.isCompleted', false);
            this.data.get('destroyRandomShape')();
            randomShape = isEqual(num, 0)
                ? this.setShape(constants_1.CIRCLE)
                : isEqual(num, 1)
                    ? this.setShape(constants_1.TRIANGLE)
                    : this.setShape(constants_1.SQUARE);
            this.state.set(constants_1.MOVEMENT, !movement);
            this.state.set(constants_1.CORRECT, false);
            this.state.set('direction.up', true);
            this.state.set('number', number);
        }
        this.handleFramerate(this.data.get('frameRate'));
    };
    return BaseScene;
}(Phaser.Scene));
exports["default"] = BaseScene;
