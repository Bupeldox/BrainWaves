
import { World } from "./World";


//needs an interaction with page to allow onKeyDown
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