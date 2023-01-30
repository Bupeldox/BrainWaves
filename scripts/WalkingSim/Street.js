import TemplatedHtml from "../TemplatedHtml";
import Vec2 from "../Vec2";
import { Interactable } from "./Interactable";
import { InteractableHelper } from "./InteractableHelper";

export class Street {
    constructor(streetData, changeStreetFunc) {
        this.element = new TemplatedHtml("path", document.getElementById("root"));
        this.changeStreet = changeStreetFunc;
        this.setupBackground();
        this.setupForeground();
        this.setupMidground(streetData);
    }
    setupBackground() {
        this.backgroundElements = [];
        var buildingCount = 14;
        for (var i = 0; i < buildingCount; i++) {
            this.backgroundElements.push(
                new TemplatedHtml("building", this.element.getPart("background"))
            );
        }
    }
    setupForeground() {
        this.backgroundElements = [];
        var buildingCount = 24;
        for (var i = 0; i < buildingCount; i++) {
            this.backgroundElements.push(
                new TemplatedHtml("plant", this.element.getPart("foreground"))
            );
        }
    }
    setupMidground(streetData) {
        this.interactables = [];
        for (var i = 0; i < streetData.interactablesList.length; i++) {
            var dat = streetData.interactablesList[i];

            intr = new Interactable(dat, this.element.getPart("middleground"));
            

            this.interactables.push(intr);
            this.interactables.push(new InteractableHelper(this.player, intr));
        }
        for (var i = 0; i < streetData.junctions.length; i++) {
            let junctionDat = streetData.junctions[i];
            let interactableData = {
                element: "someGrass",
                icon: "↕",
                interactText: "Go to " + junctionDat.street,
                pos: new Vec2(junctionDat.pos),
                onInteract: () => {
                    this.changeStreet(junctionDat.street);
                }
            };
            var intr = new Interactable(interactableData, this.element.getPart("middleground"));
            this.interactables.push(intr);
            this.interactables.push(new InteractableHelper(this.player, intr));
        }
    }
    setPlayer(player, pos) {
        player.setParent(this.element.getPart("middleground"));
        player.pos = pos;
        this.interactables.forEach((e, i) => {
            if (e instanceof InteractableHelper) {
                e.player = player;
            }
        });
    }
    update() {
        this.interactables.forEach((i) => i.update());
    }
    draw() {
        this.interactables.forEach((i) => i.draw());
    }
    destroy() {
        this.interactables.forEach((e, i) => {
            if (e.destroy) {
                e.destroy();
            }

        });
        this.element.element.remove();
    }
}