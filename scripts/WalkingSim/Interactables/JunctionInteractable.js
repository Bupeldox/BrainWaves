import { stateHandler } from "../StateHandler";
import { interactablesFunctions } from "../WorldData";
import { CallbackInteractable } from "./CallbackInteractable";


export class JunctionInteractable extends CallbackInteractable {
    constructor(changeStreetFunc,goData, iData) {
        super(goData, iData);
        this.type = "Junction";
        this.changeStreetFunc = changeStreetFunc;
        this.targetStreet = iData.street;
        this.goData.icon = "↕";

    }
    setup(parent,ignor) {
        super.setup(parent,()=>{this.changeStreetFunc(this.targetStreet)});
    }
}
