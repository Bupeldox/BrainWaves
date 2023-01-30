
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
                    { icon: "📫", message: "omg its a letter from Poaceae Weekly!" },
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
            () => new ThoughtInteractable(
                {
                    id: "dude1",
                    icon: "🧜‍♀️",
                    pos: new Vec2(100, -70)
                }
                ,[
                    "WTF! How did i get here?!?!? What are these buildings, where r ur fins?! II NEEED WAAATTTEERRRRRRRR",
                    "*Dies of lack of water*"
                ],
                {
                    thought:"I hope my family knows I love them.",
                    target:[8]
                }
            ),
            () => new ThoughtInteractable(
                {
                    id: "dude2",
                    icon: "🤷‍♂️",
                    pos: new Vec2(140, -40)
                }
                ,[
                    "Where did that fish come from",
                    "Oh no it needs water?!"
                ],
                {
                    thought:"Do I have any buckets I could use? idk it seems kinda small, what would i even do, just shove it's head in the bucket or something? idk where it's gills are",
                    target:[11,3]
                }
            ),
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
            ()=> new DoStuffInteractable(
                {
                    id: "Monkeh1",
                    icon: "🐒",
                    element: "someGrass",
                    pos: new Vec2(110, -20)
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
            ),
            
            () => new ThoughtInteractable(
                {
                    id: "dude3",
                    icon: "🙅‍♂️",
                    pos: new Vec2(30, -40)
                }
                ,[
                    "*He's looking around franticly*",
                    "*He checks his pockets*",
                    "*He doesn't look comfortable in the slightest*",
                ],
                {
                    thought:"I REALLY need the toilet, and that frigin monkey took my phone so I can't even check where one is!",
                    target:[8,11,3]
                }
            ),
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
