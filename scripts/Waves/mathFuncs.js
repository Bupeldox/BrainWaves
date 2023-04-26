import { getTime } from "./TimeHandler";

class CardType {
    constructor(index, name, func, imageName) {
        this.index = index; 
        this.name = name;
        this.func = func;
        this.imageName = imageName;
    }
}


export default [
    new CardType(1,"x+1", (x) => x + 1,"gem9.png"),
    new CardType(2,"x*-1", (x) => x * -1,"gem2.png"),
    new CardType(3,"x⁻¹", (x) => Math.pow(x, -1),"gem5.png"),
    new CardType(4,"x²", (x) => Math.pow(x, 2),"gem8.png"),
    new CardType(5,"x³", (x) => Math.pow(x, 3),"gem3.png"),
    new CardType(6,"√x", (x) => Math.pow(x, 0.5),"gem7.png"),
    new CardType(7,"sin(x)", (x) => Math.sin(x),"gem11.png"),
    new CardType(8,"e^x", (x) => Math.pow(2, x),"gem6.png"),
    new CardType(9,"ln(x)", (x) => Math.log2(x),"gem4.png"), //shhhh
    new CardType(10,"x+sin(t)", (x) => x + Math.sin(getTime() / 1000),"gem12.png"),
    new CardType(11,"|x|", (x) => Math.abs(x),"gem1.png"),
    new CardType(12,"x%2", (x) => x % 2,"gem10.png")
];