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
        this.onMessageClose = onMessageClose;
        this.showMessage(this.messages[Math.min(this.state.messageIndex,this.messages.length-1)]);

        if (this.state.messageIndex < this.messages.length) {
            this.state.messageIndex++;
            stateHandler.setState(this.goData.id, this.state);
        }
    }

    onInteractExit(){
        if(this.messageElement?.element){
            this.messageElement.element.remove();
            if (this.onMessageClose) {
                this.onMessageClose();
                this.onMessageClose = false;
            }
        }
        
    }

    showMessage (text) {
        this.messageElement = new TemplatedHtml(
            "interactionMessage",
            document.getElementById("root")
        );
        if(this.messages.length>this.state.messageIndex+1){
            this.messageElement.getPart("instructions").classList.add("show");
        }
        this.messageElement.updateText(text,"text")
    }
}
