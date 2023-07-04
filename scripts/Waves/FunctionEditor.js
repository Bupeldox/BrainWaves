import mathFuncs from "./mathFuncs";
import { FunctionDrawer } from "./FunctionDrawer";
import TemplatedHtml from "../TemplatedHtml.js";
import Card from "./Card.js";
import FunctionEditorHtmlStructureInterface from "./HtmlStructureInterface";


export class FunctionEditor {
    constructor(changeCallBack,availableFuncs,htmlStructure) {
        this.baseElement = htmlStructure;
        // this.baseElement = new TemplatedHtml(
        //     "functionEditor",
        //     document.getElementById("root")
        // );
        this.changeCallback = changeCallBack;

        
        this.functionDrawer = new FunctionDrawer(
            this.baseElement.getTargetGraphArea(),
            this.baseElement.getCurrentFunctionTextArea()
            );
            
        this.setUseableCards(availableFuncs);

    }
    setUseableCards(availableFuncs){
        //Just put all the cards in, why not
        if(this.cards && this.cards.length>0){
            this.cards.forEach(i=>i.destroy());
            this.cards = [];
        }

        this.cards = 
            mathFuncs
            .filter((a,i)=>availableFuncs.includes(i))
            .map((c, i, ar) => {
                var cardd = new Card(
                    c,
                    (i + 1) / (2 + ar.length),
                    this.baseElement.getCardStore()
                );
                var f = (i % 4);
                var s = Math.floor(i/4);
                cardd.position.y = 0.1 + s/3 ;
                
                cardd.position.x = (0.3+f)/4;

                cardd.updateToNewPosition();
                return cardd;
            });

        this.cards.forEach((i) => {
            i.element.appendInto(this.baseElement.getCardStore());
            i.canvasGrapher?.draw();
        });

        this.cards.forEach((i) => i.setupEvents(() => {
            this.onCardChange();
        }));
        this.onCardChange();
    }
    onCardChange() {
        this.cards = this.cards.sort((a, b) => a.position.x - b.position.x);
        if (this.cards.find((x) => x.activation > 0 && x.card.name.includes("t"))) {
            this.animateCurve();
        } else {
            this.stopCurveAnimation();
        }
        this.functionDrawer.drawCardResult(this.cards);
        this.changeCallback();
    }
    animateCurve(stop) {
        this.functionDrawer.drawCardResult(this.cards);
        if (this.onFunctionChange) {
            this.onFunctionChange();
        }

        this.animationTimeout = setTimeout(() => {
            this.animateCurve();
        }, 100);
    }
    stopCurveAnimation() {
        clearTimeout(this.animationTimeout);
    }
}
