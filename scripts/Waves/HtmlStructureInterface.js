import TemplatedHtml from "../TemplatedHtml";


/*
export default class FunctionEditorHtmlStructureInterface{
    constructor(parent){
        this.element = new TemplatedHtml("functionEditor2",parent);
    }
    getCardStore(){
        return this.element.getPart("tray")
    }
    getTargetGraphArea(){
        return this.element.getPart("curveDisplay-machine");
    }
    getCurrentFunctionTextArea(){
        return this.element.getPart("currentFunction");
    }
    getThoughOutputArea(){
        return this.element.getPart("thought");
    }
    getTargetFunctionArea(){
        return this.element.getPart("curveDisplay-target");
    }
    getStatsOutputArea(){
        return this.element.getPart("stats");
    }
    getHintButton(){
        return this.element.getPart("hintButton");
    }
    getBackButton(){
        return this.element.getPart("backButton");
    }
}
*/
/*
//
export default class FunctionEditorHtmlStructureInterface{
    constructor(parent){
        this.element = new TemplatedHtml("functionEditor3",parent);
    }
    getCardStore(){
        return this.element.getPart("pieceStartingArea")
    }
    getTargetGraphArea(){
        return this.element.getPart("projectingWave");
    }
    getCurrentFunctionTextArea(){
        return this.element.getPart("currentFunction");
    }
    getThoughOutputArea(){
        return this.element.getPart("thought");
    }
    getTargetFunctionArea(){
        return this.element.getPart("characterReadingWave");
    }
    getStatsOutputArea(){
        return this.element.getPart("stats");
    }
    getHintButton(){
        return this.element.getPart("hitButton");
    }
    getBackButton(){
        return this.element.getPart("backButton");
    }
}*/

export default class FunctionEditorHtmlStructureInterface {
    constructor(parent) {
        this.element = new TemplatedHtml("theFuncer",null,false);
    }
    getCardStore() {
        return this.element.getPart("inactive")
    }
    //CanvasContainerForTarget
    getTargetGraphArea() {
        return this.element.getPart("currentWave");
    }
    //CanvasContainerForTarget
    getTargetFunctionArea() {
        return this.element.getPart("targetWave");
    }
    getCurrentFunctionTextArea() {
        return this.element.getPart("currentFuncOutput");
    }
    getThoughOutputArea() {
        return this.element.getPart("thoughtOutput");
    }
    
    getStatsOutputArea() {
        return this.element.getPart("score");
    }
    getHintButton() {
        return this.element.getPart("hint");
    }
    getBackButton() {
        return this.element.getPart("back");
    }

}