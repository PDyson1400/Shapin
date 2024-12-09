const ShapeController = require("../shapeController");

describe("ShapeController", () => {
  
    let shapeController;
    beforeEach(() => {
        shapeController = new ShapeController();
    });

    test("addPoint method", () => {
        const adjPoint = {xx: 100, yy: 100, size: 15, set: true, adjPoint1: {}, adjPoint2: {}, selected: false, id: 1};
        const point = {xx: 100, yy: 100, size: 15, set: true, adjPoint1: adjPoint, adjPoint2: {}, selected: false, id: 0};
        shapeController.addPoint(point.xx, point.yy, point.size, point.set, point.adjPoint1, point.adjPoint2);

        expect(shapeController.points[0]).toEqual(point);
    });

    test("getLineData method", () => {
        const point1 = shapeController.addPoint(100, 300, 15, true);
        const point2 = shapeController.addPoint(500, 300, 15, true, point1);
        const point3 = shapeController.addPoint(300, 200, 15, true, point2, point1);
        point1.adjPoint1 = point3;
        point1.adjPoint2 = point2;
        point2.adjPoint2 = point3;

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

    test("pointCrossesLine", () => {
        const line = {startPoint: {xx: 100, yy: 100}, endPoint: {xx: 200, yy: 300}};

        const crosses = shapeController.pointCrossesLine(150, 200, line);
        expect(crosses).toEqual(true);

        const doesntCross = shapeController.pointCrossesLine(149, 200, line);
        expect(doesntCross).toEqual(false);

        const doesntCrossEither = shapeController.pointCrossesLine(151, 200, line);
        expect(doesntCrossEither).toEqual(false);
    });

    test("pointCrossesLineGenerous", () => {
        const line = {startPoint: {xx: 100, yy: 100}, endPoint: {xx: 200, yy: 300}};

        const crosses = shapeController.pointCrossesLineGenerous(150, 200, line);
        const crossesGenerous1 = shapeController.pointCrossesLineGenerous(147, 200, line);
        const crossesGenerous2 = shapeController.pointCrossesLineGenerous(150, 202, line);
        const crossesGenerous3 = shapeController.pointCrossesLineGenerous(147, 195, line);
        const crossesGenerous4 = shapeController.pointCrossesLineGenerous(152, 204, line);
        const crossesGenerous5 = shapeController.pointCrossesLineGenerous(155, 205, line);

        const doesntCross = shapeController.pointCrossesLineGenerous(140, 200, line);
        const doesntCrossEither = shapeController.pointCrossesLineGenerous(158, 192, line);

        expect(crosses).toEqual(true);
        expect(crossesGenerous1).toEqual(true);
        expect(crossesGenerous2).toEqual(true);
        expect(crossesGenerous3).toEqual(true);
        expect(crossesGenerous4).toEqual(true);
        expect(crossesGenerous5).toEqual(true);
        expect(doesntCross).toEqual(false);
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