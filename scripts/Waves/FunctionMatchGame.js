import { FunctionEditor } from "./FunctionEditor";
import { TargetFunction } from "./TargetFunction";
import { GitchyText } from "./GitchyText";
import TemplatedHtml from "../TemplatedHtml";


export class FunctionMatchGame {
    constructor(gameData) {
        this.gameData = gameData;
        
       
        
        this.functionEditor = new FunctionEditor(
            () => { this.onFunctionChange(); }, 
            gameData.useable
        );

        this.thoughtTextOutput = new TemplatedHtml(
            "thought",
            this.functionEditor.baseElement.getPart("thoughtTextArea")
        );
        
        this.targetFunction = new TargetFunction(
            this.functionEditor.baseElement.getPart("output")
        );

        this.glitchyText = new GitchyText(
            this.gameData.thought,
            this.thoughtTextOutput.getPart("text")
        );

        this.level = 1;
        this.accuracyOutput = new TemplatedHtml(
            "scoreOutput",
            this.functionEditor.baseElement.getPart("textContainer")
        );

        this.complexityOutput = new TemplatedHtml(
            "scoreOutput",
            this.functionEditor.baseElement.getPart("textContainer")
        );
      
        this.functionEditor.functionDrawer.centerPoint.updateText("💎");
        this.functionEditor.functionDrawer.centerPoint.element.style.filter = "hue-rotate(180deg)";

        this.targetFunction.setCurve(this.gameData.target);
        this.onFunctionChange();
        this.currentComplexity = 1;
        this.updateLevelText();

        this.functionEditor.baseElement.getPart("hint").addEventListener("click",()=>{this.onHintRequest()});

    }
    onHintRequest(){
        this.functionEditor.baseElement.getPart("hint").textContent = this.targetFunction.functionDrawer.calcText;
    }

    onFunctionChange() {
        if (this.accuracyOutput) {
            this.functionEditor.baseElement.getPart("hint").textContent = "Hint";
            var difference = this.getAccuracy();
            var score = 5 - Math.log(difference);
            this.hasPassed = score > 20 || isNaN(score);
            this.glitchyText.updateValue((score + 4) / 10);
            this.accuracyOutput.updateText(
                "score:" + (this.hasPassed ? "✅" : Math.round(score * 100) / 100)
            );
            if(this.hasPassed){
                this.functionEditor.baseElement.getPart("backButton").classList.remove("danger");
                this.functionEditor.baseElement.getPart("backButton").classList.add("info");
                this.thoughtTextOutput.element.classList.add("done");
            }else{
                this.functionEditor.baseElement.getPart("backButton").classList.add("danger");
                this.functionEditor.baseElement.getPart("backButton").classList.remove("info");
                this.thoughtTextOutput.element.classList.remove("done");
            }
        }
    }

    getAccuracy() {
        var accuracy = this.targetFunction.compareToCurrent(
            this.functionEditor.functionDrawer.functionListCalculator.savedPoints
        );
        return accuracy;
    }

    updateLevelText() {
        this.complexityOutput.updateText(
            "No. of cards:" + Math.round(this.currentComplexity * 10) / 10
        );
    }
}
