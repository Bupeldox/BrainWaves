import { stateHandler } from "../StateHandler";
import { MessageInteractable } from "./MessageInteractable";


export class DoStuffInteractable extends MessageInteractable {
    constructor(goData, messages, onState) {
        super(goData, messages);
        this.onState = onState;
    }

    setup(parent) {
        super.setup(parent);

        this.state = stateHandler.getState(this.goData.id);
        this.onState(this,this.state);
    }

    onInteract() {
        super.onInteract(() => {
            this.onState(this, this.state);
        });
    }
    setIconBasedOnMessageIndex() {
        var iconAtIndex = this.iconsAtMessageIndex.find(i => i.index == this.state.messageIndex);
        if (iconAtIndex) {
            var icon = iconAtIndex.data.icon;
            this.element.getPart("icon").textContent = icon;
        }
    }
}
