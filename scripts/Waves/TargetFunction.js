import mathFuncs from "./mathFuncs";
import { FunctionDrawer } from "./FunctionDrawer";
import Card from "./Card";

export class TargetFunction {
    constructor(element) {
        this.functionDrawer = new FunctionDrawer(element);
     
    }
    drawCurve() {
        // pls fix this// pls fix this// pls fix this// pls fix this// pls fix this// pls fix this// pls fix this
        
        this.functionDrawer.drawCardResult(this.cardList);
        
        if (this.cardList.find((x) => x.activation > 0 && x.card.name.includes("t"))) {
            this.animateCurve();
        } else {
            this.stopCurveAnimation();
        }
    }
    animateCurve(stop) {
        this.functionDrawer.drawCardResult(this.cardList);
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

    compareToCurrent(userPoints) {
        this.drawCurve();

        var targetPoints = this.functionDrawer.functionListCalculator.calculateCardList(
            this.cardList
        );
        var currentPoints = userPoints; //this.functionDrawer.functionListCalculator.calculateCardList(createdCards);

        var totalDifference = 0;
        targetPoints.map((p, i) => {
            var target = p.y;
            var guess = currentPoints[i].y;
            if (isNaN(target) && isNaN(guess)) {
                totalDifference += 0;
                return;
            } else if (isNaN(target) || isNaN(guess)) {
                totalDifference += 100;
                return;
            }
            totalDifference += Math.abs(p.y - currentPoints[i].y);
        });

        return totalDifference;
    }
    setCurve(funcList){
        var list = [];

        for (var i = 0; i < funcList.length; i++) {
            var functionIndex = funcList[i];
            var card = mathFuncs[functionIndex];
            var cardInstance = new Card(card, i);
            cardInstance.activation = 1;
            list.push(cardInstance);
        }
        this.cardList = list;
        this.drawCurve();
    }
    /*
    generateNewCurve(complexity) {
        var list = [];
        var funcs = mathFuncs;
        const selected = mathFuncs
            .sort(() => 0.5 - Math.random())
            .slice(0, complexity);

        for (var i = 0; i < selected.length; i++) {
            var card = selected[i];
            var cardInstance = new Card(card, i);
            cardInstance.activation = 1;
            list.push(cardInstance);
        }
        this.cardList = list;
        this.drawCurve();
    }*/
}
