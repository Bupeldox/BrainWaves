
import Vec2 from "../Vec2";
import { CallbackInteractable } from "./Interactables/CallbackInteractable";
import { ChangingIconInteractable } from "./Interactables/ChangingIconInteractable";
import { DoStuffInteractable } from "./Interactables/DoStuffInteractable";
import { MessageInteractable } from "./Interactables/MessageInteractable";
import { ThoughtInteractable } from "./Interactables/ThoughInteractable";


export const tstreetData = {
    street1: {
        interactablesList: [
            () => new MessageInteractable(
                {
                    id: "grass1",
                    icon: "🌿",
                    pos: new Vec2(100, -70)
                }
                ,[
                    "wow some Poa annua along with other species of grass!",
                    "Dayum, what a specimen"
                ]
            ),
            () => new ChangingIconInteractable(
                {
                    id: "pumpkin1",
                    icon: "🎃",
                    pos: new Vec2(200, -30),
                }
                ,[
                    { icon: "🎃", message: "It's not even Halloween..." },
                    { icon: "🥣", message: "Thats Better :)" },
                ]
            ),
            ()=> new ChangingIconInteractable(
                {
                    id:"postbox1",
                    icon:"📫",
                    instructionsElement: "Open",
                    pos: new Vec2(50, -20),
                }
                ,[
                    { icon: "📫", message: "omg its a letter from Poaceae Weekly! Poaceae Weekly - U got a sample of Poa annua this week! 🥬" },
                    { icon: "📪",  message: "Poaceae Weekly - U got a sample of Poa annua this week! 🥬" },
                ]
            )
        ],
        junctions: [{
            street: "street2",
            pos: { x: 150, y: -10 },
            backwards: true,
        }]
    },
    street2: {
        interactablesList: [
            () => new MessageInteractable(
                {
                    id: "grass2",
                    icon: "🥗",
                    element: "someGrass",
                    pos: new Vec2(50, -30)
                },
                ["wow some more Poa annua along with other species of grass!"]
            ),
            ()=> new DoStuffInteractable(
                {
                    id: "Monkeh1",
                    icon: "🐒",
                    element: "someGrass",
                    pos: new Vec2(100, -70)
                },
                ["It Stole my phone!!"],
                (that,state)=>{
                    switch (state.messageIndex){
                        case 1:
                            that.element.element.classList.add("runOff");
                            that.deactivate();
                            break;
                    }
                }
                
            )
            /*
            {
                icon: "🐒",
                element: "someGrass",
                pos: new Vec2(120, -20),
                onInteract: interactablesFunctions.showMessage(
                    "It stole my phone",
                    (elem, interactable) => {
                        elem.element.classList.add("runOff");
                    },
                    true
                )
            },
            {
                icon: "👨‍🦳",
                element: "someGrass",
                pos: new Vec2(150, -30),
                onInteract: interactablesFunctions.showMessage("My body disapeared 2 years ago. I've been stuck here ever since.", (l, interactable) => {
                    interactable.setInteraction(interactablesFunctions.showMessage("Luckily I dont need to eat any more", (l, interactable) => {
                        interactable.setInteraction(interactablesFunctions.showMessage("The kids play football with me", (l, interactable) => {
                            interactable.setInteraction(interactablesFunctions.showMessage("I dont have any achey joints though", (l, interactable) => {
                                interactable.setInteraction(interactablesFunctions.showMessage("other than my jaw.", (l, i) => { i.deactivate() }));
                            }));
                        }));
                    }));
                })
            }*/

        ],
        junctions: [{
            street: "street1",
            pos: { x: 10, y: -50 },
            backwards: false,
        },
        {
            street: "street3",
            pos: { x: 200, y: -70 },
            backwards: false,
        }
        ]
    },
    street3: {
        interactablesList: [
            /*{
                icon: "🥗",
                element: "someGrass",
                pos: new Vec2(50, -20),
                onInteract: interactablesFunctions.showMessage("Wow some more grass")
            },
            {
                icon: "🐒",
                element: "someGrass",
                pos: new Vec2(120, -20),
                onInteract: interactablesFunctions.showMessage(
                    "It stole my hat!",
                    (elem, interactable) => {
                        elem.element.classList.add("runOff");
                    },
                    true
                )
            }*/
        ],
        junctions: [

            {
                street: "street2",
                pos: { x: 150, y: -70 },
                backwards: true,
            }
        ]
    }
};
