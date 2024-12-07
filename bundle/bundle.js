(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class CanvasController {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");

        this.windowResizeListener();
    }

    setCanvasDimensions() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    resetCanvas() {
        this.ctx.fillStyle = "rgb(0, 0, 0)";
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    drawSquare(xx, yy, size, colour) {
        this.ctx.fillStyle = `rgb(${colour[0]} ${colour[1]} ${colour[2]})`;
        this.ctx.fillRect(xx, yy, size, size);
    }

    drawLine(startXx, startYy, endXx, endYy, width, colour) {
        this.ctx.strokeStyle = `rgb(${colour[0]} ${colour[1]} ${colour[2]})`;
        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        this.ctx.moveTo(startXx, startYy);
        this.ctx.lineTo(endXx, endYy);
        this.ctx.stroke();
        context.closePath();
    }

    private

    windowResizeListener() {
        window.onresize = this.setCanvasDimensions.bind(this);
    }
}

module.exports = CanvasController;
},{}],2:[function(require,module,exports){
const CanvasController = require("./canvasController");
const InteractionController = require("./interactionController");
const ShapeController = require("./shapeController");

class ControllerController {
    constructor() {
        this.canvasController = new CanvasController();
        this.interactionController = new InteractionController();
        this.shapeController = new ShapeController();

        this.pointOffset = {xx: 0, yy: 0};
    }

    setUp() {
        this.addStartingPoints();
        this.addEventListeners();
    }

    private

    addStartingPoints() {
        this.shapeController.addPoint(100, 100, 15, true);
        this.shapeController.addPoint(500, 100, 15, true);
        this.renderPoints()
    }

    addEventListeners() {
        this.interactionController.mouseClickListener((mouseX, mouseY) => {this.pointClick(mouseX, mouseY)});
        this.interactionController.mouseMoveListener((mouseX, mouseY) => {this.movePoint(mouseX, mouseY)});
    }

    renderPoints() {
        const points = this.shapeController.points;
        for(var i = 0; i < points.length; i++) {
            const point = points[i];
            this.canvasController.drawSquare(point.xx, point.yy, point.size, [100, 100, 100]);
        }
    }

    movePoint(mouseX, mouseY) {
        const point = this.shapeController.selectedPoint();
        if(point != undefined) {
            point.xx = mouseX - this.pointOffset.xx;
            point.yy = mouseY - this.pointOffset.yy;
            this.canvasController.resetCanvas();
            this.renderPoints();
        }
    }

    pointClick(mouseX, mouseY) {
        const points = this.shapeController.points;
        for(var i = 0; i < points.length; i++) {
            const point = points[i];

            if(mouseX >= point.xx && mouseX <= point.xx + point.size
                && mouseY >= point.yy && mouseY <= point.yy + point.size
            ) {
                point.selected = !point.selected;
                this.pointOffset.xx = mouseX - point.xx;
                this.pointOffset.yy = mouseY - point.yy;
            }
        }
    }
}

module.exports = ControllerController
},{"./canvasController":1,"./interactionController":4,"./shapeController":5}],3:[function(require,module,exports){
const ControllerController = require ("./controllerController");

const controllerController = new ControllerController();

controllerController.setUp();
},{"./controllerController":2}],4:[function(require,module,exports){
class InteractionController {
    constructor() {
    }

    mouseMoveListener(action) {
        const event = "mousemove"
        addEventListener(event, (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            action(mouseX, mouseY);
        });
        return this.createRemoveListenerFunction(event, action);
    }

    mouseClickListener(action) {
        const event = "click"
        addEventListener(event, (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            action(mouseX, mouseY);
        });
        return this.createRemoveListenerFunction(event, action);
    }

    mouseReleaseListener(action) {
        const event = "mouseup"
        addEventListener(event, () => {action()});
        return this.createRemoveListenerFunction(event, action);
    }

    private

    createRemoveListenerFunction(event, action) {
        return function() {
            removeEventListener(event, action);
        }
    }
}

module.exports = InteractionController
},{}],5:[function(require,module,exports){
class ShapeController {
    constructor() {
        this.points = []
    }

    addPoint(xx, yy, size, set=false, leftPoint={}, rightPoint={}){
        this.points.push({ xx, yy, size, set, leftPoint, rightPoint, selected: false});
    }

    selectedPoint() {
        for(var i = 0; i < this.points.length; i++) {
            if(this.points[i].selected == true) {return this.points[i]};
        }
    }
}

module.exports = ShapeController
},{}]},{},[3]);
