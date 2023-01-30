export class TextScrambler {
    constructor(text) {
        this.text = text;
        this.letters =
            "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!£$%^&*()-=_+[]{};'#:@~,./<>?";
    }
    updateScrambledness(amount) {
        var getRandomCharacter = () => {
            var index = Math.floor(Math.random() * this.letters.length);
            return this.letters[index];
        };

        var text = "";
        for (var i = 0; i < this.text.length; i++) {
            if (Math.random() > amount) {
                text += getRandomCharacter();
            } else {
                text += this.text[i];
            }
        }
        return text;
    }
}
