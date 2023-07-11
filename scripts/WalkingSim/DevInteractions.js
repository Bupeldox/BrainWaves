import TemplatedHtml from "../TemplatedHtml";
import { MessageInteractable } from "./Interactables/MessageInteractable";
import { worldRawData } from "./WorldData";

const devInteractionCodes = {
    Export: 1,
    MoveToggle: 2,
    Create: 3,
    EditMessages: 4
};

(function () {
    var hs = "";
    for (var i in devInteractionCodes) {
        hs += "<option value='" + devInteractionCodes[i] + "'>";
        hs += devInteractionCodes[i] + ": " + i;
        hs += "</option>"
    }
    document.getElementById("devTask").innerHTML = hs;


    document.addEventListener("keydown", (e) => {

        var numbers = "0123456789".split("");
        if (numbers.includes(e.key)) {
            document.getElementById("devTask").value = e.key;
        }
    })

})();

class dealWithSavingStuff{
    constructor(){

    }
    
    getById(streetId,id){
        var item = worldRawData.streets.find(i=>i.id == streetId).interactablesList.find(i=>i.basicDat.id==id);
        return item;
    }
    updateItem(street,itemDat){
        //get by id
        //if it doesn't exist add it
        //else replace it3
        var item = this.getById(street,itemDat.basicDat.id);
        item = itemDat;
        //save the streetDat
        this.saveStreetDat();
    }
    saveStreetDat(){

        fetch("http://localhost:3000/", {
            method: "POST",
            body: JSON.stringify(worldRawData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });


    }
}

class DevInteractions {

    constructor() {
        this.saver = new dealWithSavingStuff();
        this.isMoving = false;
        this.movingInteractable = null;
        this.onlyOneCounter = 0;
    }

    setup(world) {
        this.world = world;
    }

    onDevInteraction(interactable) {
        if (!(new URLSearchParams(window.location.search)).get("dev")) {
            return;
        }

        var code = +document.getElementById("devTask").value;
        var inAccessible = !(interactable.isInRange && !interactable.deactivated);

        var onlyOne = (f) => {
            if (this.onlyOneCounter == 0) {
                this.onlyOneCounter++;
                f();
            }
        };
        var onInteractable = (f)=>{
            if (inAccessible) { return; }
            f();
        }

        switch (code) {
            case devInteractionCodes.Export:
                onInteractable(()=>{this.showJson(interactable)});
                break;
            case devInteractionCodes.MoveToggle:
                onInteractable(()=>{this.toggleMoving(interactable)});

                break;
            case devInteractionCodes.Create:
                onlyOne(() => { this.createInteractable() });
                break;
            case devInteractionCodes.EditMessages:
                if(interactable?.hasOwnProperty("messages")){
                    onInteractable(() => { this.showMessageEditUserInterface(interactable);})
                }
                break;
            default:
                break;
        }
    }
    toggleMoving(interactable) {
        this.isMoving = !this.isMoving;

        if (this.isMoving) {
            this.movingInteractable = interactable;
        } else {
            //get thign out
            //change pos
            //save

            var item = this.saver.getById(this.world.state.streetId,this.movingInteractable.goData.id);
            
            item.basicDat.pos.x = this.movingInteractable.pos.x;
            item.basicDat.pos.y = this.movingInteractable.pos.y;

            this.saver.updateItem(this.world.state.streetId,item);
            
            this.movingInteractable = null; 
        }
    }

    update(player) {
        this.onlyOneCounter = 0;
        this.player = player;
        if (this.isMoving && this.movingInteractable) {
            this.movingInteractable.updatePos(this.player.pos);
        }
    }

    createInteractable() {
        var playerPos = this.player.pos.clone();
        var dat = () => new MessageInteractable(
            {
                id: "idkDoesItEvenNeedAnId?"+Math.random(),
                icon: "🆕",
                pos: playerPos.round(),
            }
            , [
                "The text",
                "goes here"
            ]
        );
        var obj = this.world.currentStreet.addInteractable(dat);
        this.saver.updateItem(this.world.state.streetId,obj);
        this.showJson(obj);
    }

    showJson(interactable) {
        //Actually export wow

        if (!interactable instanceof MessageInteractable) {
            document.getElementById("messageObjectOutputJson").textContent = "Can't export";
            return;
        }

        var obj = {
            goData: interactable.goData,
            messages: interactable.messages
        };
        document.getElementById("messageObjectOutputJson").textContent = JSON.stringify(obj);

    }
    showMessageEditUserInterface(i) {
        new EditMessagesUserInterface(i, document.getElementById("devshit"), () => { this.showJson(i) });
    }

}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

class EditMessagesUserInterface {

    constructor(messageInteractable, htmlParent, onSave) {
        this.onSave = onSave;
        this.messageInteractable = messageInteractable;
        this.element = new TemplatedHtml("devMessageEdit", htmlParent);
        
        messageInteractable.messages.forEach(i=>{
            this.getNewRowElement(i);

        });
        this.element.getPart("showIcon").textContent = messageInteractable.goData.id;
        this.element.getPart("btn-submit").addEventListener("click", () => { this.onSubmit(); });
        this.element.getPart("btn-close").addEventListener("click", () => { this.destroy(); });
    }
    getNewRowElement(text) {
        var newInputElement = new TemplatedHtml("devMessageEditRow");
        newInputElement.getPart("text").value = text??"";
        newInputElement.getPart("btn-add").addEventListener("click", (e) => { this.addMessage(e) });
        newInputElement.getPart("btn-remove").addEventListener("click", (e) => { this.removeMessage(e) });
        this.element.getPart("messages").appendChild(newInputElement.element);
        return newInputElement;
    }
    addMessage(e) {
        var newInputElement = this.getNewRowElement();
        var caller = e.target.closest(".devMessageEditRow");
        insertAfter(caller, newInputElement.element);
    }

    removeMessage(e) {
        if (newInputElement.querySelectorAll(".devMessageEditRow").length == 1) {
            return;
        }
        var caller = e.target.closest(".devMessageEditRow");
        caller.remove();
    }
    getMessageData() {
        var messages = [...this.element.getPart("messages").children].map(i => i.getElementsByTagName("input")[0].value);
        return messages;
    }
    onSubmit() {
        var messages = this.getMessageData();
        this.messageInteractable.messages = messages;
        this.messageInteractable.state.messageIndex = 0;
        this.onSave();
        this.destroy();
    }

    destroy() {
        this.element.element.remove();
    }
}




//singleton thing, i cba to do this properly. its dev shit anyway.
export const devInteractions = new DevInteractions();