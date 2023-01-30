import PersistentInteractables from "./PersistentInteractables.js";
import { World } from "./World";




export var persistanceManager = new PersistentInteractables();
persistanceManager.setIdsOnStreetData();

document.body.addEventListener("click", () => {
    document.getElementById("startButton")?.remove();
});

window.world = new World();

var TickTime = 10;
export var timeSpeedMod = TickTime / 1000;
setInterval(() => {
    try {
        window.world.update();
        window.world.draw();
    } catch (ex) {
        console.error(ex);
    }
}, TickTime);