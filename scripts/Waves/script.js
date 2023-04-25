//import vec2
//import Glitchy Text

import { FunctionMatchGame } from "./FunctionMatchGame";
import { getQuote } from "./getQuote";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//try and match maths functions to deal damage/defend.
//Setup defences, but them functions might be useful for attacking
//parts of the function are cards
//Want to reduce the amount of numbers to just like 1, X and the polynomials
//Don't want to go down a scifi route
//Dont want to use 'blocks' like scratch
//As you put cards in, the output lerps between before that card and after.

var useableTings = [0,1,2,3,4,5,6,7,8,9,10,11];
var gamDat = {
    target:useableTings.sort((a,b)=>Math.random()-0.5).slice(0,(urlParams.get('c')||3)),
    useable:useableTings,
    thought:"test",
    source:"endless",
    onBack: ()=>{
        window.location.href = "./index.html";
    }
};



if(urlParams.get('target' )&& urlParams.get('useable') && urlParams.get('thought')){

    gamDat.target = urlParams.get('target').split(",").map(i=>+i);
    gamDat.useable = urlParams.get('useable').split(",").map(i=>+i);
    gamDat.thought = urlParams.get('thought');
    gamDat.icon = urlParams.get('icon');
    gamDat.source = "walkingSim";
    gamDat.onBack = ()=>{
        window.location.href = "./walkingsim.html";
    };
}

var matchGame;
document.addEventListener("DOMContentLoaded",()=>{
    matchGame = new FunctionMatchGame(gamDat);
    getQuote((v)=>{matchGame.glitchyText.updateText(v.content)});
    
    document.getElementById("targetItem").textContent = gamDat.icon;
},{ once:true });




//to make time based calculations use the same time.

//todo - Make update loops come from 1 place, not using timeouts.