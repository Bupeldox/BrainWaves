const range = 20;

export class InteractableHelper {
    constructor(player, interactable,interactionInputManager) {
        this.player = player;
        this.interactable = interactable;

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
        if(!this.interactable.isInRange || this.interactable.deactivated ){
            return
        }
        this.interactable.onThoughtRead()
    }
    onInteractionExit(){
        this.interactable.onInteractExit()
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