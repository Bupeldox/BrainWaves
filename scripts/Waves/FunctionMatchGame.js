import { FunctionEditor } from "./FunctionEditor";
import { TargetFunction } from "./TargetFunction";
import { GitchyText } from "./GitchyText";
import TemplatedHtml from "../TemplatedHtml";

export class FunctionMatchGame {
    constructor(gameData) {
        this.gameData = gameData;
        this.thoughtTextOutput = new TemplatedHtml(
            "thought",
            document.getElementById("root")
        );
        this.functionEditor = new FunctionEditor(() => {
            this.onFunctionChange();
        },gameData.useable);
        this.targetFunction = new TargetFunction(
            [],
            this.functionEditor.baseElement.getPart("output")
        );
        this.glitchyText = new GitchyText(
            this.gameData.thought,
            this.thoughtTextOutput.element
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
        /*
        this.nextButton = new TemplatedHtml(
            "nextButton",
            this.functionEditor.baseElement.getPart("buttonContainer")
        );
        this.harderButton = new TemplatedHtml(
            "nextButton",
            this.functionEditor.baseElement.getPart("buttonContainer")
        );
        this.nextButton.element.addEventListener("click", () => {
            this.nextLevel();
        });
        this.harderButton.element.addEventListener("click", () => {
            this.nextLevel(true);
        });*/
        this.functionEditor.functionDrawer.centerPoint.updateText("💎");
        this.functionEditor.functionDrawer.centerPoint.element.style.filter = "hue-rotate(180deg)";

        this.targetFunction.setCurve(this.gameData.target);
        this.onFunctionChange();
        this.currentComplexity = 1;
        this.updateLevelText();
    }

    onFunctionChange() {
        if (this.accuracyOutput) {
            var difference = this.getAccuracy();
            var score = 5 - Math.log(difference);
            this.hasPassed = score > 20 || isNaN(score);
            this.glitchyText.updateValue((score + 4) / 10);
            this.accuracyOutput.updateText(
                "score:" + (this.hasPassed ? "✅" : Math.round(score * 100) / 100)
            );
            if (this.hasPassed) {
                this.setButtonState("NextLevel");
            } else {
                this.setButtonState("MidLevel");
            }
        }
    }
    setButtonState(state) {
        switch (state) {
            case "NextLevel":
                this.nextButton.element.style.background = "#e3e";
                this.nextButton.updateText("Next Wave");
                this.harderButton.element.style.display = "block";
                this.harderButton.element.style.background = "#f33";
                this.harderButton.updateText("Harder Curves!!!");
                break;
            case "MidLevel":
                this.nextButton.element.style.background = "#efe";
                this.nextButton.updateText("Hint");
                this.harderButton.element.style.display = "none";
                break;
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
    
    /*
    nextLevel(moreDifficult) {
        if (this.hasPassed) {
            this.level++;
            if (moreDifficult) {
                this.currentComplexity++;
            }
            this.glitchyText.updateValue(0, true);
            this.glitchyText.updateText(this.nextQuote);
            getQuote((d) => {
                this.nextQuote = d.content;
            });
            this.updateLevelText();
            this.targetFunction.generateNewCurve(this.currentComplexity);
            this.onFunctionChange();
        } else {
            debugger;
            this.nextButton.updateText(this.targetFunction.functionDrawer.getText(this.targetFunction.cardList));

        }
    }*/
}
