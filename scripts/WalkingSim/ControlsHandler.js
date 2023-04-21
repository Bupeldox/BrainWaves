import TemplatedHtml from "../TemplatedHtml";
import { DirectionalInputManager } from "./DirectionalInputManager";




export default class ControlsHandler{
    constructor(guiContainer){
        this.guiContainer = new TemplatedHtml("gui-container",guiContainer);
        this.directionInput = new DirectionalInputManager(this.guiContainer.element);
        this.interactionInput = new InteractionInputManager(this.guiContainer.element);
        this.directionInput.onButtonPress = ()=>{this.interactionInput.onInteractExit()};
    }
}


class InteractionInputManager{
    constructor(guiContainer){
        this.guiElement = new TemplatedHtml("mobile-interaction",guiContainer);
        
        this.interactEventRegister = new EventRegister();
        this.mindReadEventRegister = new EventRegister();
        this.interactionExitEventRegister = new EventRegister();

        this.setupButtonEvents();
    }

    setupButtonEvents(){
        this.guiElement.getPart("btn-e").addEventListener("click",(e)=>{
            this.onInteractExit(e);
            this.onInteract(e);
        })
        this.guiElement.getPart("btn-r").addEventListener("click",(e)=>{
            this.onInteractExit(e);
            this.onMindRead(e);
        });

        document.addEventListener("keydown",(e)=>{
            this.onInteractExit(e);

            switch(e.key){
                case "e":
                    this.onInteract(e);
                    break;
                case "r":
                    this.onMindRead(e);     
                    break;
            }
        })
    }


    onInteract(p){
        this.interactEventRegister.onEvent(p);
    }
    onMindRead(p){
        this.mindReadEventRegister.onEvent(p);
    }
    onInteractExit(p){
        this.interactionExitEventRegister.onEvent(p);
    }

    
    registerOnInteract(f){
        var id = this.interactEventRegister.registerFunc(f);
        return ()=>{this.unregisterInteractionEvent(id)}
    }
    registerOnMindRead(f){
        var id = this.mindReadEventRegister.registerFunc(f);
        return ()=>{this.unregisterMindReadEvent(id)};
    }
    registerOnInteractExit(f){
        var id = this.interactionExitEventRegister.registerFunc(f);
        return ()=>{this.unregisterInteractionEvent(id)}
    }

    unregisterInteractionEvent(id){
        this.interactEventRegister.unRegister(id);
    }
    unregisterMindReadEvent(id){
        this.mindReadEventRegister.unRegister(id);
    }
    unregisterInteractionExitEvent(){
        this.interactionExitEventRegister.unRegister(id);
    }
}


class EventRegister{
    constructor(){
        this.registeredFuncs = [];
    }

    onEvent(e){
        this.registeredFuncs.forEach(i=>{i.func(e)});
    }
    registerFunc(func){
        var id = Math.random();

        this.registeredFuncs.push({id:id,func:func});
        return id;
    }
    unRegister(id){
        var index = this.registeredFuncs.findIndex(i=>i.id == id);
        if(index!=-1){

        }
        this.registeredFuncs.splice(index,1);
    }

}