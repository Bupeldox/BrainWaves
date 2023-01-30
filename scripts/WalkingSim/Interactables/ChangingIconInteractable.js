import { MessageInteractable } from "./MessageInteractable";


export class ChangingIconInteractable extends MessageInteractable{

    constructor(goData,messagesWithIcons){
        var messages = messagesWithIcons.map(i=>i.message);
        super(goData,messages);

        this.messagesWithIcons = messagesWithIcons;
    }

    setup(parentElem){
        super.setup(parentElem);
        this.setIconBasedOnMessageIndex();
    }
    onInteract(){
        
        super.onInteract(()=>{
            this.setIconBasedOnMessageIndex();
        })
    }
    setIconBasedOnMessageIndex(){
        var iconIndex = Math.min(this.state.messageIndex, this.messagesWithIcons.length-1);

        var icon = this.messagesWithIcons[iconIndex].icon;

        this.element.updateText(icon,"icon");

    }

}