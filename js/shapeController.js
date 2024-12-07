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