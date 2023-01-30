import { InteractableBase } from "./InteractablesBase";




export class CallbackInteractable extends InteractableBase {
    constructor(goData) {
        super(goData);
    }

    setup(parentElem, callbackFunc) {
        super.setup(parentElem);
        this.callbackFunc = callbackFunc;
    }

    onInteract() {
        this.callbackFunc(this);
    }
}
