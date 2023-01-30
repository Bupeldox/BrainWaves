
import TemplatedHtml from "../TemplatedHtml.js";

export class Interactable {
    constructor(dat, parentElement) {
        this.id = dat.id;
        this.text = dat.text;
        this.pos = dat.pos;

        this.range = 20;
        this.isInRange = false;
        this.setInteraction(dat.onInteract);
        this.element = new TemplatedHtml(dat.element, parentElement);
        this.instructionsElement = new TemplatedHtml(
            "instructions",
            this.element.element
        );
        if (dat.icon) {
            this.element.getPart("icon").textContent = dat.icon;
        }
        if (dat.interactText) {
            this.instructionsElement.updateText(dat.interactText + " - E");
        }
        this.eventToRemove = (e) => { this.onEDown(e); };
        document.addEventListener("keydown", this.eventToRemove);
    }
    onEDown(e) {

        if (e.key != "e") {
            return;
        }
        if (!this.isInRange) {
            return;
        }
        this.onInteract(this.element);
    }
    updateText(text) {
        this.text = text;
    }
    update() {}
    draw() {
        this.element.element.style.top = -this.pos.y + "px";
        this.element.element.style.left = this.pos.x + "px";
        if (this.isInRange) {
            this.instructionsElement.element.classList.add("show");
        } else {
            this.instructionsElement.element.classList.remove("show");
        }
    }
    destroy() {
        document.removeEventListener("keydown", this.eventToRemove);
        this.range = 0;
        this.element.element.remove();
    }
    deactivate() {
        this.range = 0;
    }
    setInteraction(func) {
        this.onInteract = (elem) => {
            func(elem, this);
        };
    }
}