class CanvasController {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
    }

    drawSquare(xx, yy, size, colour) {
        this.ctx.fillStyle = `rgb(${colour[0]} ${colour[1]} ${colour[2]})`
        this.ctx.fillRect(xx, yy, xx + size, yy + size);
    }
}

module.exports = CanvasController