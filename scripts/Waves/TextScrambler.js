export class TextScrambler {
    constructor(text) {
        this.text = text;
        this.letters =
            "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!£$%^&*()-=_+[]{};'#:@~,./<>?";
            
        this.scrambledText = new Array(text.length).fill(0).map(i=>this.getRandomCharacter());
        this.unscrambleOrder = new Array(text.length).fill(0).map((e,i)=>i).sort(i=>Math.random()-0.5);
    }
    getRandomCharacter (){
        var index = Math.floor(Math.random() * this.letters.length);
        return this.letters[index];
    };
    updateScrambledness(amount) {
       
        //this.scrambledText = new Array(this.text.length).fill(0).map(i=>this.getRandomCharacter());

        var threshold = Math.round(amount*this.text.length);
        var arr = [];
        var text = "";
        for (var i = 0; i < this.text.length; i++) {
            var t = this.unscrambleOrder[i]<=threshold;    
            arr.push(t);
            if(t){
                
                text +=this.text[i];
            }else{
                text += this.scrambledText[i];
            }
        }
        return {
            textOut:text,
            correctLetters:arr
        };
    }
}
