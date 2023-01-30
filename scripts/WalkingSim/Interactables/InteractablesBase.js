import TemplatedHtml from "../../TemplatedHtml";


//interface
export class InteractableBase{
    constructor(goData){
        this.pos = goData.pos;
        this.isInRange = false;
        this.goData = goData;
        this.deactivated = false;
    }

    setup(parentElement){
        this.element = new TemplatedHtml("interactableItem", parentElement);

        this.instructionsElement = new TemplatedHtml(
            "instructions",
            this.element.element
        );

        this.element.getPart("icon").textContent = this.goData.icon;
        
        this.element.element.style.top = -this.pos.y + "px";
        this.element.element.style.left = this.pos.x + "px";

        this.eventToRemove = (e) => { this.onKeyDown(e.key); };
        document.addEventListener("keydown", this.eventToRemove);
    }

    onKeyDown(key) {
        if (!this.isInRange || this.deactivated) {
            return;
        }

        switch(key){
            case "e":
                this.onInteract();
                break;
            case "r":
                if(this.onThoughtRead){
                    this.onThoughtRead();
                }
        }
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
    deactivate(){
        this.deactivated=true;
        this.instructionsElement.element.classList.remove("show");
    }
    destroy(){
        this.deactivate();
        delete this;
    }
}





