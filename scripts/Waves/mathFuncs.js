import { getTime } from "./TimeHandler";

class CardType {
    constructor(name, func, imageName) {
        this.name = name;
        this.func = func;
        this.imageName = imageName;
    }
}


export default [
    new CardType("x+1", (x) => x + 1,"gem9.png"),
    new CardType("x*-1", (x) => x * -1,"gem2.png"),
    new CardType("x⁻¹", (x) => Math.pow(x, -1),"gem5.png"),
    new CardType("x²", (x) => Math.pow(x, 2),"gem8.png"),
    new CardType("x³", (x) => Math.pow(x, 3),"gem9.png"),
    new CardType("√x", (x) => Math.pow(x, 0.5),"gem7.png"),
    new CardType("sin(x)", (x) => Math.sin(x),"gem3.png"),
    new CardType("e^x", (x) => Math.pow(2, x),"gem6.png"),
    new CardType("ln(x)", (x) => Math.log2(x),"gem4.png"), //shhhh
    new CardType("x+sin(t)", (x) => x + Math.sin(getTime() / 1000),"gem11.png"),
    new CardType("|x|", (x) => Math.abs(x),"gem1.png"),
    new CardType("x%2", (x) => x % 2,"gem10.png")
    //new CardType("1%x", (x) => 1%x),
    //new CardType("x+randt", (x) => x+Math.random()),
    //new CardType("round(x)", (x) => Math.round(x))
];