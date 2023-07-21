import TemplatedHtml from "../TemplatedHtml";
import Vec2 from "../Vec2";
import { devInteractions } from "./DevInteractions";
import { Player } from "./Player";
import { stateHandler } from "./StateHandler";
import { Street } from "./Street";
import { StreetTransition } from "./StreetTransition";
import { tstreetData } from "./WorldData.js";


export const worldStateName = "levelAndPlayerPos";

export class World {
    constructor(controlsHandler, goToWaves) {
        this.stuffThatNeedsUpdating = [];
        this.controlsHandler = controlsHandler;
        var guiContainer = new TemplatedHtml("gui-container", document.body);
        this.player = new Player(document.body, this.controlsHandler.directionInput);
        this.goToWaves = goToWaves;
        this.state = stateHandler.getState(worldStateName);
        devInteractions.setup(this);
        if (!this.state) {
            this.state = {
                streetId: Object.keys(tstreetData)[0],
                playerPos: { "x": 415, "y": -105 }
            }
        }
        this.changeStreet(this.state.streetId, false);
        this.update();
        this.draw();
        this.inStreetTransition = false;
    }

    goToBrainWaves(thought, icon) {
        this.state.playerPos = this.player.pos;
        stateHandler.setState(worldStateName, this.state);


        //transition
        this.currentStreet.element.element.classList.add("wavesTransition");


        setTimeout(() => {
            if (this.goToWaves) {
                this.goToWaves(thought.target, this.player.state.functionInventory, thought.thought, icon);
            } else {
                window.location.href =
                    "./wavestry4.html?target=" +
                    thought.target.join(",") +
                    "&useable=" +
                    this.player.state.functionInventory.join(",") +
                    "&thought=" +
                    thought.thought +
                    "&icon=" +
                    icon;
            }
            this.currentStreet.element.element.classList.remove("wavesTransition");
        }, 300)
    }

    changeStreet(streetId) {

        if (this.inStreetTransition) {
            return;
        }
        document.getElementById("debugCurrentStreet").textContent = streetId;

        this.inStreetTransition = true;
        var prevStreetId = this.streetId;
        var newStreetData = tstreetData[streetId];
        var playerPos;

        if (!prevStreetId) {
            //initial player pos
            playerPos = new Vec2(this.state.playerPos);
        } else {
            playerPos = new Vec2(newStreetData.junctions.find(i => i.street == prevStreetId).pos);
        }
        this.streetId = streetId;


        if (prevStreetId) {
            var newStreet = new Street(tstreetData[streetId], (s) => { this.changeStreet(s); }, (a, b) => { this.goToBrainWaves(a, b) }, this.controlsHandler.interactionInput);
            var prevStreet = this.currentStreet;

            var junctionFrom = tstreetData[prevStreetId].junctions.find(i => i.street == streetId);
            var junctionTo = tstreetData[streetId].junctions.find(i => i.street == prevStreetId);

            this.stuffThatNeedsUpdating = [];
            new StreetTransition(
                prevStreet,
                newStreet,
                junctionFrom,
                junctionTo,
                () => {
                    this.inStreetTransition = false;
                    prevStreet.destroy();
                    this.state.playerPos = playerPos;
                    this.state.streetId = streetId;
                    stateHandler.setState(worldStateName, this.state);

                    if (devInteractions) {
                        devInteractions.onStreetChange();
                    }
                }
            );

            this.currentStreet = newStreet;

            this.currentStreet.setPlayer(this.player, playerPos);
            this.stuffThatNeedsUpdating.push(this.currentStreet);
        } else {
            this.currentStreet?.destroy();
            this.currentStreet = new Street(tstreetData[streetId], (s) => {
                this.changeStreet(s);
            }, (a, b) => { this.goToBrainWaves(a, b) }, this.controlsHandler.interactionInput);

            this.currentStreet.setPlayer(this.player, playerPos);
            this.stuffThatNeedsUpdating.push(this.currentStreet);
        }
    }
    update() {
        this.player.update();
        this.stuffThatNeedsUpdating.forEach((i) => i.update());
        if (devInteractions) {
            devInteractions.update(this.player);
        }
    }

    draw() {
        this.player.draw();
        this.stuffThatNeedsUpdating.forEach((i) => i.draw());
    }
}