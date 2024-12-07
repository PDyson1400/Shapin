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

    drawLine(startXx, startYy, endXx, endYy, width, colour) {
        this.ctx.strokeStyle = `rgb(${colour[0]} ${colour[1]} ${colour[2]})`;
        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        this.ctx.moveTo(startXx, startYy);
        this.ctx.lineTo(endXx, endYy);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    // private

    // windowResizeListener() {
    //     window.onresize = this.setCanvasDimensions.bind(this);
    // }
}

module.exports = CanvasController;