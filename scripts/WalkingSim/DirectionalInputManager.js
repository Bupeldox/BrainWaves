import Vec2 from "../Vec2";

export class DirectionalInputManager {
    constructor() {
        this.currentDirection = new Vec2(0, 0);
        this.keyMaps = {
            ArrowLeft: new Vec2(-1, 0),
            ArrowRight: new Vec2(1, 0),
            ArrowUp: new Vec2(0, 1),
            ArrowDown: new Vec2(0, -1),
            a: new Vec2(-1, 0),
            d: new Vec2(1, 0),
            w: new Vec2(0, 1),
            s: new Vec2(0, -1)
        };
        this.keysDown = [];
        document.addEventListener("keydown", (e) => {
            this.onKeyDown(e.key);
        });
        document.addEventListener("keyup", (e) => {
            this.onKeyUp(e.key);
        });
    }
    onKeyDown(key) {
        if (!this.keysDown.includes(key)) {
            this.keysDown.push(key);
        }
    }
    onKeyUp(key) {
        this.keysDown = this.keysDown.filter((i) => i != key);
    }
    getDirection() {
        var vecTotal = new Vec2(0, 0);
        for (var i = 0; i < this.keysDown.length; i++) {
            var key = this.keysDown[i];
            if (!this.keyMaps.hasOwnProperty(key)) {
                continue;
            }
            var keyvec = this.keyMaps[key];
            vecTotal = vecTotal.add(keyvec);
        }
        return vecTotal.normalised();
    }
}