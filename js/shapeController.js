class ShapeController {
    constructor() {
        this.points = [];
        this.id = 0;

        this.test = {points: [], lines: []};
    }

    emptyAdjacentPoints(point) {
        return Object.keys(point.adjPoint1).length > 0 && Object.keys(point.adjPoint2).length > 0;
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

            if(this.emptyAdjacentPoints(point)) {
                lines.push({ startPoint: point, endPoint: adjPoint});

                if(point.xx > maxPointX) {
                    maxPointX = point.xx;
                }
            }
        }
        return {lines, maxPointX};
    }

    lineLength(line) {
        const xx = line.startPoint.xx - line.endPoint.xx;
        const yy = line.startPoint.yy - line.endPoint.yy;

        return Math.sqrt(xx * xx + yy * yy);
    }

    lineEquation(line) {
        const lineIsVertical = line.endPoint.xx - line.startPoint.xx == 0;
        if(lineIsVertical) {
            return {gradient: false, yIntercept: false, xIntercept: line.endPoint.xx};
        }
        const gradient = (line.endPoint.yy - line.startPoint.yy)/(line.endPoint.xx - line.startPoint.xx);
        const yIntercept = line.endPoint.yy - line.endPoint.xx * gradient;

        
        let xIntercept = -yIntercept/gradient;
        const lineIsHorizontal = line.endPoint.yy - line.startPoint.yy == 0;
        if(lineIsHorizontal) {
            xIntercept = false;
        }

        return {gradient, yIntercept, xIntercept};
    }

    sameLine(line1, line2) {
        return line1.startPoint.xx == line2.startPoint.xx && line1.startPoint.yy == line2.startPoint.yy 
        && line1.endPoint.xx == line2.endPoint.xx && line1.endPoint.yy == line2.endPoint.yy;
    }

    lineInterceptPoint(line1, line2) {
        if(this.sameLine(line1, line2)) {
            return true;
        }
        const line1Equation = this.lineEquation(line1);
        const line2Equation = this.lineEquation(line2);
        if(line1Equation.gradient == line2Equation.gradient && line1Equation.gradient != 0) {
            return false;
        }

        if(line1Equation.gradient == 0 && line1Equation.xIntercept) {
            const xx = line1.startPoint.xx;
            const yy = line2Equation.gradient * xx + line2Equation.yIntercept;
            return {xx, yy};
        } else if (line2Equation.gradient == 0 && line1Equation.xIntercept) {
            const xx = line2.startPoint.xx;
            const yy = line1Equation.gradient * xx + line1Equation.yIntercept;
            return {xx, yy};
        }
        const meetingX = (line2Equation.yIntercept - line1Equation.yIntercept)/(line1Equation.gradient - line2Equation.gradient);
        const meetingY = line2Equation.gradient * meetingX + line2Equation.yIntercept;

        return {xx: meetingX, yy: meetingY};
    }

    withinLine(line, xx, yy) {
        const lineStartXx = line.startPoint.xx;
        const lineEndXx = line.endPoint.xx;
        const lineStartYy = line.startPoint.yy;
        const lineEndYy = line.endPoint.yy;

        return xx <= Math.max(lineStartXx, lineEndXx)
        && xx >= Math.min(lineStartXx, lineEndXx)
        && yy <= Math.max(lineStartYy, lineEndYy)
        && yy >= Math.min(lineStartYy, lineEndYy);
    }

    linesCross(line1, line2) {
        const {xx, yy} = this.lineInterceptPoint(line1, line2);

        return this.withinLine(line2, xx, yy);
    }

    pointDistance(point1, point2) {
        const xx = point1.xx - point2.xx;
        const yy = point1.yy - point2.yy;

        return Math.sqrt(xx * xx + yy * yy);
    }

    closestToPoint(interceptions, interceptLines, point) {
        let closestIndex = 0;
        let closestDistance = -1;
        for(var i = 0; i < interceptions.length; i++) {
            const dist = this.pointDistance(point, interceptions[i]);
            if(dist < closestDistance && closestDistance > 0 || closestDistance < 0) {
                closestDistance = dist;
                closestIndex = i;
            }
        }

        return interceptLines[closestIndex];
    }

    lineCrossesLine(line) {
        const {lines, xOffset} = this.getLineData();
        const interceptions = [];
        const interceptLines = [];
        for(var i = 0; i < lines.length; i++) {
            if(this.linesCross(line, lines[i])) {
                interceptions.push(this.lineInterceptPoint(line, lines[i]));
                interceptLines.push(lines[i]);
            }
        }

        if(interceptions.length > 0) {
            return this.closestToPoint(interceptions, interceptLines, line.point);
        }

        return false;
    }

    pointCrossesLine(line, xx, yy) {
        const {gradient, yIntercept} = this.lineEquation(line);

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

                    if(this.pointCrossesLine(line, xx, yy)
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