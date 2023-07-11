import { stateHandler } from "../StateHandler";
import { worldStateName } from "../World";
import { MessageInteractable } from "./MessageInteractable";



export class ThoughtInteractable extends MessageInteractable{

    constructor(goData, iData){
        //thought
        /*
            target,
            thought
        */
        super(goData,iData)
        this.thought = iData.thought;
    }

    setup(parentElement,gotoBrainWavesFunc){
        this.gotoBrainWavesFunc = gotoBrainWavesFunc;
        super.setup(parentElement);
        this.instructionsElement.updateText("E , R-Mind Read")
    }
    draw(){
        if(this.isInRange){
            if(!this.wasInRange){    
                window.thoughtReadButton.classList.add("highlighted");
            }
        }else if(this.wasInRange){
            window.thoughtReadButton.classList.remove("highlighted");
        }
        this.wasInRange = this.isInRange;
        super.draw();
    }

    onThoughtRead(){
        this.gotoBrainWavesFunc(this.thought,this.goData.icon);
    }

}