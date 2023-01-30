import mathFuncs from "./mathFuncs";
import { FunctionDrawer } from "./FunctionDrawer";
import TemplatedHtml from "../TemplatedHtml.js";
import Card from "./Card.js";


export class FunctionEditor {
    constructor(changeCallBack) {
        this.baseElement = new TemplatedHtml(
            "functionEditor",
            document.getElementById("root")
        );
        this.changeCallback = changeCallBack;

        //Just put all the cards in, why not
        this.cards = mathFuncs.map((c, i, ar) => {
            var cardd = new Card(
                c,
                (i + 1) / (2 + ar.length),
                this.baseElement.getPart("cards")
            );
            if (i % 2 == 0) {
                cardd.position.y = 0.9;
            }
            cardd.updateToNewPosition();
            return cardd;
        });

        var c = 2;
        this.cards[c].position.y = 0.2;
        this.cards[c].activation = 1;
        this.cards[c].updateToNewPosition();

        c = 5;
        this.cards[c].position.y = 0.2;
        this.cards[c].activation = 1;
        this.cards[c].updateToNewPosition();

        this.cards.forEach((i) => {

            i.element.appendInto(this.baseElement.getPart("cards"));
            i.canvasGrapher.draw();
        });
        this.functionDrawer = new FunctionDrawer(
            this.baseElement.getPart("output"),
            this.baseElement.getPart("activeFunction")
        );
        this.cards.forEach((i) => i.setupEvents(() => {
            this.onCardChange();
        })
        );
        this.onCardChange();
        this.animateCurve();
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