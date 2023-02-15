import TemplatedHtml from "../TemplatedHtml";



export default class FunctionEditorHtmlStructureInterface{
    constructor(parent){
        this.element = new TemplatedHtml("functionEditor",parent);
    }
    getCardStore(){
        return this.element.getPart("cards")
    }
    getTargetGraphArea(){
        return this.element.getPart("output");
    }
    getCurrentFunctionTextArea(){
        return this.element.getPart("activeFunction");
    }
    getThoughOutputArea(){
        return this.element.getPart("thoughtTextArea");
    }
    getTargetFunctionArea(){
        return this.element.getPart("output");
    }
    getStatsOutputArea(){
        return this.element.getPart("textContainer");
    }
    getHintButton(){
        return this.element.getPart("hint");
    }
    getBackButton(){
        return this.element.getPart("backButton");
    }
}