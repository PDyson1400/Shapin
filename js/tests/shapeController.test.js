const ShapeController = require("../shapeController");

describe("ShapeController", () => {
  
    let shapeController;
    beforeEach(() => {
        shapeController = new ShapeController();
    });

    test("addPoint", () => {
        const adjPoint = {xx: 100, yy: 100, size: 15, set: true, adjPoint1: {}, adjPoint2: {}, selected: false, id: 1};
        const point = {xx: 100, yy: 100, size: 15, set: true, adjPoint1: adjPoint, adjPoint2: {}, selected: false, id: 0};
        shapeController.addPoint(point.xx, point.yy, point.size, point.set, point.adjPoint1, point.adjPoint2);

        expect(shapeController.points[0]).toEqual(point);
    });

    test("getLineData", () => {
        const point1 = shapeController.addPoint(100, 300, 15, true);
        const point2 = shapeController.addPoint(500, 300, 15, true, point1);
        const point3 = shapeController.addPoint(300, 200, 15, true, point2, point1);
        point1.adjPoint1 = point3;
        point1.adjPoint2 = point2;
        point2.adjPoint2 = point3;

        shapeController.addPoint(300, 250, 15, false);

        const data = shapeController.getLineData();
        const lines = data.lines;
        const maxPointX = data.maxPointX;

        expect(lines[0].startPoint.id).toEqual(0);
        expect(lines[0].endPoint.id).toEqual(2);
        expect(lines[1].startPoint.id).toEqual(1);
        expect(lines[1].endPoint.id).toEqual(0);
        expect(lines[2].startPoint.id).toEqual(2);
        expect(lines[2].endPoint.id).toEqual(1);
        expect(maxPointX).toEqual(500);
    });

    test("lineEquation", () => {
        const line1 = {startPoint: {xx: 1, yy: 1}, endPoint: {xx: 2, yy: 3}};
        const line2 = {startPoint: {xx: 2, yy: 3}, endPoint: {xx: 1, yy: 1}};
        const line3 = {startPoint: {xx: 1, yy: 3}, endPoint: {xx: 2, yy: 1}};
        const line4 = {startPoint: {xx: 2, yy: 1}, endPoint: {xx: 1, yy: 3}};
        const line5 = {startPoint: {xx: 1, yy: 1}, endPoint: {xx: 1, yy: 5}};
        const line6 = {startPoint: {xx: 1, yy: 5}, endPoint: {xx: 1, yy: 1}};
        const line7 = {startPoint: {xx: 2, yy: 5}, endPoint: {xx: 3, yy: 5}};
        const line8 = {startPoint: {xx: 2, yy: 5}, endPoint: {xx: 1, yy: 5}};

        expect(shapeController.lineEquation(line1)).toEqual({gradient: 2, yIntercept: -1, xIntercept: 0.5})
        expect(shapeController.lineEquation(line2)).toEqual({gradient: 2, yIntercept: -1, xIntercept: 0.5})
        expect(shapeController.lineEquation(line3)).toEqual({gradient: -2, yIntercept: 5, xIntercept: 2.5})
        expect(shapeController.lineEquation(line4)).toEqual({gradient: -2, yIntercept: 5, xIntercept: 2.5})
        expect(shapeController.lineEquation(line5)).toEqual({gradient: false, yIntercept: false, xIntercept: 1})
        expect(shapeController.lineEquation(line6)).toEqual({gradient: false, yIntercept: false, xIntercept: 1})
        expect(shapeController.lineEquation(line7)).toEqual({gradient: 0, yIntercept: 5, xIntercept: false})
        expect(shapeController.lineEquation(line8)).toEqual({gradient: 0, yIntercept: 5, xIntercept: false})
    });

    test.only("lineInterceptPoint", () => {
        const line1 = {startPoint: {xx: -100, yy: 100}, endPoint: {xx: 200, yy: 400}};
        const line2 = {startPoint: {xx: 100, yy: 0}, endPoint: {xx: 200, yy: 200}};
        const line3 = {startPoint: {xx: 100, yy: 100}, endPoint: {xx: 200, yy: -400}};
        const line4 = {startPoint: {xx: 0, yy: 0}, endPoint: {xx: 300, yy: -300}}
        const line5 = {startPoint: {xx: -100, yy: 100}, endPoint: {xx: 200, yy: 400}};
        const line6 = {startPoint: {xx: 0, yy: 0}, endPoint: {xx: 300, yy: -300}}
        const line7 = {startPoint: {xx: 0, yy: 0}, endPoint: {xx: 100, yy: 200}};
        const line8 = {startPoint: {xx: -500, yy: 100}, endPoint: {xx: 200, yy: 100}};
        const line9 = {startPoint: {xx: 100, yy: 100}, endPoint: {xx: 200, yy: 300}};
        const line10 = {startPoint: {xx: 300, yy: 100}, endPoint: {xx: 300, yy: 900}};
        const line11 = {startPoint: {xx: 100, yy: 100}, endPoint: {xx: 200, yy: 300}};
        const line12 = {startPoint: {xx: 100, yy: 100}, endPoint: {xx: 200, yy: 300}};
        const line13 = {startPoint: {xx: 0, yy: 0}, endPoint: {xx: 100, yy: 200}};
        const line14 = {startPoint: {xx: 100, yy: 100}, endPoint: {xx: 200, yy: 300}};
        const line15 = {startPoint: {xx: 100, yy: 100}, endPoint: {xx: 100, yy: 200}};
        const line16 = {startPoint: {xx: 100, yy: 500}, endPoint: {xx: 200, yy: 500}};

        expect(shapeController.lineInterceptPoint(line1, line2)).toEqual({xx: 400, yy: 600})
        expect(shapeController.lineInterceptPoint(line3, line4)).toEqual({xx: 150, yy: -150})
        expect(shapeController.lineInterceptPoint(line5, line6)).toEqual({xx: -100, yy: 100})
        expect(shapeController.lineInterceptPoint(line7, line8)).toEqual({xx: 50, yy: 100})
        expect(shapeController.lineInterceptPoint(line9, line10)).toEqual({xx: 300, yy: 500})
        expect(shapeController.lineInterceptPoint(line11, line12)).toEqual(true)
        expect(shapeController.lineInterceptPoint(line13, line14)).toEqual(false)
        expect(shapeController.lineInterceptPoint(line15, line16)).toEqual({xx: 100, yy: 500})
    });

    test("lineLength", () => {
        const line = {startPoint: {xx: 1, yy: 1}, endPoint: {xx: 4, yy: 5}};

        expect(shapeController.lineLength(line)).toEqual(5);
    });

    test("pointCrossesLine", () => {
        const line = {startPoint: {xx: 100, yy: 100}, endPoint: {xx: 200, yy: 300}};

        const crosses = shapeController.pointCrossesLine(line, 150, 200);
        expect(crosses).toEqual(true);

        const doesntCross = shapeController.pointCrossesLine(line, 149, 200);
        expect(doesntCross).toEqual(false);

        const doesntCrossEither = shapeController.pointCrossesLine(line, 151, 200);
        expect(doesntCrossEither).toEqual(false);
    });

    test("isPointInsideShape", () => {
        const point1 = shapeController.addPoint(100, 300, 15, true);
        const point2 = shapeController.addPoint(500, 300, 15, true, point1);
        const point3 = shapeController.addPoint(300, 200, 15, true, point2, point1);
        point1.adjPoint1 = point3;
        point1.adjPoint2 = point2;
        point2.adjPoint2 = point3;

        const pointInShape1 = {xx: 300, yy: 250};
        const pointInShape2 = {xx: 300, yy: 299};
        const pointInShape3 = {xx: 105, yy: 299};
        const pointInShape4 = {xx: 400, yy: 255};

        const pointOutOfShape1 = {xx: 295, yy: 180};
        const pointOutOfShape2 = {xx: 195, yy: 230};
        const pointOutOfShape3 = {xx: 400, yy: 240};
        const pointOutOfShape4 = {xx: 300, yy: 305};

        expect(shapeController.isPointInsideShape(pointInShape1)).toEqual(true);
        expect(shapeController.isPointInsideShape(pointInShape2)).toEqual(true);
        expect(shapeController.isPointInsideShape(pointInShape3)).toEqual(true);
        expect(shapeController.isPointInsideShape(pointInShape4)).toEqual(true);

        expect(shapeController.isPointInsideShape(pointOutOfShape1)).toEqual(false);
        expect(shapeController.isPointInsideShape(pointOutOfShape2)).toEqual(false);
        expect(shapeController.isPointInsideShape(pointOutOfShape3)).toEqual(false);
        expect(shapeController.isPointInsideShape(pointOutOfShape4)).toEqual(false);
    });
});