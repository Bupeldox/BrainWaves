import { MessageInteractable } from "./MessageInteractable";



export class ThoughtInteractable extends MessageInteractable{

    constructor(goData, messages, thought){
        //thought
        /*
            target,
            thought
        */
        super(goData,messages)
        this.thought = thought
    }

    onThoughtRead(){
        window.location.href = 
        "./waves.html?target="+
        thought.target.split(",")+
        "&useable=&"+
        "0,1,2,3,4,5,6,7,8,9,10,11"+
        "target="+
        thought.thought;
    }

}