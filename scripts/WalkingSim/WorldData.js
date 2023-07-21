

import worldJson from "./WorldData.json";

export var worldRawData = worldJson; 

//  const tempDisabletstreetData = {
//     street1: {
//         interactablesList: [
//             () => new MessageInteractable(
//                 {
//                     id: "grass1",
//                     icon: "🌿",
//                     pos: new Vec2(100, -70)
//                 }
//                 , [
//                     "wow some Poa annua along with other species of grass!",
//                     "Dayum, what a specimen"
//                 ]
//             ),
//             () => new ChangingIconInteractable(
//                 {
//                     id: "pumpkin1",
//                     icon: "🎃",
//                     pos: new Vec2(200, -30),
//                 }
//                 , [
//                     { icon: "🎃", message: "It's not even Halloween..." },
//                     { icon: "🥣", message: "Thats Better :)" },
//                 ]
//             ),
//             () => new ChangingIconInteractable(
//                 {
//                     id: "postbox1",
//                     icon: "📫",
//                     instructionsElement: "Open",
//                     pos: new Vec2(50, -20),
//                 }
//                 , [
//                     { icon: "📫", message: "omg its a letter from Poaceae Weekly!" },
//                     { icon: "📪", message: "Poaceae Weekly - U got a sample of Poa annua this week! 🥬" },
//                 ]
//             )
//         ],
//         junctions: [{
//             street: "street2",
//             pos: { x: 150, y: -10 },
//             backwards: true,
//         },
//         {
//             street: "imgStreet3",
//             pos: { x: 0, y: -20 },
//             backwards: false,
//         }
//         ]
//     },
//     street2: {
//         interactablesList: [
//             () => new MessageInteractable(
//                 {
//                     id: "grass2",
//                     icon: "🥗",
//                     element: "someGrass",
//                     pos: new Vec2(50, -30)
//                 },
//                 ["wow some more Poa annua along with other species of grass!"]
//             ),
//             () => new ThoughtInteractable(
//                 {
//                     id: "dude1",
//                     icon: "🧜‍♀️",
//                     pos: new Vec2(100, -70)
//                 }
//                 , [
//                     "WTF! How did i get here?!?!? What are these buildings, where r ur fins?! II NEEED WAAATTTEERRRRRRRR",
//                     "*Dies of lack of water*"
//                 ],
//                 {
//                     thought: "I hope my family knows I love them.",
//                     target: [8]
//                 }
//             ),
//             () => new ThoughtInteractable(
//                 {
//                     id: "dude2",
//                     icon: "🤷‍♂️",
//                     pos: new Vec2(140, -40)
//                 }
//                 , [
//                     "Where did that fish come from",
//                     "Oh no it needs water?!"
//                 ],
//                 {
//                     thought: "Do I have any buckets I could use? idk it seems kinda small, what would i even do, just shove it's head in the bucket or something? idk where it's gills are",
//                     target: [11, 3]
//                 }
//             ),
//         ],
//         junctions: [{
//             street: "street1",
//             pos: { x: 10, y: -50 },
//             backwards: false,
//         },
//         {
//             street: "street3",
//             pos: { x: 200, y: -70 },
//             backwards: false,
//         }
//         ]
//     },
//     street3: {
//         interactablesList: [
//             () => new DoStuffInteractable(
//                 {
//                     id: "Monkeh1",
//                     icon: "🐒",
//                     element: "someGrass",
//                     pos: new Vec2(110, -20)
//                 },
//                 ["It Stole my phone!!"],
//                 (that, state) => {
//                     switch (state.messageIndex) {
//                         case 1:
//                             that.element.element.classList.add("runOff");
//                             that.deactivate();
//                             break;
//                     }
//                 }
//             ),

//             () => new ThoughtInteractable(
//                 {
//                     id: "dude3",
//                     icon: "🙅‍♂️",
//                     pos: new Vec2(30, -40)
//                 }
//                 , [
//                     "*He's looking around franticly*",
//                     "*He checks his pockets*",
//                     "*He doesn't look comfortable in the slightest*",
//                 ],
//                 {
//                     thought: "I REALLY need the toilet, and that frigin monkey took my phone so I can't even check where one is!",
//                     target: [8, 11, 3]
//                 }
//             ),
//         ],
//         junctions: [

//             {
//                 street: "street2",
//                 pos: { x: 150, y: -70 },
//                 backwards: true,
//             },

//             {
//                 street: "street4",
//                 pos: { x: 350, y: -30 },
//                 backwards: true,
//             }
//         ]
//     },
//     street4: {
//         interactablesList: [


//             () => new ThoughtInteractable(
//                 {
//                     id: "dude4",
//                     icon: "💇‍♂️",
//                     pos: new Vec2(30, -40)
//                 }
//                 , [
//                     "awdawdawd",
//                     "oranges    ",
//                     "Im having a stroke",
//                 ],
//                 {
//                     thought: "The credits of the dreamworks movies are weird",
//                     target: [3, 11, 8, 5]
//                 }
//             ),
//         ],
//         junctions: [

