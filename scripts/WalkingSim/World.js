import Vec2 from "../Vec2";
import { Player } from "./Player";
import { Street } from "./Street";
import { StreetTransition } from "./StreetTransition";
import { tstreetData } from "./WorldData.js";

export class World {
    constructor(levelData) {
        this.stuffThatNeedsUpdating = [];
        this.player = new Player(document.body);
        this.changeStreet("street1", false);
        this.inStreetTransition = false;
    }
    changeStreet(streetId) {
        if (this.inStreetTransition) {
            return;
        }
        this.inStreetTransition = true;
        var prevStreetId = this.streetId;
        var newStreetData = tstreetData[streetId];
        var playerPos;

        if (!prevStreetId) {
            //initial player pos
            playerPos = new Vec2(0, 0);
        } else {
            playerPos = new Vec2(newStreetData.junctions.find(i => i.street == prevStreetId).pos);
        }
        this.streetId = streetId;

        if (prevStreetId) {


            var newStreet = new Street(tstreetData[streetId], (s) => { this.changeStreet(s); });
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
                });

            this.currentStreet = newStreet;
            this.currentStreet.setPlayer(this.player, playerPos);
            this.stuffThatNeedsUpdating.push(this.currentStreet);
        } else {
            this.currentStreet = new Street(tstreetData[streetId], (s) => { this.changeStreet(s); });

            this.currentStreet.setPlayer(this.player, playerPos);
            this.stuffThatNeedsUpdating.push(this.currentStreet);
        }
    }
    update() {
        this.player.update();
        this.stuffThatNeedsUpdating.forEach((i) => i.update());
    }

    draw() {
        this.player.draw();
        this.stuffThatNeedsUpdating.forEach((i) => i.draw());
    }
}