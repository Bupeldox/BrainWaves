export class CardFuncer {
    constructor() {
        this.cardList = [];
    }
    setCards(c) {
        this.cardList = c;
    }
    evaluate(x) {
        this.cardList.forEach((c) => (x = c.func(x)));
        return x;
    }
}
