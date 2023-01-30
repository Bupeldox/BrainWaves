import { DisplaySettings } from "./DisplaySettings";
import { CardFuncer } from "./CardFuncer";
import { lerp } from "../Utils.js";
import Vec2 from "../Vec2";

export class FunctionListCalculator {
    constructor() {
        this.cardFuncer = new CardFuncer();
        this.savedPoints = [];
    }
    calculatePoints(cardsTypes) {
        this.cardFuncer.setCards(cardsTypes);
        var output = [];
        for (var x = -DisplaySettings.limit; x < DisplaySettings.limit; x += DisplaySettings.spacing) {
            output.push(new Vec2(x, this.cardFuncer.evaluate(x)));
        }
        return output;
    }
    calculateCardList(cards) {
        var activatedCards = cards.filter((i) => i.activation === 1);
        var movingCards = cards.filter((i) => i.activation !== 0);

        var lerpAmount = 1;
        if (activatedCards.length != movingCards.length) {
            var movingCard = movingCards.find(
                (i) => i.activation != 1 && i.activation != 0
            );
            lerpAmount = movingCard.activation;
        }

        var pointsForFullyActiveCards = this.calculatePoints(
            activatedCards.map((i) => i.card)
        );

        var pointsForMovingCards = this.calculatePoints(
            movingCards.map((i) => i.card)
        );

        var points = pointsForFullyActiveCards.map(
            (e, i) => new Vec2(
                lerp(e.x, lerpAmount, pointsForMovingCards[i].x),
                lerp(e.y, lerpAmount, pointsForMovingCards[i].y)
            )
        );
        this.savedPoints = points;
        return points;
    }
    getText(cards) {
        var output = "x";
        cards.forEach((c, i) => {
            if (i == 0) {
                let t = c.name;
                output = t.replaceAll("x", output);
            } else {
                let t = c.name.replace("(x)", "x");
                output = t.replaceAll("x", "(" + output + ")");
            }
        });
        return "y = " + output;
    }
}
