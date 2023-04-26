import ControlsHandler from "./ControlsHandler";
import { TickTime } from "./WalkingSimSettings";
import { World } from "./World";



export class WalkingSim {
    constructor(goToWaves = false) {
        this.controlsHandler = new ControlsHandler(document.body);
        this.world = new World(this.controlsHandler, goToWaves);
    }

    start() {
        this.controlsHandler.resume();
        this.world.currentStreet.element.element.classList.remove("hidden");
        this.interval = setInterval(() => {
            try {
                this.world.update();
                this.world.draw();
            } catch (ex) {
                console.error(ex);
            }
        }, TickTime);
    }
    stop() {
        this.controlsHandler.pause();
        this.world.currentStreet.element.element.classList.add("hidden");
        clearInterval(this.interval);
    }
}
