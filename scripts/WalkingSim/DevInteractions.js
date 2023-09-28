import TemplatedHtml from "../TemplatedHtml";

import { worldRawData } from "./WorldData";

import { ChangingIconInteractable } from "./Interactables/ChangingIconInteractable";
import { DoStuffInteractable } from "./Interactables/DoStuffInteractable";
import { MessageInteractable } from "./Interactables/MessageInteractable";
import { ThoughtInteractable } from "./Interactables/ThoughInteractable";

import { v } from "./UpdateWebpackFile";import { Exception } from "sass";
 console.log(v);

class InteractableFactory {
    constructor() {

    }
    createCretorFunc(data) {
        var classType = this.getTheInteractableClass(data.type);

        return () => { return (classType(data.basicDat, data.data)); };
        /*
            {
                basicDat:{
                    id,type,icon,pos,
                }
                data:{
                    messages
                    thought?
                }
            }
           
        */
        //returns a function
    }

    getTheInteractableClass(type) {
        switch (type) {
            case "MessageInteractable":
                return (...a) => new MessageInteractable(...a);
            case "ChangingIconInteractable":
                return (...a) => new ChangingIconInteractable(...a);
            case "ThoughtInteractable":
                return (...a) => new ThoughtInteractable(...a);
            case "DoStuffInteractable":
                return (...a) => new DoStuffInteractable(...a);
            default:
                break;
        }
    }
}


const interactableFactory = new InteractableFactory();

