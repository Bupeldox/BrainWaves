import TemplatedHtml from "../../TemplatedHtml";
import { stateHandler } from "../StateHandler.js";
import { InteractableBase } from "./InteractablesBase";




export class MessageInteractable extends InteractableBase {
    constructor (goData, messages) {
        super(goData);
        this.messages = messages;
        this.state = stateHandler.getState(goData.id);
        if (!this.state) {
            this.state = {
                messageIndex: 0
            };
            stateHandler.setState(goData.id, this.state);
        }
        this.messageElement;

    }

    onInteract (onMessageClose) {
        this.showMessage(this.messages[Math.min(this.state.messageIndex,this.messages.length-1)]);

        if (this.state.messageIndex < this.messages.length) {
            this.state.messageIndex++;
            stateHandler.setState(this.goData.id, this.state);
        }

        document.body.addEventListener(
            "keydown",
            () => {
                this.messageElement.element.remove();
                if (onMessageClose) {
                    onMessageClose();
                }
            }, {
                once: true
            }
        );

    }

    showMessage (text) {
        this.messageElement = new TemplatedHtml(
            "interactionMessage",
            document.getElementById("root")
        );
        this.messageElement.updateText(text,"text")
    }
}
