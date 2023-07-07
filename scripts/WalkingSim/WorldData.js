
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
        },
        {
            street: "imgStreet3",
            pos: { x: 0, y: -20 },
            backwards: false,
        }
    ]
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
            },
            
            {
                street: "street4",
                pos: { x: 350, y: -30 },
                backwards: true,
            }
        ]
    },
    street4: {
        interactablesList: [
            
            
            () => new ThoughtInteractable(
                {
                    id: "dude4",
                    icon: "💇‍♂️",
                    pos: new Vec2(30, -40)
                }
                ,[
                    "awdawdawd",
                    "oranges    ",
                    "Im having a stroke",
                ],
                {
                    thought:"The credits of the dreamworks movies are weird",
                    target:[3,11,8,5]
                }
            ),
        ],
        junctions: [

            {
                street: "street3",
                pos: { x: 150, y: -70 },
                backwards: false,
            }
        ]
    },
    imgStreet1:{
        backgroundImage:{
            name:"street1.png",
            height:150
        },
        interactablesList: [
            () => new MessageInteractable(
                {
                    id: "StatueFront",
                    img: "sign.svg",
                    pos: new Vec2({"x":207,"y":-97})
                }
                ,[
                    "A honce!",
                    "I love this statue"
                ]
            )
        ],
        junctions: [{
            street: "imgStreet2",
            pos: { x: 99, y: -102 },
            backwards: true,
            angle:(60+180),
        },{
            street: "imgStreet3",
            pos: { x: 343, y: -102 },
            backwards: false,
            angle:60+180,
        },]

    },
    imgStreet2:{
        backgroundImage:{
            name:"street2.png",
            height:150
        },
        interactablesList: [
            () => new MessageInteractable(
                {
                    id: "StatueBack",
                    img: "sign.svg",
                    pos: new Vec2({"x":381,"y":-103})
                }
                ,[
                    "Such a bean",
                    "I love this statue"
                ]
            )
        ],
        junctions: [{
            street: "imgStreet3",
            pos: { x: 274, y: -103 },
            backwards: true,
            angle:60+180,
        },{
            street: "imgStreet1",
            pos: { x: 500, y: -103 },
            backwards: false,
            angle:60+180,
        }]

    },
    imgStreet3:{
        backgroundImage:{
            name:"street3.png",
            height:150
        },
        interactablesList: [
            () => new MessageInteractable(
                {
                    id: "StatueProfile",
                    img: "sign.svg",
                    pos: new Vec2({"x":463,"y":-97})
                }
                ,[
                    "A Honce!",
                    "What a magnificent statue!",
                    "I love this statue :)",
                ],
            ),
            ()=>new MessageInteractable({"goData":{"id":"esrgsergt","icon":"🏠","pos":{"x":222.3000000000005,"y":-101.19999999999999}},"messages":["This looks like a house","There is stuff inside","It looks like there was a party last night","pizza boxes on the floor, drinks on the ceiling","Dead bodies in the cupboards","Looked like fun, shame i couldn't be there."]}),
            ()=>new ThoughtInteractable(
                {"id":"Sculpterwefwf","icon":"👩‍🎨","pos":{"x":408.29999999999916,"y":-97.79999999999995}},
                ["This is my masterpiece","Just installed last week, I'm checking up on it","Beautiful isn't it, the way it catches the light at at different times is captivating","The emotions of it change with the weather."," I couldn't have comprehended it before it was unveiled. I'm so glad it is out in the open."],
                {
                    thought:"This scrub knows Nothing of art, the paint and suffering that went into every stroke of the wax mold that was lost to create this. Pitiful.",
                    target:[8,3]
                }
            )
        ],
        junctions: [{
            street: "street1",
            pos: { x: 144, y: -103 },
            backwards: true,
        },{
            street: "imgStreet1",
            pos: { x: 375, y: -105 },
            backwards: true,
            angle:60+180,
        },{
            street: "imgStreet2",
            pos: { x: 590, y: -105 },
            backwards: false,
            angle:60+180,
        }]

    },
};
