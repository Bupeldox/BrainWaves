import { clamp } from "../Utils.js";
import { TextScrambler } from "./TextScrambler";


export class GitchyText {
    constructor(text, element) {
        this.element = element;
        this.value = 0;
        this.lerpingValue = 0;
        this.lerpSpeed = 0.2;
        this.textScrambler = new TextScrambler(text);
        this.loop();
    }
    updateValue(v, force) {
        this.value = clamp(0, v, 1);
        if (force) {
            this.lerpingValue = this.value;
        }
        this.loop();
    }
    updateText(text) {
        this.textScrambler.text = text;
        this.loop();
    }
    loop(stop) {
        /*if (!this.timeout) {
            this.lerpingValue = 0;
        }
        if (stop) {
            clearInterval(this.timeout);
            this.element.textContent = this.textScrambler.updateScrambledness(
                this.value
            );
            this.lerpingValue = this.value;
            return;
        }*/
        var delta = this.value - this.lerpingValue;
        if (delta < 0 || Math.abs(delta) < this.lerpSpeed) {
            this.lerpingValue = this.value;
        } else {
            this.lerpingValue = this.lerpingValue + Math.sign(delta) * this.lerpSpeed;
        }

        this.element.textContent = this.textScrambler.updateScrambledness(
            clamp(0, this.value, 1)
        );
    }
}
