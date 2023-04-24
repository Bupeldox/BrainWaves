import TemplatedHtml from "../TemplatedHtml";
import Vec2 from "../Vec2";
import { FunctionListCalculator } from "./FunctionListCalculator";
import { FunctionDrawerShader } from "./FunctionDrawerShader";


export class FunctionDrawer {
    constructor(graphTarget, functionTextTarget) {
        this.element = new TemplatedHtml("GraphOutput", graphTarget);
        this.functionTextElement = new TemplatedHtml(
            "functionTextOutput",
            functionTextTarget
        );
        this.centerPoint = new TemplatedHtml("centerPoint", this.element);
        this.pointElements = [];
        this.limit = 4;
        this.functionListCalculator = new FunctionListCalculator();
        
        var canvas = document.createElement("canvas");
        this.element.element.appendChild(canvas);

        canvas.height = this.element.element.offsetHeight;
        canvas.width = this.element.element.offsetWidth;

        this.functionDrawerShader = new FunctionDrawerShader(canvas);
    }

    formatPointsForDisplay(points) {
        points = points.filter(
            (i) => i.x < this.limit &&
                i.x > -this.limit &&
                i.y > -this.limit &&
                i.y < this.limit
        );
        points = points.map((i) => {
            i = i.times(1 / this.limit); //Bring within -1 and 1
            i = i.timesComponentwise(new Vec2(1, -1)); //Flip Y cus html
            i = i.add(new Vec2(1, 1)).times(0.5); //Bring between 0 and 1
            return i;
        });
        return points;
    }
    getText(cards) {
        return this.functionListCalculator.getText(
            cards.filter((i) => i.activation == 1).map((i) => i.card)
        );
    }
    drawCardResult(cards) {
        //1 = fully with the activated cards
        this.calcText = this.getText(cards);
        this.functionTextElement?.updateText(this.calcText);

        var points = this.functionListCalculator.calculateCardList(cards);

        this.functionDrawerShader.drawCardResult(cards);
    }
}


/*
export class FunctionDrawer {
    constructor(graphTarget, functionTextTarget) {
        this.element = new TemplatedHtml("GraphOutput", graphTarget);
        this.functionTextElement = new TemplatedHtml(
            "functionTextOutput",
            functionTextTarget
        );
        this.centerPoint = new TemplatedHtml("centerPoint", this.element);
        this.pointElements = [];
        this.limit = 4;
        this.functionListCalculator = new FunctionListCalculator();
    }

    formatPointsForDisplay(points) {
        points = points.filter(
            (i) => i.x < this.limit &&
                i.x > -this.limit &&
                i.y > -this.limit &&
                i.y < this.limit
        );
        points = points.map((i) => {
            i = i.times(1 / this.limit); //Bring within -1 and 1
            i = i.timesComponentwise(new Vec2(1, -1)); //Flip Y cus html
            i = i.add(new Vec2(1, 1)).times(0.5); //Bring between 0 and 1
            return i;
        });
        return points;
    }
    getText(cards) {
        return this.functionListCalculator.getText(
            cards.filter((i) => i.activation == 1).map((i) => i.card)
        );
    }
    drawCardResult(cards) {
        //1 = fully with the activated cards
        this.calcText = this.getText(cards);
        this.functionTextElement?.updateText(this.calcText);

        var points = this.functionListCalculator.calculateCardList(cards);

        points = this.formatPointsForDisplay(points);
        if (this.pointElements.length > points.length) {
            //more elements
            this.pointElements.forEach((p, i, array) => {
                if (i >= points.length) {
                    const index = array.indexOf(p);
                    if (index > -1) {
                        // only splice array when item is found
                        array.splice(index, 1); // 2nd parameter means remove one item only
                    }
                    p.element.remove();
                }
            });
        } else if (this.pointElements.length < points.length) {
            //more points
            var c = points.length - this.pointElements.length;
            for (var i = 0; i < c; i++) {
                var element = new TemplatedHtml("curveMarker", this.element);
                this.pointElements.push(element);
            }
        }
        points.forEach((p, i) => {
            var element = this.pointElements[i];
            element.element.style.top = Math.round(p.y * 100000) / 1000 + "%";
            element.element.style.left = Math.round(p.x * 100000) / 1000 + "%";
        });
    }
}*/
