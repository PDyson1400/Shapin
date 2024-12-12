class ShapeController {
    constructor() {
        this.points = [];
        this.id = 0;
    }

    addPoint(xx, yy, size, set=false, adjPoint1={}, adjPoint2={}){
        const point = {xx, yy, size, set, adjPoint1, adjPoint2, selected: false, id: this.id};
        this.points.push(point);
        this.id++;
        return point;
    }

    getSelectedPoint() {
        for(var i = 0; i < this.points.length; i++) {
            if(this.points[i].selected == true) {return this.points[i];};
        }
    }

    getLineData() {
        const lines = [];
        let maxPointX = 0;
        for(var i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            const adjPoint = point.adjPoint1;
            lines.push({ startPoint: point, endPoint: adjPoint});

            if(point.xx > maxPointX) {
                maxPointX = point.xx;
            }
        }
        return {lines, maxPointX};
    }

    lineEquation(line) {
        const gradient = (line.endPoint.yy - line.startPoint.yy)/(line.endPoint.xx - line.startPoint.xx);
        const yIntercept = line.endPoint.yy - line.endPoint.xx * gradient;
        return {gradient, yIntercept};
    }

    lineInterceptPoint(line1, line2) {
        const line1Equation = this.lineEquation(line1);
        const line2Equation = this.lineEquation(line2);

        const meetingX = (line2Equation.yIntercept - line1Equation.yIntercept)/(line1Equation.gradient - line2Equation.gradient);
        const meetingY = line1Equation.gradient * meetingX + line1Equation.yIntercept;

        return {xx: meetingX, yy: meetingY};
    }

    withinLine(line, xx, yy) {
        const lineStartXx = line.startPoint.xx;
        const lineEndXx = line.endPoint.xx;
        const lineStartYy = line.startPoint.yy;
        const lineEndYy = line.endPoint.yy;

        return xx < Math.max(lineStartXx, lineEndXx)
        && xx > Math.min(lineStartXx, lineEndXx)
        && yy < Math.max(lineStartYy, lineEndYy)
        && yy > Math.min(lineStartYy, lineEndYy)
    }

    linesCross(line1, line2) {
        const {xx, yy} = this.lineInterceptPoint(line1, line2);

        return this.withinLine(line1, xx, yy);
    }

    lineCrossesLine(line) {
        const {lines, xOffset} = this.getLineData();

        for(var i = 0; i < lines.length; i++) {
            if(this.linesCross(line, lines[i])) {
                return lines[i];
            }
        }

        return false
    }

    pointCrossesLine(xx, yy, line) {
        const lineEquation = this.lineEquation(line);
        const gradient = lineEquation.gradient;
        const yIntercept = lineEquation.yIntercept;

        const meetsLine = yy == gradient * xx + yIntercept;
        return meetsLine;
    }

    isPointInsideShape(point) {
        // memoize to only the points that actually change
        const data = this.getLineData();
        const lines = data.lines;
        const maxPointX = data.maxPointX;

        if(point.xx < maxPointX) {
            lines.filter((line) => { return line.startPoint.xx > point.xx || line.endPoint.xx > point.xx; });

            let lineIntersections = 0;
            const yy = point.yy;

            for(var xx = point.xx; xx <= maxPointX; xx++) {
                for(var i = 0; i < lines.length; i++) {
                    const line = lines[i];

                    if(this.pointCrossesLine(xx, yy, line)
                    && this.withinLine(line, xx, yy)) {
                        lineIntersections++;
                    }
                }
            }

            return lineIntersections % 2 != 0;
        }
        return false;
    }
}

module.exports = ShapeController;