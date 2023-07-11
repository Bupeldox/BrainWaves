import { MessageInteractable } from "./MessageInteractable";


export class ChangingIconInteractable extends MessageInteractable{

    constructor(goData,iData){
        var messages = iData.messages.map(i=>i.message);
        super(goData,{messages:messages});

        this.messagesWithIcons = iData.messages;
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