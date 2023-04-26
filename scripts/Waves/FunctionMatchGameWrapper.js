import { FunctionMatchGame } from "./FunctionMatchGame";

export class FunctionMatchGameWrapper {
    constructor() {
        this.matchGame = new FunctionMatchGame();
        this.matchGame.htmlStructure.element.element.classList.add("hidden");
    }
    start(target, inventory, thought, icon, onBack) {
        this.matchGame.updateGameData(inventory, target, thought, icon, onBack);
        this.matchGame.htmlStructure.element.element.classList.remove("hidden");
    }
    stop() {
        this.matchGame.updateGameData([], [0], "", "");
        this.matchGame.htmlStructure.element.element.classList.add("hidden");
    }
}
