import { MessageInteractable } from "./Interactables/MessageInteractable";

const devInteractionCodes = {
    Export:1,
    MoveToggle:2,
};
(function(){
    var hs = "";
    for(var i in devInteractionCodes){
        hs+="<option value='"+devInteractionCodes[i]+"'>";
        hs+=devInteractionCodes[i]+": "+i;
        hs+="</option>"
    }
    document.getElementById("devTask").innerHTML = hs;


    document.addEventListener("keydown",(e)=>{

        var numbers = "0123456789".split("");
        if(numbers.includes(e.key)){
            document.getElementById("devTask").value = e.key;
        }
    })

})();



class DevInteractions {

    constructor() {
        this.isMoving = false;
        this.movingInteractable = null;
        this.onlyOneCounter = 0;
    }

    setup(world){
        this.world = world;
    }

    onDevInteraction(interactable) {
        if(!(new URLSearchParams(window.location.search)).get("dev")){
            return;
        }

        var code = +document.getElementById("devTask").value;
        var inAccessible = !(interactable.isInRange && !interactable.deactivated);
        switch (code) {
            case devInteractionCodes.Export:
                if(inAccessible){return;}
                this.showJson(interactable);
            break;
            case devInteractionCodes.MoveToggle:
                if(inAccessible){return;}
                
                this.isMoving = !this.isMoving;
                
                if(this.isMoving){
                    this.movingInteractable = interactable;
                }else{
                    this.movingInteractable = null;
                }
            break;
            case devInteractionCodes.Create:
                if(this.this.onlyOneCounter == 0){
                    this.this.onlyOneCounter++;
                    this.createInteractable();
                }
            break;
            default:
                break;
        }
    }   
    update(player){
        this.onlyOneCounter = 0;
        this.player = player;
        if(this.isMoving && this.movingInteractable){
            this.movingInteractable.updatePos(this.player.pos);
        }
    }
    
    createInteractable(){
        var playerPos = this.player.pos.clone();
        var dat = () => new MessageInteractable(
            {
                id: "idkDoesItEvenNeedAnId?",
                icon: "🆕",
                pos: playerPos,
            }
            ,[
                "The text",
                "goes here"
            ]
        );
        this.world.currentStreet.addInteractable(dat);
    }

    showJson(interactable) {
        //Actually export wow
        
        if (!interactable instanceof  MessageInteractable){
            document.getElementById("messageObjectOutputJson").textContent = "Can't export";
            return;
        }

        var obj = {
            goData: interactable.goData,
            messages: interactable.messages
        };
        document.getElementById("messageObjectOutputJson").textContent = JSON.stringify(obj);

    }

}





export const devInteractions = new DevInteractions();