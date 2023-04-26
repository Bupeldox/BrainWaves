
import { WalkingSim } from "./WalkingSim";


//needs an interaction with page to allow onKeyDown
document.body.addEventListener("click", () => {
    document.getElementById("startButton")?.remove();
});

window.walkingSim = new WalkingSim();
window.walkingSim.start();


