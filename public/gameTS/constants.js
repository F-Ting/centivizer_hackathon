"use strict";
exports.__esModule = true;
var Constants;
(function (Constants) {
    Constants[Constants["mid"] = 400] = "mid";
    Constants[Constants["min"] = 100] = "min";
    Constants[Constants["max"] = 700] = "max";
    Constants[Constants["arrow.sky"] = 300] = "arrow.sky";
    Constants[Constants["coord.sprite"] = 550] = "coord.sprite";
    Constants[Constants["instances.default"] = 1] = "instances.default";
    Constants["arrow.main"] = "arrow";
    Constants["physics.default"] = "arcade";
    Constants["shapes.circle"] = "circle";
    Constants["shapes.square"] = "square";
    Constants["shapes.triangle"] = "TRIANGLE";
    Constants["action.movement"] = "movement";
    Constants["action.isCorrect"] = "correct";
})(Constants = exports.Constants || (exports.Constants = {}));
exports.DEFAULT_INSTANCES = Constants['instances.default'];
exports.MID = Constants.mid;
exports.MIN = Constants.min;
exports.MAX = Constants.max;
exports.ARROW_SKY = Constants['arrow.sky'];
exports.COORD_SPRITE = Constants['coord.sprite'];
exports.CIRCLE = Constants['shapes.circle'];
exports.SQUARE = Constants['shapes.square'];
exports.TRIANGLE = Constants['shapes.triangle'];
exports.ARROW = Constants['arrow.main'];
exports.PHYSICS_DEFAULT = Constants['physics.default'];
exports.MOVEMENT = Constants['action.movement'];
exports.CORRECT = Constants['action.isCorrect'];
var Config;
(function (Config) {
    Config[Config["WIDTH"] = 800] = "WIDTH";
    Config[Config["HEIGHT"] = 600] = "HEIGHT";
})(Config = exports.Config || (exports.Config = {}));
