import TemplatedHtml from "../TemplatedHtml";
import Vec2 from "../Vec2";

const interactablesFunctions = {
    showMessage: (text, then, once = false) => {
        return (interactableElement, interactable) => {
            var messageElement = new TemplatedHtml(
                "post",
                document.getElementById("root")
            );
            messageElement.element.textContent = text;
            document.body.addEventListener(
                "keydown",
                () => {
                    messageElement.element.remove();
                    if (then) {
                        then(interactableElement, interactable);
                    }
                }, {
                    once: true
                }
            );
            if (once) {
                interactable.deactivate();
            }
        };
    },
    showElement: (element, then) => {
        return (interactableElement, interactable) => {
            var messageElement = new TemplatedHtml(
                element,
                document.getElementById("root")
            );
            document.body.addEventListener(
                "keydown",
                () => {
                    messageElement.element.remove();
                    if (then) {
                        then(interactableElement, interactable);
                    }
                }, {
                    once: true
                }
            );
        };
    }
};


export const tstreetData = {
    street1: {
        interactablesList: [{
                element: "interactableTest",
                instructionsElement: "Open",
                pos: new Vec2(50, -20),
                onInteract: interactablesFunctions.showElement("post", (elem) => {
                    elem.updateText("📪", "icon");
                })
            },
            {
                icon: "🌿",
                element: "someGrass",
                pos: new Vec2(150, -60),
                onInteract: interactablesFunctions.showMessage(
                    "wow some Poa annua along with other species of grass!"
                )
            },
            {
                icon: "🎃",
                element: "someGrass",
                pos: new Vec2(200, -30),
                onInteract: interactablesFunctions.showMessage(
                    "It's not even Halloween...",
                    (elem, interactable) => {
                        elem.updateText("🥣", "icon");
                        interactable.onInteract = interactablesFunctions.showMessage(
                            "That's better"
                        );
                    }
                )
            }
        ],
        junctions: [{
            street: "street2",
            pos: { x: 150, y: -10 },
            backwards: true,
        }]
    },
    street2: {
        interactablesList: [{
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
            }

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
        interactablesList: [{
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
            }
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
