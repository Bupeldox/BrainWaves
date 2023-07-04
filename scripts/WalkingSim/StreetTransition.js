import TemplatedHtml from "../TemplatedHtml";
import Vec2 from "../Vec2";

var transitionCount = 0;
var transitionTime = 2000;

export class StreetTransition {
    constructor(prevStreet, newStreet, junctionFrom, junctionTo, onTransitionEndCallback) {
        transitionCount++;
        this.transitionElement = new TemplatedHtml("streetTransition", document.getElementById("root"));
        this.junctionFrom = junctionFrom;
        this.junctionTo = junctionTo;
        var angle = junctionFrom.angle || 90;
        transitionTime = (2000 - Math.min(1500,transitionCount*400))*Math.max((angle/90),1);
        this.newStreet = newStreet;
        this.prevStreet = prevStreet;
        document.getElementById("debugCurrentStreet").textContent = junctionFrom.street;

        this.transitionElement.element.style.setProperty("--streetTransitionTime", (transitionTime/1000)+"s");
        
        var prevWidth = this.prevStreet.element.element.offsetWidth;
        var prevHeight = this.prevStreet.element.element.offsetHeight;
        
        var newWidth = this.newStreet.element.element.offsetWidth;
        var newHeight = this.newStreet.element.element.offsetHeight;

        this.transitionElement.element.style.width = prevWidth + "px";
        this.transitionElement.element.style.height = prevHeight + "px";

        this.onTransitionEndCallback = onTransitionEndCallback;
        this.prevStreet.element.appendInto(this.transitionElement.getPart("streetFrom"));
        this.newStreet.element.appendInto(this.transitionElement.getPart("streetTo"));

        var rotDir = !junctionFrom.backwards ? -1 : 1;
        angle = rotDir * angle;
        //a = from, b=to
        //Set initial state
        var otherTranslate = new Vec2(-(junctionTo.pos.x), rotDir * (junctionFrom.pos.x - (prevWidth / 2)));
        this.transitionElement.getPart("streetFrom").style.transform = window.fromStart(angle,junctionFrom.pos.x,junctionTo.pos.x);//"rotateY(0) translatex(0) translatez("+0+"px)";
        this.transitionElement.getPart("streetTo").style.transform = window.toStart(angle,junctionFrom.pos.x,junctionTo.pos.x);//"rotateY(" + ((angle)) + "deg) translateX(" + otherTranslate.x + "px) translateZ(" + 0 + "px)";
        this.transitionElement.getPart("streetTo").style.opacity = 0;

        setTimeout(() => {
            //animate to
            otherTranslate = new Vec2(-(junctionTo.pos.x - (newWidth / 2)), rotDir * (junctionFrom.pos.x - (newWidth / 2)));
            this.transitionElement.getPart("streetTo").style.opacity = 1;
            this.transitionElement.getPart("streetFrom").style.opacity = 0;
            this.transitionElement.getPart("streetAssembly").style.transform = window.assemblyTo(angle,junctionFrom.pos.x,junctionTo.pos.x,prevWidth,newWidth);//"translateZ(" + /*-otherTranslate.y*/0 + "px) translateX(" + (-otherTranslate.x) + "px) rotateY(" + ((-angle)) + "deg)";

            
        this.transitionElement.element.style.width = newWidth + "px";
        this.transitionElement.element.style.height = newHeight + "px";

        }, 5);
        setTimeout(() => {
            if(!window.dontTransition){
                this.onTransisionEnd();
            }else{
                window.cTrans = ()=>{this.onTransisionEnd();};
            }
        }, transitionTime);
    }
    onTransisionEnd() {
        document.getElementById("root").prepend(this.newStreet.element.element);
        this.transitionElement.element.remove();
        this.onTransitionEndCallback();
    }
}


window.fromStart = function(angle,jFrom,jTo){
    return "rotateY(0) translatex(0) translatez(0px)";
}
window.toStart = function(angle,jFrom,jTo){
    return "translateX(" + 0 + "px) rotateY(" + ((angle)) + "deg) translateZ(" + 0 + "px)";
}
window.assemblyTo = function(angle,jFrom,jTo,prevWidth,newWidth){
    var width = 300;
    var r = width/2;
    //var distx = r*-Math.sin(90+angle);
    //var distz = r//r*Math.cos(90+angle);
    return "translateZ(" +( 0 )+ "px) translateX(" + (-0) + "px) rotateY(" + ((-angle)) + "deg)";
}