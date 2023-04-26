import TemplatedHtml from "../TemplatedHtml";
import Vec2 from "../Vec2";

export class DirectionalInputManager {
    
    constructor(guiContainer) {
        this.gui = new DirectionGUI(guiContainer);
        this.gui.onButtonPress = ()=>{this.onButtonPress();};
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
        this.onButtonPress = ()=>{};
    }

    onKeyDown(key) {
        this.onButtonPress();
        if (!this.keysDown.includes(key)) {
            this.keysDown.push(key);
        }
    }
    
    onKeyUp(key) {
        this.keysDown = this.keysDown.filter((i) => i != key);
    }

    getDirection() {
        if(this.isPaused){
            return new Vec2(0, 0);
        }
        var vecTotal = new Vec2(0, 0);
        for (var i = 0; i < this.keysDown.length; i++) {
            var key = this.keysDown[i];
            if (!this.keyMaps.hasOwnProperty(key)) {
                continue;
            }
            var keyvec = this.keyMaps[key];
            vecTotal = vecTotal.add(keyvec);
        }

        var guiOutput = this.gui.getDirection();

        vecTotal = vecTotal.add(guiOutput);

        return vecTotal.normalised();
    }
}


class DirectionGUI {

    constructor(elementContainer){

        this.buttonElement = new TemplatedHtml("mobile-directional-input",elementContainer);

       this.dirsDown = [];

       this.setupEvents("btn-up",new Vec2(0,1));
       this.setupEvents("btn-down",new Vec2(0,-1));
       this.setupEvents("btn-left",new Vec2(-1,0));
       this.setupEvents("btn-right",new Vec2(1,0));    
       this.onButtonPress = ()=>{};
    }
    setupEvents(clas,vec){
        //mouse
        this.buttonElement.getPart(clas).addEventListener("mousedown",()=>{this.dirDown(vec);});
        document.body.addEventListener("mouseup",()=>{this.dirUp(    vec);});
        this.buttonElement.getPart(clas).addEventListener("mouseleave",()=>{this.dirUp( vec);});
        //touch
        this.buttonElement.getPart(clas).addEventListener("touchstart",()=>{this.dirDown(vec);});
        document.body.addEventListener("touchend",()=>{this.dirUp(vec);});
        document.body.addEventListener("touchcancel",()=>{this.dirUp(vec);});
    }

    dirDown(dir){
        this.onButtonPress();
        if(-1!=this.dirsDown.findIndex(i=>i.x==dir.x&&i.y == dir.y)){
            return;
        }
        this.dirsDown.push(dir);
    }
    dirUp(dir){
        var index = this.dirsDown.findIndex(i=>i.x==dir.x&&i.y == dir.y)
        if(index!=-1){    
            this.dirsDown.splice(index,1);
        }
    }
    getDirection(){
        var totalVec = new Vec2(0,0);
        this.dirsDown.forEach(i=>totalVec = totalVec.add(i));
        return totalVec;
    }
}