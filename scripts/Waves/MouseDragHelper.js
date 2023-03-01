import Vec2 from "../Vec2";

export default class MouseDragHelper {
    constructor(element, onDown, onMove, onUp) {
        this.isDragging = false;
        this.element = element;
        var that = this;

        var eToMousePos = (e) => {
            //var tScale = window.tscale??1;
            //var tScale=1;
            if (e.touches) {
                return new Vec2(e.touches[0].clientX, e.touches[0].clientY);
            } else {
                return new Vec2(e.pageX, e.pageY);
            }
        };

        var onMouseDown = (e) => {
            this.isDragging = true;
            element.classList.add("dragging");
            onDown(eToMousePos(e));
        };
        var onMouseUp = (e) => {
            this.isDragging = false;
            element.classList.remove("dragging");
            onUp();
        };
        var onMouseMove = (e) => {
            if (this.isDragging) {

                onMove(eToMousePos(e));
            }
        };

        this.mouseDownEvent = element.addEventListener("mousedown", (e) => {
            this.isDragging = true;
            element.classList.add("dragging");
            onDown(eToMousePos(e));
        });
        this.mouseUpEvent = document.addEventListener("mouseup", (e) => {
            this.isDragging = false;
            element.classList.remove("dragging");
            onUp(eToMousePos(e));
        });
        this.mouseMoveEvent = document.addEventListener("mousemove", (e) => {
            if (this.isDragging) {
                onMove(eToMousePos(e));
            }
        });

        this.mouseDownEventt = element.addEventListener("touchstart", (e) => {
            onMouseDown(e);
        });
        this.mouseUpEventt = document.addEventListener("touchend", (e) => {
            onMouseUp(e);
        });
        this.mouseUpEventtc = document.addEventListener("touchcancel", (e) => {
            onMouseUp(e);
        });
        this.mouseMoveEventt = document.addEventListener("touchmove", (e) => {
            onMouseMove(e);
        });
    }
    destroy() {
        this.element.removeEventListener("mousedown", this.mouseDownEvent);
        document.removeEventListener("mouseup", this.mouseUpEvent);
        document.removeEventListener("mousemove", this.mouseMoveEvent);

        this.element.removeEventListener("touchstart", this.mouseDownEventt);
        document.removeEventListener("touchend", this.mouseUpEventt);
        document.removeEventListener("touchcancel", this.mouseUpEventtc);
        document.removeEventListener("touchmove", this.mouseMoveEventt);
    }
}
