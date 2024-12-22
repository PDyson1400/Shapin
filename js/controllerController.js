const CanvasController = require("./canvasController");
const InteractionController = require("./interactionController");
const ShapeController = require("./shapeController");

class ControllerController {
    constructor() {
        this.canvasController = new CanvasController();
        this.interactionController = new InteractionController();
        this.shapeController = new ShapeController();

        this.mouse = {
            pointOffset: {xx: 0, yy: 0},
            last: {xx: 0, yy: 0}
        }
        this.lastCrossedLine = false;
    }

    setUp() {
        this.addStartingPoints();
        this.addEventListeners();
    }

    private;

    addStartingPoints() {
        const point1 = this.shapeController.addPoint(100, 300, 15, true);
        const point2 = this.shapeController.addPoint(500, 300, 15, true, point1);
        const point3 = this.shapeController.addPoint(300, 200, 15, true, point2, point1);
        point1.adjPoint1 = point3;
        point1.adjPoint2 = point2;
        point2.adjPoint2 = point3;

        this.shapeController.addPoint(300, 250, 15, false);

        this.renderShapes();
    }

    addEventListeners() {
        this.interactionController.mouseDownListener((mouseX, mouseY) => {this.pointClick(mouseX, mouseY);});
        this.interactionController.mouseMoveListener((mouseX, mouseY) => {this.movePoint(mouseX, mouseY);});
        this.interactionController.mouseReleaseListener((mouseX, mouseY) => {this.releasePoint(mouseX, mouseY);});
    }

    renderTestShapes() {
        const testPoints = this.shapeController.test.points;
        const testLines = this.shapeController.test.lines;

        for(var i = 0; i < testPoints.length; i++) {
            const testPoint = testPoints[i];
            this.renderPoints(testPoint);
        }
        for(var i = 0; i < testLines.length; i++) {
            const testLine = testLines[i];
            testLine.startPoint.size = 5;
            testLine.endPoint.size = 5;

            this.canvasController.drawLine(testLine.startPoint, testLine.endPoint, 10, [200, 100, 150]);
        }
    }

    renderShapes() {
        const points = this.shapeController.points;
        for(var i = 0; i < points.length; i++) {
            const point = points[i];
            this.renderLines(point);
        }
        if(this.lastCrossedLine != false) {
            this.renderLastCrossedLine();
        }
        for(var i = 0; i < points.length; i++) {
            const point = points[i];
            this.renderPoints(point);
        }
        this.renderTestShapes()
    }

    renderPoints(point) {
        this.canvasController.drawSquare(point.xx, point.yy, point.size, [100, 150, 200]);
    }

    renderLines(point) {
        this.canvasController.drawLine(point, point.adjPoint1, 10, [100, 100, 150]);
    }

    renderLastCrossedLine() {
        const {startPoint, endPoint, midPoint} = this.lastCrossedLine;
        this.canvasController.drawLine(startPoint, midPoint, 10, [150, 100, 100]);
        this.canvasController.drawLine(midPoint, endPoint, 10, [150, 100, 100]);
    }

    setCrossedLine(point, crossedLine) {
        point.inside = this.shapeController.isPointInsideShape(point);

        if(!point.inside && crossedLine != false && this.lastCrossedLine == false) {
            this.lastCrossedLine = {
                startPoint: crossedLine.startPoint,
                midPoint: point,
                endPoint: crossedLine.endPoint
            };
        } else if (point.inside && this.lastCrossedLine != false) {
            this.lastCrossedLine = false;
        }
    }

    movePoint(mouseX, mouseY) {
        const point = this.shapeController.getSelectedPoint();
        if(point != undefined && !point.set) {
            const moveLine = {startPoint: {xx: this.mouse.last.xx, yy: this.mouse.last.yy}, 
                endPoint: {xx: mouseX, yy: mouseY}};
            this.mouse.last.xx = mouseX;
            this.mouse.last.yy = mouseY;
            
            const crossedLine = this.shapeController.lineCrossesLine(moveLine);

            point.xx = mouseX - this.mouse.pointOffset.xx;
            point.yy = mouseY - this.mouse.pointOffset.yy;

            this.setCrossedLine(point, crossedLine);

            this.canvasController.resetCanvas();
            this.renderShapes();
        }
    }

    pointClick(mouseX, mouseY) {
        const points = this.shapeController.points;
        for(var i = 0; i < points.length; i++) {
            const point = points[i];

            if(mouseX >= point.xx && mouseX <= point.xx + point.size
                && mouseY >= point.yy && mouseY <= point.yy + point.size
                && !point.set
            ) {
                point.selected = true;
                this.mouse.pointOffset.xx = mouseX - point.xx;
                this.mouse.pointOffset.yy = mouseY - point.yy;
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

module.exports = ControllerController;