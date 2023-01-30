export class InteractableHelper {
    constructor(player, interactable) {
        this.player = player;
        this.interactable = interactable;
    }
    update() {
        if (this.player.pos.distance(this.interactable.pos) < this.interactable.range) {
            this.interactable.isInRange = true;
        } else {
            this.interactable.isInRange = false;
        }
    }
    draw() {}
}