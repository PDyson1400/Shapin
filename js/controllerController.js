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