import TemplatedHtml from "../TemplatedHtml";
import Vec2 from "../Vec2";

export class StreetTransition {
    constructor(prevStreet, newStreet, junctionFrom, junctionTo, onTransitionEndCallback) {
        this.transitionElement = new TemplatedHtml("streetTransition", document.getElementById("root"));
        this.junctionFrom = junctionFrom;
        this.junctionTo = junctionTo;
        this.newStreet = newStreet;
        this.prevStreet = prevStreet;

        var angle = 80;

        this.onTransitionEndCallback = onTransitionEndCallback;
        this.prevStreet.element.appendInto(this.transitionElement.getPart("streetFrom"));
        this.newStreet.element.appendInto(this.transitionElement.getPart("streetTo"));

        var rotDir = !junctionFrom.backwards ? -1 : 1;
        //a = from, b=to
        var width = this.prevStreet.element.element.offsetWidth;
        //Set initial state
        this.transitionElement.getPart("streetFrom").style.transform = "rotateY(0) translatex(0) translatez(0)";
        //this.transitionElement.getPart("streetB").style.transform = "translatex("+junctionTo.pos.x+"px) translatez("+junctionFrom.pos.x+"px) rotateY("+((rotDir*90))+"deg)";
        var otherTranslate = new Vec2(-(junctionTo.pos.x - (width / 2)), rotDir * (junctionFrom.pos.x - (width / 2)));
        this.transitionElement.getPart("streetTo").style.transform = "rotateY(" + ((rotDir * angle)) + "deg) translatex(" + otherTranslate.x + "px) translatez(" + otherTranslate.y + "px)";
        this.transitionElement.getPart("streetTo").style.opacity = 0;

        setTimeout(() => {
            //animate to
            this.transitionElement.getPart("streetTo").style.opacity = 1;
            this.transitionElement.getPart("streetFrom").style.opacity = 0;
            //this.transitionElement.getPart("streetTo").style.opacity=0;
            this.transitionElement.getPart("streetAssembly").style.transform = "translatez(" + -otherTranslate.y + "px) translatex(" + -otherTranslate.x + "px) rotateY(" + ((-rotDir * angle)) + "deg)";
        }, 5);
        setTimeout(() => {
            this.onTransisionEnd();
        }, 500);
    }
    onTransisionEnd() {
        document.getElementById("root").prepend(this.newStreet.element.element);
        this.transitionElement.element.remove();
        this.onTransitionEndCallback();
    }
}