const devInteractionCodes = {
    EditJson: 1,
    MoveToggle: 2,
    EditMessages: 3,
    Restart: 5,
    Delete:8,
    Create: 9,
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

class dealWithSavingStuff {
    constructor() {

    }

    getById(streetId, id) {
        //var id = itemDat.basicDat.id;
        var item = worldRawData.streets
        .find(i => i.id == streetId).interactablesList
        .find(i => i.basicDat.id == id);

        return item;
    }
    updateItem(street, itemDat) {
        //get by id
        //if it doesn't exist add it
        //else replace it

        var streetIndex = worldRawData.streets.findIndex(i=>i.id==street);
        if(streetIndex<0){
            throw new Exception("Street not found"); 
        }
        var interactableIndex = worldRawData.streets[streetIndex].interactablesList.findIndex(i=>i.basicDat.id == itemDat.basicDat.id);
        if (interactableIndex<0) {
            if (itemDat.hasOwnProperty("basicDat")) {
                worldRawData.streets[streetIndex].interactablesList.push(itemDat);
            }else{
                throw new Exception("watch doin' fool");
            }
        } else {
            //use the ids instead of this
            worldRawData.streets[streetIndex].interactablesList[interactableIndex] = itemDat;
        }


        //save the streetDat
        this.saveStreetDat();
    }
    deleteItem(streetId,itemId){
        if(!this.getById(streetId,itemId)){
            throw new Exception("doesnt exist");
        }
        var streetIndex = worldRawData.streets.findIndex(i=>i.id==streetId);
        var interactableIndex = worldRawData.streets[streetIndex].interactablesList.findIndex(i=>i.basicDat.id == itemId);
        
        //use the ids instead of this
        worldRawData.streets[streetIndex].interactablesList.splice(interactableIndex,1);
        this.saveStreetDat();
    }
    saveStreetDat() {
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
        this.enabled = (new URLSearchParams(window.location.search)).get("dev");
    }

    setup(world) {
        this.world = world;
    }

    onDevInteraction(interactable) {

        if (!this.enabled) {
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
        var onInteractable = (f) => {
            if (inAccessible) { return; }
            f();
        }

        switch (code) {
            case devInteractionCodes.EditJson:
                onInteractable(() => { this.showJsonEditUserInterface(interactable);});
                break;
            case devInteractionCodes.MoveToggle:
                onInteractable(() => { this.toggleMoving(interactable) });

                break;
            case devInteractionCodes.Create:
                onlyOne(() => { this.createInteractable() });
                break;
            case devInteractionCodes.EditMessages:
                if (interactable?.hasOwnProperty("messages")) {
                    onInteractable(() => { 
                        this.showMessageEditUserInterface(interactable); 
                    })
                }
                break;
            case devInteractionCodes.Restart:
                onlyOne(() => {
                    this.sendRestartReq();
                });
            case devInteractionCodes.Delete:
                onInteractable(()=>{
                    this.deleteObj(interactable);
                });
                break;
            default:
                break;
        }
    }
    deleteObj(obj){
        this.saver.deleteItem(this.world.state.streetId,obj.goData.id);
        obj.destroy();
    }
    sendRestartReq() {

        fetch("http://localhost:3000/restart", {
            method: "POST",
            body: "",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

    }
    toggleMoving(interactable) {
        this.isMoving = !this.isMoving;

        if (this.isMoving) {
            this.movingInteractable = interactable;
        } else {
            //get thign out
            //change pos
            //save

            var item = this.saver.getById(this.world.state.streetId, this.movingInteractable.goData.id);

            item.basicDat.pos.x = this.movingInteractable.pos.x;
            item.basicDat.pos.y = this.movingInteractable.pos.y;

            this.saver.updateItem(this.world.state.streetId, item);

            this.movingInteractable = null;
        }
    }

    update(player) {
        if (!this.enabled) {
            return;
        }
        this.onlyOneCounter = 0;
        this.player = player;
        if (this.isMoving && this.movingInteractable) {
            this.movingInteractable.updatePos(this.player.pos);
        }
    }
    onStreetChange() {
        if (!this.enabled) {
            return;
        }
        this.sendRestartReq();
    }
    createInteractable() {
        var playerPos = this.player.pos.clone();
        var objDat = {
            "type": "MessageInteractable",
            "basicDat": {
                "id": Math.random(),
                "icon": "🆕",
                "pos": {
                    "x": playerPos.x,
                    "y": playerPos.y
                }
            },
            "data": {
                "messages": [
                    "new message"
                ]
            }

        };

        var dat = interactableFactory.createCretorFunc(objDat);
        var obj = this.world.currentStreet.addInteractable(dat);
        this.saver.updateItem(this.world.state.streetId, objDat);
    }

    showMessageEditUserInterface(i) {
        new EditMessagesUserInterface(i, document.getElementById("devshit"), () => { 
            var messageInteractableData = this.saver.getById(this.world.state.streetId, i.goData.id);
            messageInteractableData.data.messages = i.messages;
            this.saver.updateItem(this.world.state.streetId, messageInteractableData);
        });
    }
    showJsonEditUserInterface(i){
        new EditJsonUserInterface(
            this.saver.getById(this.world.state.streetId, i.goData.id),
            document.getElementById("devshit"),
            (dat)=>{
                debugger;
                this.saver.updateItem(this.world.state.streetId, dat);
            }
        );
    }

    updateToSavedData() {
        fetch("http://localhost:3000/restart", {
            method: "POST",
            body: "",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

class EditJsonUserInterface{
    constructor(dataToEdit, htmlParent, onSave) {
        this.onSave = onSave;
        this.dateToEdit = dataToEdit;
        this.element = new TemplatedHtml("devJsonEdit", htmlParent);

        var dataAsString = JSON.stringify(this.dateToEdit,undefined,4);
        this.element.getPart('jsonEditor').value = dataAsString;

        this.element.getPart("showIcon").textContent = dataToEdit.basicDat.icon;
        this.element.getPart("btn-submit").addEventListener("click", () => { this.onSubmit(); });
        this.element.getPart("btn-close").addEventListener("click", () => { this.destroy(); });
        this.element.getPart("jsonEditor").addEventListener("keydown",(e)=>{ e.stopPropagation(); })
    }
    onSubmit(){
        try{
            var data = JSON.parse(this.element.getPart("jsonEditor").value);
            this.onSave(data);
            this.destroy();
        }catch(ex){
            this.element.getPart("error").textContent = ex.toString();
        }
    }
    destroy(){
        this.element.element.remove();
    }
}
class EditMessagesUserInterface {

    constructor(messageInteractable, htmlParent, onSave) {
        this.onSave = onSave;
        this.messageInteractable = messageInteractable;
        this.element = new TemplatedHtml("devMessageEdit", htmlParent);

        messageInteractable.messages.forEach(i => {
            this.getNewRowElement(i);

        });
        this.element.getPart("showIcon").textContent = messageInteractable.goData.id;
        this.element.getPart("btn-submit").addEventListener("click", () => { this.onSubmit(); });
        this.element.getPart("btn-close").addEventListener("click", () => { this.destroy(); });
    }
    getNewRowElement(text) {
        var newInputElement = new TemplatedHtml("devMessageEditRow");
        newInputElement.getPart("text").value = text ?? "";
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