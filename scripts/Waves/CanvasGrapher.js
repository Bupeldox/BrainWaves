import { clamp } from "../Utils.js";
import { DisplaySettings } from "./DisplaySettings";

export default class CanvasGrapher {
    constructor(func, element) {
        this.function = func;
        this.element = element;
    }

    draw() {
        //debugger;
        var canvas = this.element;
        var parentSize = canvas.parentElement;
        canvas.height = parentSize.offsetHeight + 4;
        canvas.width = parentSize.offsetWidth;
        var ctx = this.element.getContext("2d");
        ctx.fillStyle = "#ddd";
        var limit = DisplaySettings.limit;
        for (var ix = 0; ix < canvas.width; ix++) {
            var x = (((ix / canvas.width) * 2) - 1) * limit;
            var y = this.function(x);
            y = clamp(-limit, y, limit);
            var cy = ((((1 - y) / DisplaySettings.limit) + 1) / 2) * canvas.height;
            ctx.fillRect(ix, cy, 1, canvas.height);
        }
    }

}
