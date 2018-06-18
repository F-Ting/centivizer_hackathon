"use strict";
exports.__esModule = true;
var Sina_1 = require("./Sina");
var io = require("socket.io-client");
var socket = io('http://192.168.0.100:3000');
socket.emit('lever start', { chatroom: 'lever' });
socket.on('lever down', function (msg) {
    //Complete action for pulling lever, ex. spin the slots and show the images
    console.log(msg);
    Sina_1.Sina.dataStore.dispatch('lever pulled', {});
});
socket.emit('slider start', { chatroom: 'slider' });
socket.on('slider right', function (_a) {
    var position = _a.sliderPos;
    //Complete action to be carried out when slider is moved to the right
    //this outputs the slider position
    Sina_1.Sina.dataStore.emit('using slider', { position: position });
});
socket.on('slider left', function (_a) {
    var position = _a.sliderPos;
    //Complete action to be carried out when slider is moved to the left
    //this outputs the slider position
    Sina_1.Sina.dataStore.emit('using slider', { position: position });
});
