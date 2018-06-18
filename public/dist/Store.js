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
var EventEmitter = require("eventemitter3");
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    function Store(ctx) {
        var _this = _super.call(this) || this;
        _this.ctx = ctx;
        _this.dispatch = function (event, emitEvent, ctx) {
            if (ctx === void 0) { ctx = _this.ctx; }
            return _super.prototype.emit.call(_this, event, emitEvent, ctx);
        };
        _this.subscribe = function (event, emitted, ctx) {
            if (ctx === void 0) { ctx = _this.ctx; }
            return _super.prototype.on.call(_this, event, emitted, ctx);
        };
        _this.subscribeOnce = function (event, emitted, ctx) {
            if (ctx === void 0) { ctx = _this.ctx; }
            return _super.prototype.once.call(_this, event, emitted, ctx);
        };
        _this["delete"] = function (event, emitted) { return _super.prototype.removeListener.call(_this, event, emitted, _this.ctx); };
        return _this;
    }
    return Store;
}(EventEmitter));
exports.Store = Store;
