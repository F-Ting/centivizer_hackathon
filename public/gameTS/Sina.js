"use strict";
exports.__esModule = true;
var constants_1 = require("./constants");
var Phaser = require("phaser");
var GameConfig_1 = require("./Models/GameConfig");
var GameBaseModel_1 = require("./Models/GameBaseModel");
var physics = {
    "default": constants_1.PHYSICS_DEFAULT
};
var context = function (prop, prefix) { return window.hasOwnProperty(prop) ? prop : "" + prefix + prop; };
var audioContext = new window[context('AudioContext', 'webkit')]();
var sceneConfig = {
    key: 'sina',
    active: true,
    visible: true,
    physics: physics,
    plugins: true
};
exports.Sina = new GameBaseModel_1["default"](sceneConfig);
exports.SinaGameConfig = new GameConfig_1["default"]({
    type: Phaser.AUTO,
    width: constants_1.Config.WIDTH,
    height: constants_1.Config.HEIGHT,
    scene: exports.Sina,
    audio: {
        context: audioContext
    },
    physics: physics
});
