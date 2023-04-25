import { FunctionEditor } from "./FunctionEditor";
import { TargetFunction } from "./TargetFunction";
import { GitchyText } from "./GitchyText";
import TemplatedHtml from "../TemplatedHtml";
import FunctionEditorHtmlStructureInterface from "./HtmlStructureInterface";


export class FunctionMatchGame {
    constructor(gameData) {
        this.gameData = gameData;
        
       this.htmlStructure = new FunctionEditorHtmlStructureInterface(document.getElementById("root"));;
        
        this.functionEditor = new FunctionEditor(
            () => { this.onFunctionChange(); }, 
            gameData.useable,
            this.htmlStructure
        );

        this.thoughtTextOutput = new TemplatedHtml(
            "thought",
            this.htmlStructure.getThoughOutputArea()
        );
        
        this.targetFunction = new TargetFunction(
            this.htmlStructure.getTargetFunctionArea()
        );

        this.glitchyText = new GitchyText(
            this.gameData.thought,
            this.thoughtTextOutput.getPart("text")
        );

        this.level = 1;
        this.accuracyOutput = new TemplatedHtml(
            "scoreOutput",
            this.htmlStructure.getStatsOutputArea()
        );

        this.complexityOutput = new TemplatedHtml(
            "scoreOutput",
            this.htmlStructure.getStatsOutputArea()
        );
      
        this.functionEditor.functionDrawer.centerPoint.updateText("💎");
        this.functionEditor.functionDrawer.centerPoint.element.style.filter = "hue-rotate(180deg)";

        this.targetFunction.setCurve(this.gameData.target);
        this.onFunctionChange();
        this.currentComplexity = gameData.target.length ;
        this.updateLevelText();

        this.htmlStructure.getHintButton().addEventListener("click",()=>{this.onHintRequest()});

        this.htmlStructure.getBackButton().addEventListener("click",()=>{this.gameData.onBack();});
        
    }
    onHintRequest(){
        this.htmlStructure.getHintButton().textContent = this.targetFunction.functionDrawer.calcText;
    }

    onFunctionChange() {
        if (this.accuracyOutput) {
            this.htmlStructure.getHintButton().textContent = "Hint";
            var difference = this.getAccuracy();
            var score = 5 - Math.log(difference);
            this.hasPassed = score > 20 || isNaN(score);
            this.glitchyText.updateValue((score + 4) / 10);
            this.accuracyOutput.updateText(
                "score:" + (this.hasPassed ? "✅" : Math.round(score * 100) / 100)
            );
            if(this.hasPassed){
                this.htmlStructure.getBackButton().classList.remove("danger");
                this.htmlStructure.getBackButton().classList.add("info");
                this.thoughtTextOutput.element.classList.add("done");
            }else{
                this.htmlStructure.getBackButton().classList.add("danger");
                this.htmlStructure.getBackButton().classList.remove("info");
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

 class FunctionMatchGamead {
    constructor(gameData, ) {
        this.gameData = gameData;
        
       this.htmlStructure = new FunctionEditorHtmlStructureInterface(document.getElementById("root"));;
        
        this.functionEditor = new FunctionEditor(
            () => { this.onFunctionChange(); }, 
            gameData.useable,
            this.htmlStructure
        );

        this.thoughtTextOutput = new TemplatedHtml(
            "thought",
            this.htmlStructure.getThoughOutputArea()
        );
        
        this.targetFunction = new TargetFunction(
            this.htmlStructure.getTargetFunctionArea()
        );

        this.glitchyText = new GitchyText(
            this.gameData.thought,
            this.thoughtTextOutput.getPart("text")
        );

        this.level = 1;
        this.accuracyOutput = new TemplatedHtml(
            "scoreOutput",
            this.htmlStructure.getStatsOutputArea()
        );

        this.complexityOutput = new TemplatedHtml(
            "scoreOutput",
            this.htmlStructure.getStatsOutputArea()
        );
      
        this.functionEditor.functionDrawer.centerPoint.updateText("💎");
        this.functionEditor.functionDrawer.centerPoint.element.style.filter = "hue-rotate(180deg)";

        this.targetFunction.setCurve(this.gameData.target);
        this.onFunctionChange();
        this.currentComplexity = 1;
        this.updateLevelText();

        this.htmlStructure.getHintButton().addEventListener("click",()=>{this.onHintRequest()});
        
    }
    onHintRequest(){
        this.htmlStructure.getHintButton().textContent = this.targetFunction.functionDrawer.calcText;
    }

    onFunctionChange() {
        if (this.accuracyOutput) {
            this.htmlStructure.getHintButton().textContent = "Hint";
            var difference = this.getAccuracy();
            var score = 5 - Math.log(difference);
            this.hasPassed = score > 20 || isNaN(score);
            this.glitchyText.updateValue((score + 4) / 10);
            this.accuracyOutput.updateText(
                "score:" + (this.hasPassed ? "✅" : Math.round(score * 100) / 100)
            );
            if(this.hasPassed){
                this.htmlStructure.getBackButton().classList.remove("danger");
                this.htmlStructure.getBackButton().classList.add("info");
                this.thoughtTextOutput.element.classList.add("done");
            }else{
                this.htmlStructure.getBackButton().classList.add("danger");
                this.htmlStructure.getBackButton().classList.remove("info");
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
