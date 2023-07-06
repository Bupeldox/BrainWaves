import { devInteractions } from "./Interactables/InteractableDevInteractions";

const range = 20;

export class InteractableHelper {
    constructor(player, interactable, interactionInputManager) {
        this.player = player;
        this.interactable = interactable;

        this.removeDevInteraction = interactionInputManager.devInteractionRegister.registerFunc(()=>{this.onDevInteraction()});
        this.removeInteractEvent = interactionInputManager.interactEventRegister.registerFunc(()=>{this.onInteract()},"note:" + interactable.icon);
        this.removeThoughtReadEvent = interactionInputManager.mindReadEventRegister.registerFunc(()=>{this.onMindRead()});
        this.removeInteractExitEvent = interactionInputManager.interactionExitEventRegister.registerFunc(()=>{this.onInteractionExit()});
    }
    onInteract(){
        if(!this.interactable.isInRange || this.interactable.deactivated){
            return;
        }
        this.interactable.onInteract()
    }
    onMindRead(){
        if(!this.interactable.isInRange || this.interactable.deactivated){
            return
        }
        this.interactable.onThoughtRead();
    }
    onDevInteraction(){
        devInteractions.onDevInteraction(this.interactable);
    }

    onInteractionExit(){
        this.interactable.onInteractExit();
    }
    
    update() {
        if (this.player.pos.distance(this.interactable.pos) < range) {
            this.interactable.isInRange = true;
        } else {
            this.interactable.isInRange = false;
        }
        
    }

    draw() {}
    
    destroy(){
        this.removeDevInteraction();
        this.removeInteractEvent();
        this.removeThoughtReadEvent();
        this.removeInteractExitEvent();
        delete this;
    }
}