//             {
//                 street: "street3",
//                 pos: { x: 150, y: -70 },
//                 backwards: false,
//             }
//         ]
//     },
//     imgStreet1: {
//         backgroundImage: {
//             name: "street1.png",
//             height: 150
//         },
//         interactablesList: [
//             () => new MessageInteractable(
//                 {
//                     id: "StatueFront",
//                     img: "sign.svg",
//                     pos: new Vec2({ "x": 207, "y": -97 })
//                 }
//                 , [
//                     "A honce!",
//                     "I love this statue"
//                 ]
//             )
//         ],
//         junctions: [{
//             street: "imgStreet2",
//             pos: { x: 99, y: -102 },
//             backwards: true,
//             angle: (60 + 180),
//         }, {
//             street: "imgStreet3",
//             pos: { x: 343, y: -102 },
//             backwards: false,
//             angle: 60 + 180,
//         },]

//     },
//     imgStreet2: {
//         backgroundImage: {
//             name: "street2.png",
//             height: 150
//         },
//         interactablesList: [
//             () => new MessageInteractable(
//                 {
//                     id: "StatueBack",
//                     img: "sign.svg",
//                     pos: new Vec2({ "x": 381, "y": -103 })
//                 }
//                 , [
//                     "Such a bean",
//                     "I love this statue"
//                 ]
//             )
//         ],
//         junctions: [{
//             street: "imgStreet3",
//             pos: { x: 274, y: -103 },
//             backwards: true,
//             angle: 60 + 180,
//         }, {
//             street: "imgStreet1",
//             pos: { x: 500, y: -103 },
//             backwards: false,
//             angle: 60 + 180,
//         }]

//     },
//     imgStreet3: {
//         backgroundImage: {
//             name: "street3.png",
//             height: 150
//         },
//         interactablesList: [
//             () => new MessageInteractable(
//                 {
//                     id: "StatueProfile",
//                     img: "sign.svg",
//                     pos: new Vec2({ "x": 463, "y": -97 })
//                 }
//                 , [
//                     "A Honce!",
//                     "What a magnificent statue!",
//                     "I love this statue :)",
//                 ]
//             )
//         ],
//         junctions: [{
//             street: "street1",
//             pos: { x: 144, y: -103 },
//             backwards: true,
//         }, {
//             street: "imgStreet1",
//             pos: { x: 375, y: -105 },
//             backwards: true,
//             angle: 60 + 180,
//         }, {
//             street: "imgStreet2",
//             pos: { x: 590, y: -105 },
//             backwards: false,
//             angle: 60 + 180,
//         }]

//     },
// };

import { ChangingIconInteractable } from "./Interactables/ChangingIconInteractable";
import { DoStuffInteractable } from "./Interactables/DoStuffInteractable";
import { MessageInteractable } from "./Interactables/MessageInteractable";
import { ThoughtInteractable } from "./Interactables/ThoughInteractable";
import { JunctionInteractable } from "./Interactables/JunctionInteractable";

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
            case "Junction":
                return (...a) => new JunctionInteractable(this.changeStreetFunction,...a);
            default:
                break;
        }
    }
    setChangeStreetFunction(f){
        this.changeStreetFunction =f;
    }
}


const interactableFactory = new InteractableFactory();

export const interactablesFunctions = {
    runOff: (that, state) => {
        switch (state.messageIndex) {
            case 1:
                that.element.element.classList.add("runOff");
                that.deactivate();
                break;
        }
    }
};





// function turnStreetDataIntoALoadOfFunction(csf) {

//     interactableFactory.setChangeStreetFunction(csf);

//     var streets = {};
    
//     for (var i = 0; i < worldJson.streets.length; i++) {
//         var streetData = worldJson.streets[i];
//         var interactables = streetData.interactablesList.map(i => interactableFactory.createCretorFunc(i));
        
//         var streetOutput = {
//             interactablesList: interactables,
//             backgroundImage:streetData.backgroundImage,
//         };
//         streets[streetData.id]=streetOutput;
//     }
//     return streets;
// }

export class WorldDataHandler {
    constructor(changeStreetFunction){
        interactableFactory.setChangeStreetFunction(changeStreetFunction);
    }

    getStreetData(id){
        return worldJson.streets.find(i=>i.id == id);
    }

    getStreetConstructData(id){

        var streetData = this.getStreetData(id);
        var interactables = streetData.interactablesList.map(i => interactableFactory.createCretorFunc(i));
        
        var streetOutput = {
            interactablesList: interactables,
            backgroundImage:streetData.backgroundImage,
        };
        return streetOutput;
    }
}



