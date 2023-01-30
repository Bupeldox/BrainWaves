import TemplatedHtml from "../TemplatedHtml";
import Vec2 from "../Vec2";
import { DirectionalInputManager } from "./DirectionalInputManager";
import { timeSpeedMod } from "./script";

export class Player {
    constructor(parentElement) {
        this.pos = new Vec2(20, -20);
        this.speed = 90;
        this.element = new TemplatedHtml("person", parentElement);
        this.movementInput = new DirectionalInputManager();
        this.flip = false;
        this.isMoving = false;
    }
    perspective(y) {
        return 1;
        return 1 - y / 100;
    }
    update() {
        var dir = this.movementInput.getDirection();
        if (isNaN(dir.x)) {
            dir = new Vec2(0, 0);
        }
        this.isMoving = dir.magnitude() > 0.01;

        if (this.isMoving) {
            dir = dir.times(this.perspective(this.pos.y));

            var delta = dir.times(this.speed * timeSpeedMod);

            this.pos = this.pos.add(delta);

            if (dir.x > 0) {
                this.flip = true;
            } else if (dir.x < 0) {
                this.flip = false;
            }
        }
    }

    draw() {
        this.element.element.style.top = -this.pos.y + "px";
        this.element.element.style.left = this.pos.x + "px";

        var scale = new Vec2(1, 1);
        
        if (this.flip) {
            scale.x = -Math.abs(scale.x);
        } else {
            scale.x = Math.abs(scale.x);
        }

        this.element.element.style.transform =
            "scalex(" + scale.x + ") scaley(" + scale.y + ")";

        if (this.isMoving) {
            this.element.updateText("🏃‍♂️");
        } else {
            this.element.updateText("🧍‍♀️");
        }
    }
    setParent(element) {
        this.element.appendInto(element);
    }
}