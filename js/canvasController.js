class CanvasController {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");

        // this.windowResizeListener();
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

    drawLine(point1, point2, width, colour) {
        this.ctx.strokeStyle = `rgb(${colour[0]} ${colour[1]} ${colour[2]})`;
        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        this.ctx.moveTo(point1.xx + point1.size/2, point1.yy + point1.size/2);
        this.ctx.lineTo(point2.xx + point2.size/2, point2.yy + point2.size/2);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    // private

    // windowResizeListener() {
    //     window.onresize = this.setCanvasDimensions.bind(this);
    // }
}

module.exports = CanvasController;