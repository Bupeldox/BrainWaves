import TemplatedHtml from "../../TemplatedHtml";
import Vec2 from "../../Vec2";
import { DevInteractions } from "../InteractableDevInteractions";


//interface
export class InteractableBase {
    constructor(goData,interactionManager){
        this.pos = new Vec2(goData.pos);
        this.isInRange = false;
        this.goData = goData;
        this.deactivated = false;
        this.interactionManager = interactionManager;
    }

    setup(parentElement){
        this.element = new TemplatedHtml("interactableItem", parentElement);

        this.instructionsElement = new TemplatedHtml(
            "instructions",
            this.element.element
        );
        if(this.goData.icon){
            this.element.getPart("icon").textContent = this.goData.icon;
        }else if(this.goData.img){
            this.element.getPart("icon").classList.add("imgInteractable");
            this.element.getPart("icon").innerHTML="<img style='width:1.2em;' src='./assets/World/"+this.goData.img+"'></img>";
        }
        this.updatePos(this.pos);
    }
    updatePos(newPos){
        this.pos = newPos;
        this.element.element.style.top = -this.pos.y + "px";
        this.element.element.style.left = this.pos.x + "px";
    }
    update(){

    }

    draw(){
        if(this.deactivated){
            return;
        }

        if (this.isInRange) {
            this.instructionsElement.element.classList.add("show");
        } else {
            this.instructionsElement.element.classList.remove("show");
        }
    }
    onInteract(){

    }
    onThoughtRead(){

    }
    onInteractExit(){

    }
    
    deactivate(){
        this.deactivated=true;
        this.instructionsElement.element.classList.remove("show");
    }
    destroy(){
        this.deactivate();
        delete this;
    }
}




