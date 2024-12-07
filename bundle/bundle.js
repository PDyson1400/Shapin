(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class CanvasController {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
    }

    drawSquare(xx, yy, size, colour) {
        this.ctx.fillStyle = `rgb(${colour[0]} ${colour[1]} ${colour[2]})`
        this.ctx.fillRect(xx, yy, xx + size, yy + size);
    }
}

module.exports = CanvasController
},{}],2:[function(require,module,exports){
const CanvasController = require("./canvasController")

const canvasController = new CanvasController()
canvasController.drawSquare(100, 100, 100, [0, 255, 255])
},{"./canvasController":1}]},{},[2]);
