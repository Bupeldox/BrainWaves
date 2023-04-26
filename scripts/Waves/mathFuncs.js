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
    new CardType(1,"x+1", (x) => x + 1,"gem9.png"), // 1 more than x
    new CardType(2,"x*-1", (x) => x * -1,"gem2.png"), // put a minus infront of x
    new CardType(3,"x⁻¹", (x) => Math.pow(x, -1),"gem5.png"), // 1/x
    new CardType(4,"x²", (x) => Math.pow(x, 2),"gem8.png"), // the area of a square with side length x
    new CardType(5,"x³", (x) => Math.pow(x, 3),"gem3.png"), // the volume of a cube with side length x
    new CardType(6,"√x", (x) => Math.pow(x, 0.5),"gem7.png"), // the side length of a square of area x
    new CardType(7,"sin(x)", (x) => Math.sin(x),"gem11.png"), // the horisontal distance to the center of a circle from a line length 1 coming out of the center at angle x
    new CardType(8,"e^x", (x) => Math.pow(2, x),"gem6.png"), //the volume of a box with side length e in x dimentions
    new CardType(9,"ln(x)", (x) => Math.log2(x),"gem4.png"), //the number of dimentions a box needs if all edges are length e and the 'volume' is x
    new CardType(10,"x+sin(t)", (x) => x + Math.sin(getTime() / 1000),"gem12.png"), // imagine a rotating line coming out of a circle, then get the horisontal distance to the center, and add that to x
    new CardType(11,"|x|", (x) => Math.abs(x),"gem1.png"),// if x was only positive
    new CardType(12,"x%2", (x) => x % 2,"gem10.png")// take x, if its more that 2, take 2 away until it is less than 2. (what happens when x is negative is disuputed)
];