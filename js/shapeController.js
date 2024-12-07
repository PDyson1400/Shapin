class ShapeController {
    constructor() {
        this.points = []
    }

    addPoint(xx, yy, size, set=false, adjPoint1={}, adjPoint2={}){
        const point = { xx, yy, size, set, adjPoint1, adjPoint2, selected: false}
        this.points.push(point);
        return point;
    }

    selectedPoint() {
        for(var i = 0; i < this.points.length; i++) {
            if(this.points[i].selected == true) {return this.points[i]};
        }
    }
}

module.exports = ShapeController