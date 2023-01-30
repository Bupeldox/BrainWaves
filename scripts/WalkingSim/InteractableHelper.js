const range = 20;

export class InteractableHelper {
    constructor(player, interactable) {
        this.player = player;
        this.interactable = interactable;

        
    }
    update() {
        if (this.player.pos.distance(this.interactable.pos) < range) {
            this.interactable.isInRange = true;
        } else {
            this.interactable.isInRange = false;
        }
    }
    draw() {}
}