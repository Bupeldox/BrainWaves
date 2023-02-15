import MouseDragHelper from "./MouseDragHelper.js";
import CanvasGrapher from "./CanvasGrapher.js";
import Vec2 from "../Vec2.js";
import TemplatedHtml from "../TemplatedHtml.js";
import { clamp } from "../Utils.js";

export default class Card {
    constructor(card, xpos, containerElement) {
        this.card = card;
        this.position = new Vec2(xpos, 0.7);
        this.element = new TemplatedHtml("card");
        this.containerElement = containerElement;
        this.element.updateText(this.card.name, "name");
        this.activation = 0;
        this.updateToNewPosition();
        if(card.imageName){
            var cnv = this.element.element;
            cnv.classList.add("imageGem");
            cnv.style.backgroundImage = "url('./assets/"+card.imageName+"')";
            this.element.getPart("cardFunctionCanvas").remove();
            this.element.getPart("cardFunctionCanvas").remove();
        }else{
            this.canvasGrapher = new CanvasGrapher(this.card.func, this.element.getPart("cardFunctionCanvas"));
        }
            
    }

    updateToNewPosition() {
        this.element.element.style.left = this.position.x * 100 + "%";
        this.element.element.style.top = this.position.y * 100 + "%";
    }

    setupEvents(callback) {
        var that = this;

        var prevMousePos = new Vec2(0, 0);
        var onMouseDown = (mousePos) => {
            prevMousePos = mousePos;
            this.containerElement.appendChild(this.element.element); //Bring to top
        };
        var onMouseUp = () => {
            if (!(this.activation == 0 || this.activation == 1)) {
                this.activation = clamp(0, Math.round(this.activation), 1);
                this.position.y = 1 - (this.activation + 2) / 4;
                this.updateToNewPosition();
                callback();
            }
        };

        var onMouseMove = (mousePos) => {
            var deltaMousePos = mousePos.sub(prevMousePos);
            if (deltaMousePos.x != 0 || deltaMousePos.y != 0) {
                var ob = this.containerElement.getBoundingClientRect();
                //var offset = new Vec2(ob.left,ob.top);
                var size = new Vec2(ob.width, ob.height);
                var deltaMouseAsFraction = new Vec2(
                    deltaMousePos.x / size.x,
                    deltaMousePos.y / size.y
                );
                this.position = this.position.add(deltaMouseAsFraction); //0-1

                this.activation = clamp(0, (1 - this.position.y) * 4 - 2, 1);

                prevMousePos = mousePos;
                this.updateToNewPosition();
            }
            callback();
        };

        this.MouseDragHelper = new MouseDragHelper(
            this.element.element,
            onMouseDown,
            onMouseMove,
            onMouseUp
        );
    }
}