class InteractionController {
    constructor() {
    }

    mouseMoveListener(action) {
        const event = "mousemove"
        addEventListener(event, (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            action(mouseX, mouseY);
        });
        return this.createRemoveListenerFunction(event, action);
    }

    mouseDownListener(action) {
        const event = "mousedown"
        addEventListener(event, (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            action(mouseX, mouseY);
        });
        return this.createRemoveListenerFunction(event, action);
    }

    mouseReleaseListener(action) {
        const event = "mouseup"
        addEventListener(event, () => {action()});
        return this.createRemoveListenerFunction(event, action);
    }

    private

    createRemoveListenerFunction(event, action) {
        return function() {
            removeEventListener(event, action);
        }
    }
}

module.exports = InteractionController