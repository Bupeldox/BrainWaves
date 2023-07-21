import { devInteractions } from "./DevInteractions";

const range = 20;

export class InteractableHelper {
    constructor(player, interactable, interactionInputManager) {
        this.player = player;
        this.interactable = interactable;

        this.id = Math.random();
        

        this.removeDevInteraction = interactionInputManager.devInteractionRegister.registerFunc(()=>{this.onDevInteraction()});
        this.removeInteractEvent = interactionInputManager.interactEventRegister.registerFunc(()=>{this.onInteract()},"note:" + interactable.icon);
        this.removeThoughtReadEvent = interactionInputManager.mindReadEventRegister.registerFunc(()=>{this.onMindRead()});
        this.removeInteractExitEvent = interactionInputManager.interactionExitEventRegister.registerFunc(()=>{this.onInteractionExit()});
    }

    isReadyForInteraction(){
        return !(!this.interactable.isInRange || this.interactable.deactivated || this.player.interactablesInRangeIds[0]!=this.id)
    }

    onInteract(){
        if(!this.isReadyForInteraction()){
            return;
        }
        this.interactable.onInteract()
    }
    onMindRead(){
        if(!this.isReadyForInteraction()){
            return;
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
            this.player.interactablesInRangeIds.push(this.id);
            
            this.interactable.isInRange = this.player.interactablesInRangeIds[0]==this.id;
        } else {
            this.interactable.isInRange = false;

            const index = this.player.interactablesInRangeIds.indexOf(this.id);
            if (index > -1) { // only splice array when item is found
                this.player.interactablesInRangeIds.splice(index, 1); // 2nd parameter means remove one item only
            }
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