const range = 20;

export class InteractableHelper {
    constructor(player, interactable,interactionInputManager) {
        this.player = player;
        this.interactable = interactable;

        this.removeInteractEvent = interactionInputManager.registerOnInteract(()=>{!this.interactable.isInRange || this.interactable.deactivated || this.interactable.onInteract()});
        this.removeInteractExitEvent = interactionInputManager.registerOnInteractExit(()=>{this.interactable.onInteractExit()});
        this.removeThoughtReadEvent = interactionInputManager.registerOnMindRead(()=>{!this.interactable.isInRange || this.interactable.deactivated ||this.interactable.onThoughtRead()});
        
        
        
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
        this.removeInteractEvent();
        this.removeThoughtReadEvent();
        this.removeInteractExitEvent();
        delete this;
    }
}