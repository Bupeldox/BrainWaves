import TemplatedHtml from "../../TemplatedHtml";
import { stateHandler } from "../StateHandler.js";
import { InteractableBase } from "./InteractablesBase";




export class MessageInteractable extends InteractableBase {
    constructor (goData, messages) {
        if(goData.hasOwnProperty("messages")){
            messages = goData.messages;
            goData = goData.goData;
        }
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
        this.messageElement.element.addEventListener("click",()=>{
            this.onInteractExit();
            if(this.messages.length>this.state.messageIndex){
                this.onInteract(this.onMessageClose);
            }
        });
        
        this.messageElement.getPart("instructions").classList.add("show");
        if(this.messages.length>this.state.messageIndex+1){
        }else{
            //this.messageElement.getPart("instructions").classList.add("show");
            this.messageElement.getPart("instructions").textContent = "Close (Move)";
        }

        this.messageElement.updateText(text,"text")
    }
}
