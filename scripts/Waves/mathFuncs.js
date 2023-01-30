import { getTime } from "./TimeHandler";

class CardType {
    constructor(name, func) {
        this.name = name;
        this.func = func;
    }
}


export default [
    new CardType("x+1", (x) => x + 1),
    new CardType("x*-1", (x) => x * -1),
    new CardType("x⁻¹", (x) => Math.pow(x, -1)),
    new CardType("x²", (x) => Math.pow(x, 2)),
    new CardType("x³", (x) => Math.pow(x, 3)),
    new CardType("√x", (x) => Math.pow(x, 0.5)),
    new CardType("sin(x)", (x) => Math.sin(x)),
    new CardType("e^x", (x) => Math.pow(2, x)),
    new CardType("ln(x)", (x) => Math.log2(x)), //shhhh
    new CardType("x+sin(t)", (x) => x + Math.sin(getTime() / 1000)),
    new CardType("|x|", (x) => Math.abs(x)),
    new CardType("x%2", (x) => x % 2)
    //new CardType("1%x", (x) => 1%x),
    //new CardType("x+randt", (x) => x+Math.random()),
    //new CardType("round(x)", (x) => Math.round(x))
];