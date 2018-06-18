"use strict";
exports.__esModule = true;
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.move = function (sprite, x, y) {
        if (x) {
            sprite.x += x;
        }
        if (y) {
            sprite.y += y;
        }
    };
    Utils.generateRandomNumber = function (n) { return Math.floor(Math.random() * n); };
    Utils.destroy = function (sprite) { return sprite.destroy(); };
    Utils.isEqual = function (compare, n) { return compare === n; };
    return Utils;
}());
exports.Utils = Utils;
