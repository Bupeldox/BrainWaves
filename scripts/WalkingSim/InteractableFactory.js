import { ChangingIconInteractable } from "./Interactables/ChangingIconInteractable";
import { DoStuffInteractable } from "./Interactables/DoStuffInteractable";
import { MessageInteractable } from "./Interactables/MessageInteractable";
import { ThoughtInteractable } from "./Interactables/ThoughInteractable";

class InteractableFactory {
    constructor() {
    }
    createCretorFunc(data) {
        var classType = this.getTheInteractableClass(data.type);

        return () => { return (classType(data.basicDat, data.data)); };
        /*
            {
                basicDat:{
                    id,type,icon,pos,
                }
                data:{
                    messages
                    thought?
                }
            }
           
        */
        //returns a function
    }

    getTheInteractableClass(type) {
        switch (type) {
            case "MessageInteractable":
                return (...a) => new MessageInteractable(...a);
            case "ChangingIconInteractable":
                return (...a) => new ChangingIconInteractable(...a);
            case "ThoughtInteractable":
                return (...a) => new ThoughtInteractable(...a);
            case "DoStuffInteractable":
                return (...a) => new DoStuffInteractable(...a);
            default:
                break;
        }
    }
}


export const interactableFactory = new InteractableFactory();