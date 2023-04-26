


//export var timeSpeedMod = TickTime / 1000;

import { WalkingSim } from "./WalkingSim/WalkingSim";
import { FunctionMatchGameWrapper } from "./Waves/FunctionMatchGameWrapper";



class GameController{

    constructor(){
        this.inventory = [];

        this.wavesPart = new FunctionMatchGameWrapper();
        this.walkingSimPart = new WalkingSim((a,b,c,d)=>{this.switchToWaves(a,b,c,d);});
        this.walkingSimPart.start();
    }
    switchToWaves(targetFunc,inventory,thoughtText,icon){
        this.walkingSimPart.stop();
        this.wavesPart.start(targetFunc,inventory,thoughtText,icon,()=>{this.switchToWalkingSim()});
    }
    switchToWalkingSim(){
        this.wavesPart.stop();
        this.walkingSimPart.start();
    }

}



window.game = new GameController();