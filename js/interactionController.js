class InteractionController {
    constructor() {
    }

    mouseMoveListener(action) {
        const event = "mousemove";
        addEventListener(event, (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            action(mouseX, mouseY);
        });
        return this.createRemoveListenerFunction(event, action);
    }

    mouseDownListener(action) {
        const event = "mousedown";
        addEventListener(event, (e) => {
            const mouseButton = e.button;
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            action(mouseButton, mouseX, mouseY);
        });
        return this.createRemoveListenerFunction(event, action);
    }

    contextMenuListener() {
        const event = "contextmenu";
        addEventListener(event, (e) => {
            e.preventDefault();
        });
    }

    mouseReleaseListener(action) {
        const event = "mouseup";
        addEventListener(event, () => {action();});
        return this.createRemoveListenerFunction(event, action);
    }

    keyDownListener() {
        const event = "keydown";
        addEventListener(event, (e) => {
            e.preventDefault();
        });
    }

    private;

    createRemoveListenerFunction(event, action) {
        return function() {
            removeEventListener(event, action);
        };
    }
}

module.exports = InteractionController;