import TemplatedHtml from "../TemplatedHtml";
import { DirectionalInputManager } from "./DirectionalInputManager";
import { EventRegister } from "../EventRegister";




export default class ControlsHandler{
    constructor(guiContainer){
        this.guiContainer = new TemplatedHtml("gui-container",guiContainer);
        this.directionInput = new DirectionalInputManager(this.guiContainer.element);
        this.interactionInput = new InteractionInputManager(this.guiContainer.element);
        this.directionInput.onButtonPress = ()=>{this.interactionInput.onInteractExit()};
        window.thoughtReadButton = this.guiContainer.getPart("btn-r");//this is disgusting pls change. It's used on the thoughtReadInteractable
    }
    pause(){
        this.directionInput.isPaused = true;
        this.interactionInput.isPaused = true;
        this.guiContainer.element.classList.add("hidden");
    }
    resume(){
        this.guiContainer.element.classList.remove("hidden");
        this.directionInput.isPaused = false;
        this.interactionInput.isPaused = false;
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
        document.getElementById("startButton").addEventListener("click",()=>{
            document.getElementById("startButton")?.remove();
        })
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
        if(this.isPaused){
            return;
        }
        this.interactEventRegister.onEvent(p);
    }

    onMindRead(p){
        if(this.isPaused){
            return;
        }
        this.mindReadEventRegister.onEvent(p);
    }

    onInteractExit(p){
        document.getElementById("startButton")?.remove();
        if(this.isPaused){
            return;
        }
        this.interactionExitEventRegister.onEvent(p);
    }
}


