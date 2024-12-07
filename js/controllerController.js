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
        const point1 = this.shapeController.addPoint(100, 300, 15, true);
        const point2 = this.shapeController.addPoint(500, 300, 15, true, point1);
        const point3 = this.shapeController.addPoint(300, 200, 15, true, point1, point2);
        point1.adjPoint1 = point2;
        point1.adjPoint2 = point3;
        point2.adjPoint2 = point3;
        this.renderShape()
    }

    addEventListeners() {
        this.interactionController.mouseDownListener((mouseX, mouseY) => {this.pointClick(mouseX, mouseY)});
        this.interactionController.mouseMoveListener((mouseX, mouseY) => {this.movePoint(mouseX, mouseY)});
        this.interactionController.mouseReleaseListener((mouseX, mouseY) => {this.releasePoint(mouseX, mouseY)})
    }

    renderShape() {
        const points = this.shapeController.points;
        for(var i = 0; i < points.length; i++) {
            const point = points[i];
            this.renderPoints(point);
            this.renderLines(point);
        }
        
    }

    renderPoints(point) {
        this.canvasController.drawSquare(point.xx, point.yy, point.size, [100, 100, 100]);
    }

    renderLines(point) {
        this.canvasController.drawLine(point.xx, point.yy, point.adjPoint1.xx, point.adjPoint1.yy, 10, [100, 100, 100]);
        this.canvasController.drawLine(point.xx, point.yy, point.adjPoint2.xx, point.adjPoint2.yy, 10, [100, 100, 100]);
    }

    movePoint(mouseX, mouseY) {
        const point = this.shapeController.selectedPoint();
        if(point != undefined) {
            point.xx = mouseX - this.pointOffset.xx;
            point.yy = mouseY - this.pointOffset.yy;
            this.canvasController.resetCanvas();
            this.renderShape();
        }
    }

    pointClick(mouseX, mouseY) {
        const points = this.shapeController.points;
        for(var i = 0; i < points.length; i++) {
            const point = points[i];

            if(mouseX >= point.xx && mouseX <= point.xx + point.size
                && mouseY >= point.yy && mouseY <= point.yy + point.size
            ) {
                point.selected = true;
                this.pointOffset.xx = mouseX - point.xx;
                this.pointOffset.yy = mouseY - point.yy;
            }
        }
    }

    releasePoint(mouseX, mouseY) {
        const points = this.shapeController.points;
        for(var i = 0; i < points.length; i++) {
            const point = points[i];
            point.selected = false;
        }
    }
}

module.exports = ControllerController