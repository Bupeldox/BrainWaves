/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/TemplatedHtml.js":
/*!**********************************!*\
  !*** ./scripts/TemplatedHtml.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TemplatedHtml)\n/* harmony export */ });\n\r\nclass TemplatedHtml {\r\n\tconstructor(templaceClass, addToThisElement) {\r\n\t\tthis.element = document\r\n\t\t\t.querySelector(\"#templates> .\" + templaceClass)\r\n\t\t\t.cloneNode(true);\r\n\t\tif (addToThisElement) {\r\n\t\t\tthis.appendInto(addToThisElement);\r\n\t\t}\r\n\t}\r\n\r\n\tappendInto(elem) {\r\n\t\tif (elem.hasOwnProperty(\"element\")) {\r\n\t\t\t//allow either TemplatedHtml or a dom element\r\n\t\t\telem = elem.element;\r\n\t\t}\r\n\t\telem.appendChild(this.element);\r\n\t}\r\n\r\n\tgetPart(part) {\r\n\t\treturn this.element.querySelector(\".\" + part);\r\n\t}\r\n\r\n\tupdateText(text,target) {\r\n\t\t//watch out, textcontent removes all the stuff in an element.\r\n\t\tif (!target) {\r\n\t\t\tthis.element.textContent = text;\r\n\t\t} else {\r\n\t\t\tthis.element.querySelector(\".\" + target).textContent = text;\r\n\t\t}\r\n\t}\r\n}\r\n\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/TemplatedHtml.js?");

/***/ }),

/***/ "./scripts/Vec2.js":
/*!*************************!*\
  !*** ./scripts/Vec2.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Vec2)\n/* harmony export */ });\nclass Vec2 {\r\n\t//My handy vec2 class ;)\r\n\tconstructor(x, y) {\r\n\t\tif (x.hasOwnProperty(\"x\") && y && y.hasOwnProperty(\"x\")) {\r\n\t\t\tvar out = y.sub(x);\r\n\t\t\tthis.x = out.x;\r\n\t\t\tthis.y = out.y;\r\n\t\t} else if (x.hasOwnProperty(\"x\")) {\r\n\t\t\tthis.x = x.x;\r\n\t\t\tthis.y = x.y;\r\n\t\t} else if (x.hasOwnProperty(\"length\")) {\r\n\t\t\tthis.x = x[0];\r\n\t\t\tthis.y = x[1];\r\n\t\t} else {\r\n\t\t\tthis.x = x;\r\n\t\t\tthis.y = y;\r\n\t\t}\r\n\t}\r\n\r\n\tdistance(vec) {\r\n\t\tvar delta = this.sub(vec);\r\n\t\treturn delta.magnitude();\r\n\t}\r\n\r\n\tadd(vec) {\r\n\t\treturn new Vec2(this.x + vec.x, this.y + vec.y);\r\n\t}\r\n\tsub(vec) {\r\n\t\treturn new Vec2(this.x - vec.x, this.y - vec.y);\r\n\t}\r\n\ttimes(factor) {\r\n\t\treturn new Vec2(this.x * factor, this.y * factor);\r\n\t}\r\n\tmagnitude() {\r\n\t\treturn Math.sqrt(this.x * this.x + this.y * this.y);\r\n\t}\r\n\tnormalised(length = 1) {\r\n\t\tvar out = this.times(length / this.magnitude());\r\n\r\n\t\treturn new Vec2(out.x, out.y);\r\n\t}\r\n\tdot(vec) {\r\n\t\treturn this.x * vec.x + this.y * vec.y;\r\n\t}\r\n\tangle(vec) {\r\n\t\tif (!vec) {\r\n\t\t\tvec = new Vec2(0, 1);\r\n\t\t}\r\n\r\n\t\tvar dp = vec.normalised().dot(this.normalised());\r\n\t\tvar ang = Math.acos(dp);\r\n\t\tif (vec.rotate(Math.PI / 2).dot(this) < 0) {\r\n\t\t\tang *= -1;\r\n\t\t}\r\n\t\treturn ang;\r\n\t}\r\n\r\n\tclone() {\r\n\t\treturn new Vec2(this.x, this.y);\r\n\t}\r\n\trotate(theta) {\r\n\t\tvar cos = Math.cos(theta);\r\n\t\tvar sin = Math.sin(theta);\r\n\t\tvar x = this.x * cos - this.y * sin;\r\n\t\tvar y = this.x * sin + this.y * cos;\r\n\t\treturn new Vec2(x, y);\r\n\t}\r\n\ttimesComponentwise(vec) {\r\n\t\treturn new Vec2(this.x * vec.x, this.y * vec.y);\r\n\t}\r\n}\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/Vec2.js?");

/***/ }),

/***/ "./scripts/WalkingSim/DirectionalInputManager.js":
/*!*******************************************************!*\
  !*** ./scripts/WalkingSim/DirectionalInputManager.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DirectionalInputManager\": () => (/* binding */ DirectionalInputManager)\n/* harmony export */ });\n/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Vec2 */ \"./scripts/Vec2.js\");\n\r\n\r\nclass DirectionalInputManager {\r\n    constructor() {\r\n        this.currentDirection = new _Vec2__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0);\r\n        this.keyMaps = {\r\n            ArrowLeft: new _Vec2__WEBPACK_IMPORTED_MODULE_0__[\"default\"](-1, 0),\r\n            ArrowRight: new _Vec2__WEBPACK_IMPORTED_MODULE_0__[\"default\"](1, 0),\r\n            ArrowUp: new _Vec2__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 1),\r\n            ArrowDown: new _Vec2__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, -1),\r\n            a: new _Vec2__WEBPACK_IMPORTED_MODULE_0__[\"default\"](-1, 0),\r\n            d: new _Vec2__WEBPACK_IMPORTED_MODULE_0__[\"default\"](1, 0),\r\n            w: new _Vec2__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 1),\r\n            s: new _Vec2__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, -1)\r\n        };\r\n        this.keysDown = [];\r\n        document.addEventListener(\"keydown\", (e) => {\r\n            this.onKeyDown(e.key);\r\n        });\r\n        document.addEventListener(\"keyup\", (e) => {\r\n            this.onKeyUp(e.key);\r\n        });\r\n    }\r\n    onKeyDown(key) {\r\n        if (!this.keysDown.includes(key)) {\r\n            this.keysDown.push(key);\r\n        }\r\n    }\r\n    onKeyUp(key) {\r\n        this.keysDown = this.keysDown.filter((i) => i != key);\r\n    }\r\n    getDirection() {\r\n        var vecTotal = new _Vec2__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0);\r\n        for (var i = 0; i < this.keysDown.length; i++) {\r\n            var key = this.keysDown[i];\r\n            if (!this.keyMaps.hasOwnProperty(key)) {\r\n                continue;\r\n            }\r\n            var keyvec = this.keyMaps[key];\r\n            vecTotal = vecTotal.add(keyvec);\r\n        }\r\n        return vecTotal.normalised();\r\n    }\r\n}\n\n//# sourceURL=webpack://brainwaves/./scripts/WalkingSim/DirectionalInputManager.js?");

/***/ }),

/***/ "./scripts/WalkingSim/Interactable.js":
/*!********************************************!*\
  !*** ./scripts/WalkingSim/Interactable.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Interactable\": () => (/* binding */ Interactable)\n/* harmony export */ });\n/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script */ \"./scripts/WalkingSim/script.js\");\n/* harmony import */ var _TemplatedHtml_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../TemplatedHtml.js */ \"./scripts/TemplatedHtml.js\");\n\r\n\r\n\r\nclass Interactable {\r\n    constructor(dat, parentElement) {\r\n        this.id = dat.id;\r\n        this.text = dat.text;\r\n        this.pos = dat.pos;\r\n\r\n        this.range = 20;\r\n        this.isInRange = false;\r\n        this.setInteraction(dat.onInteract);\r\n        this.element = new _TemplatedHtml_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](dat.element, parentElement);\r\n        this.instructionsElement = new _TemplatedHtml_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\r\n            \"instructions\",\r\n            this.element.element\r\n        );\r\n        if (dat.icon) {\r\n            this.element.getPart(\"icon\").textContent = dat.icon;\r\n        }\r\n        if (dat.interactText) {\r\n            this.instructionsElement.updateText(dat.interactText + \" - E\");\r\n        }\r\n        this.eventToRemove = (e) => { this.onEDown(e); };\r\n        document.addEventListener(\"keydown\", this.eventToRemove);\r\n    }\r\n    onEDown(e) {\r\n\r\n        if (e.key != \"e\") {\r\n            return;\r\n        }\r\n        if (!this.isInRange) {\r\n            return;\r\n        }\r\n        this.onInteract(this.element);\r\n        _script__WEBPACK_IMPORTED_MODULE_0__.persistanceManager.save(this.id, this);\r\n    }\r\n    updateText(text) {\r\n        this.text = text;\r\n    }\r\n    update() {}\r\n    draw() {\r\n        this.element.element.style.top = -this.pos.y + \"px\";\r\n        this.element.element.style.left = this.pos.x + \"px\";\r\n        if (this.isInRange) {\r\n            this.instructionsElement.element.classList.add(\"show\");\r\n        } else {\r\n            this.instructionsElement.element.classList.remove(\"show\");\r\n        }\r\n    }\r\n    destroy() {\r\n        document.removeEventListener(\"keydown\", this.eventToRemove);\r\n        this.range = 0;\r\n        this.element.element.remove();\r\n    }\r\n    deactivate() {\r\n        this.range = 0;\r\n    }\r\n    setInteraction(func) {\r\n        this.onInteract = (elem) => {\r\n            func(elem, this);\r\n        };\r\n    }\r\n}\n\n//# sourceURL=webpack://brainwaves/./scripts/WalkingSim/Interactable.js?");

/***/ }),

/***/ "./scripts/WalkingSim/InteractableHelper.js":
/*!**************************************************!*\
  !*** ./scripts/WalkingSim/InteractableHelper.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"InteractableHelper\": () => (/* binding */ InteractableHelper)\n/* harmony export */ });\nclass InteractableHelper {\r\n    constructor(player, interactable) {\r\n        this.player = player;\r\n        this.interactable = interactable;\r\n    }\r\n    update() {\r\n        if (this.player.pos.distance(this.interactable.pos) < this.interactable.range) {\r\n            this.interactable.isInRange = true;\r\n        } else {\r\n            this.interactable.isInRange = false;\r\n        }\r\n    }\r\n    draw() {}\r\n}\n\n//# sourceURL=webpack://brainwaves/./scripts/WalkingSim/InteractableHelper.js?");

/***/ }),

/***/ "./scripts/WalkingSim/PersistentInteractables.js":
/*!*******************************************************!*\
  !*** ./scripts/WalkingSim/PersistentInteractables.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PersistentInteractables)\n/* harmony export */ });\n/* harmony import */ var _WorldData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WorldData */ \"./scripts/WalkingSim/WorldData.js\");\n\r\n\r\n\r\n\r\nvar newId = Math.random;\r\n\r\nclass PersistentInteractables {\r\n    constructor() {\r\n        this.persist = {};\r\n    }\r\n    setIdsOnStreetData(streetData) {\r\n        for (var key in _WorldData__WEBPACK_IMPORTED_MODULE_0__.tstreetData) {\r\n            var street = _WorldData__WEBPACK_IMPORTED_MODULE_0__.tstreetData[key];\r\n            var interactables = street.interactablesList;\r\n            interactables.forEach(i => {\r\n                i.id = newId();\r\n            });\r\n        }\r\n    }\r\n    save(id, data) {\r\n        this.persist[id] = data;\r\n    }\r\n    get(id) {\r\n        if (!this.persist.hasOwnProperty(id)) {\r\n            return false;\r\n        }\r\n        return this.persist[id];\r\n\r\n    }\r\n}\n\n//# sourceURL=webpack://brainwaves/./scripts/WalkingSim/PersistentInteractables.js?");

/***/ }),

/***/ "./scripts/WalkingSim/Player.js":
/*!**************************************!*\
  !*** ./scripts/WalkingSim/Player.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplatedHtml */ \"./scripts/TemplatedHtml.js\");\n/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vec2 */ \"./scripts/Vec2.js\");\n/* harmony import */ var _DirectionalInputManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DirectionalInputManager */ \"./scripts/WalkingSim/DirectionalInputManager.js\");\n/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./script */ \"./scripts/WalkingSim/script.js\");\n\r\n\r\n\r\n\r\n\r\nclass Player {\r\n    constructor(parentElement) {\r\n        this.pos = new _Vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](20, -20);\r\n        this.speed = 50;\r\n        this.element = new _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"person\", parentElement);\r\n        this.movementInput = new _DirectionalInputManager__WEBPACK_IMPORTED_MODULE_2__.DirectionalInputManager();\r\n        this.flip = false;\r\n        this.isMoving = false;\r\n    }\r\n    perspective(y) {\r\n        return 1;\r\n        return 1 - y / 100;\r\n    }\r\n    update() {\r\n        var dir = this.movementInput.getDirection();\r\n        if (isNaN(dir.x)) {\r\n            dir = new _Vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](0, 0);\r\n        }\r\n        this.isMoving = dir.magnitude() > 0.01;\r\n\r\n        if (this.isMoving) {\r\n            dir = dir.times(this.perspective(this.pos.y));\r\n\r\n            var delta = dir.times(this.speed * _script__WEBPACK_IMPORTED_MODULE_3__.timeSpeedMod);\r\n\r\n            this.pos = this.pos.add(delta);\r\n\r\n            if (dir.x > 0) {\r\n                this.flip = true;\r\n            } else if (dir.x < 0) {\r\n                this.flip = false;\r\n            }\r\n        }\r\n    }\r\n\r\n    draw() {\r\n        this.element.element.style.top = -this.pos.y + \"px\";\r\n        this.element.element.style.left = this.pos.x + \"px\";\r\n\r\n        var scale = new _Vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](1, 1);\r\n        //var scale = new Vec2(this.perspective(this.pos.y),this.perspective(this.pos.y));\r\n        if (this.flip) {\r\n            scale.x = -Math.abs(scale.x);\r\n        } else {\r\n            scale.x = Math.abs(scale.x);\r\n        }\r\n\r\n        this.element.element.style.transform =\r\n            \"scalex(\" + scale.x + \") scaley(\" + scale.y + \")\";\r\n\r\n        if (this.isMoving) {\r\n            this.element.updateText(\"🏃‍♂️\");\r\n        } else {\r\n            this.element.updateText(\"🧍‍♀️\");\r\n        }\r\n    }\r\n    setParent(element) {\r\n        this.element.appendInto(element);\r\n    }\r\n}\n\n//# sourceURL=webpack://brainwaves/./scripts/WalkingSim/Player.js?");

/***/ }),

/***/ "./scripts/WalkingSim/Street.js":
/*!**************************************!*\
  !*** ./scripts/WalkingSim/Street.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Street\": () => (/* binding */ Street)\n/* harmony export */ });\n/* harmony import */ var _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplatedHtml */ \"./scripts/TemplatedHtml.js\");\n/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vec2 */ \"./scripts/Vec2.js\");\n/* harmony import */ var _Interactable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Interactable */ \"./scripts/WalkingSim/Interactable.js\");\n/* harmony import */ var _InteractableHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InteractableHelper */ \"./scripts/WalkingSim/InteractableHelper.js\");\n/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./script */ \"./scripts/WalkingSim/script.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass Street {\r\n    constructor(streetData, changeStreetFunc) {\r\n        this.element = new _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"path\", document.getElementById(\"root\"));\r\n        this.changeStreet = changeStreetFunc;\r\n        this.setupBackground();\r\n        this.setupForeground();\r\n        this.setupMidground(streetData);\r\n    }\r\n    setupBackground() {\r\n        this.backgroundElements = [];\r\n        var buildingCount = 14;\r\n        for (var i = 0; i < buildingCount; i++) {\r\n            this.backgroundElements.push(\r\n                new _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"building\", this.element.getPart(\"background\"))\r\n            );\r\n        }\r\n    }\r\n    setupForeground() {\r\n        this.backgroundElements = [];\r\n        var buildingCount = 24;\r\n        for (var i = 0; i < buildingCount; i++) {\r\n            this.backgroundElements.push(\r\n                new _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"plant\", this.element.getPart(\"foreground\"))\r\n            );\r\n        }\r\n    }\r\n    setupMidground(streetData) {\r\n        this.interactables = [];\r\n        for (var i = 0; i < streetData.interactablesList.length; i++) {\r\n            var dat = streetData.interactablesList[i];\r\n\r\n            var persisted = _script__WEBPACK_IMPORTED_MODULE_4__.persistanceManager.get(dat.id);\r\n            let intr;\r\n            if (persisted) {\r\n                intr = persisted;\r\n                return;\r\n            } else {\r\n                intr = new _Interactable__WEBPACK_IMPORTED_MODULE_2__.Interactable(dat, this.element.getPart(\"middleground\"));\r\n            }\r\n\r\n            this.interactables.push(intr);\r\n            this.interactables.push(new _InteractableHelper__WEBPACK_IMPORTED_MODULE_3__.InteractableHelper(this.player, intr));\r\n        }\r\n        for (var i = 0; i < streetData.junctions.length; i++) {\r\n            let junctionDat = streetData.junctions[i];\r\n            let interactableData = {\r\n                element: \"someGrass\",\r\n                icon: \"↕\",\r\n                interactText: \"Go to \" + junctionDat.street,\r\n                pos: new _Vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](junctionDat.pos),\r\n                onInteract: () => {\r\n                    this.changeStreet(junctionDat.street);\r\n                }\r\n            };\r\n            var intr = new _Interactable__WEBPACK_IMPORTED_MODULE_2__.Interactable(interactableData, this.element.getPart(\"middleground\"));\r\n            this.interactables.push(intr);\r\n            this.interactables.push(new _InteractableHelper__WEBPACK_IMPORTED_MODULE_3__.InteractableHelper(this.player, intr));\r\n        }\r\n    }\r\n    setPlayer(player, pos) {\r\n        player.setParent(this.element.getPart(\"middleground\"));\r\n        player.pos = pos;\r\n        this.interactables.forEach((e, i) => {\r\n            if (e instanceof _InteractableHelper__WEBPACK_IMPORTED_MODULE_3__.InteractableHelper) {\r\n                e.player = player;\r\n            }\r\n        });\r\n    }\r\n    update() {\r\n        this.interactables.forEach((i) => i.update());\r\n    }\r\n    draw() {\r\n        this.interactables.forEach((i) => i.draw());\r\n    }\r\n    destroy() {\r\n        this.interactables.forEach((e, i) => {\r\n            if (e.destroy) {\r\n                e.destroy();\r\n            }\r\n\r\n        });\r\n        this.element.element.remove();\r\n    }\r\n}\n\n//# sourceURL=webpack://brainwaves/./scripts/WalkingSim/Street.js?");

/***/ }),

/***/ "./scripts/WalkingSim/StreetTransition.js":
/*!************************************************!*\
  !*** ./scripts/WalkingSim/StreetTransition.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StreetTransition\": () => (/* binding */ StreetTransition)\n/* harmony export */ });\n/* harmony import */ var _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplatedHtml */ \"./scripts/TemplatedHtml.js\");\n/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vec2 */ \"./scripts/Vec2.js\");\n\r\n\r\n\r\nclass StreetTransition {\r\n    constructor(prevStreet, newStreet, junctionFrom, junctionTo, onTransitionEndCallback) {\r\n        this.transitionElement = new _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"streetTransition\", document.getElementById(\"root\"));\r\n        this.junctionFrom = junctionFrom;\r\n        this.junctionTo = junctionTo;\r\n        this.newStreet = newStreet;\r\n        this.prevStreet = prevStreet;\r\n\r\n        var angle = 80;\r\n\r\n        this.onTransitionEndCallback = onTransitionEndCallback;\r\n        this.prevStreet.element.appendInto(this.transitionElement.getPart(\"streetFrom\"));\r\n        this.newStreet.element.appendInto(this.transitionElement.getPart(\"streetTo\"));\r\n\r\n        var rotDir = !junctionFrom.backwards ? -1 : 1;\r\n        //a = from, b=to\r\n        var width = this.prevStreet.element.element.offsetWidth;\r\n        //Set initial state\r\n        this.transitionElement.getPart(\"streetFrom\").style.transform = \"rotateY(0) translatex(0) translatez(0)\";\r\n        //this.transitionElement.getPart(\"streetB\").style.transform = \"translatex(\"+junctionTo.pos.x+\"px) translatez(\"+junctionFrom.pos.x+\"px) rotateY(\"+((rotDir*90))+\"deg)\";\r\n        var otherTranslate = new _Vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](-(junctionTo.pos.x - (width / 2)), rotDir * (junctionFrom.pos.x - (width / 2)));\r\n        this.transitionElement.getPart(\"streetTo\").style.transform = \"rotateY(\" + ((rotDir * angle)) + \"deg) translatex(\" + otherTranslate.x + \"px) translatez(\" + otherTranslate.y + \"px)\";\r\n        this.transitionElement.getPart(\"streetTo\").style.opacity = 0;\r\n\r\n        setTimeout(() => {\r\n            //animate to\r\n            this.transitionElement.getPart(\"streetTo\").style.opacity = 1;\r\n            this.transitionElement.getPart(\"streetFrom\").style.opacity = 0;\r\n            //this.transitionElement.getPart(\"streetTo\").style.opacity=0;\r\n            this.transitionElement.getPart(\"streetAssembly\").style.transform = \"translatez(\" + -otherTranslate.y + \"px) translatex(\" + -otherTranslate.x + \"px) rotateY(\" + ((-rotDir * angle)) + \"deg)\";\r\n        }, 5);\r\n        setTimeout(() => {\r\n            this.onTransisionEnd();\r\n        }, 500);\r\n    }\r\n    onTransisionEnd() {\r\n        document.getElementById(\"root\").prepend(this.newStreet.element.element);\r\n        this.transitionElement.element.remove();\r\n        this.onTransitionEndCallback();\r\n    }\r\n}\n\n//# sourceURL=webpack://brainwaves/./scripts/WalkingSim/StreetTransition.js?");

/***/ }),

/***/ "./scripts/WalkingSim/World.js":
/*!*************************************!*\
  !*** ./scripts/WalkingSim/World.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"World\": () => (/* binding */ World)\n/* harmony export */ });\n/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Vec2 */ \"./scripts/Vec2.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./scripts/WalkingSim/Player.js\");\n/* harmony import */ var _Street__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Street */ \"./scripts/WalkingSim/Street.js\");\n/* harmony import */ var _StreetTransition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StreetTransition */ \"./scripts/WalkingSim/StreetTransition.js\");\n/* harmony import */ var _WorldData_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WorldData.js */ \"./scripts/WalkingSim/WorldData.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass World {\r\n    constructor(levelData) {\r\n        this.stuffThatNeedsUpdating = [];\r\n        this.player = new _Player__WEBPACK_IMPORTED_MODULE_1__.Player(document.body);\r\n        this.changeStreet(\"street1\", false);\r\n        this.inStreetTransition = false;\r\n    }\r\n    changeStreet(streetId) {\r\n        if (this.inStreetTransition) {\r\n            return;\r\n        }\r\n        this.inStreetTransition = true;\r\n        var prevStreetId = this.streetId;\r\n        var newStreetData = _WorldData_js__WEBPACK_IMPORTED_MODULE_4__.tstreetData[streetId];\r\n        var playerPos;\r\n\r\n        if (!prevStreetId) {\r\n            //initial player pos\r\n            playerPos = new _Vec2__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0);\r\n        } else {\r\n            playerPos = new _Vec2__WEBPACK_IMPORTED_MODULE_0__[\"default\"](newStreetData.junctions.find(i => i.street == prevStreetId).pos);\r\n        }\r\n        this.streetId = streetId;\r\n\r\n        if (prevStreetId) {\r\n\r\n\r\n            var newStreet = new _Street__WEBPACK_IMPORTED_MODULE_2__.Street(_WorldData_js__WEBPACK_IMPORTED_MODULE_4__.tstreetData[streetId], (s) => { this.changeStreet(s); });\r\n            var prevStreet = this.currentStreet;\r\n\r\n            var junctionFrom = _WorldData_js__WEBPACK_IMPORTED_MODULE_4__.tstreetData[prevStreetId].junctions.find(i => i.street == streetId);\r\n            var junctionTo = _WorldData_js__WEBPACK_IMPORTED_MODULE_4__.tstreetData[streetId].junctions.find(i => i.street == prevStreetId);\r\n\r\n            this.stuffThatNeedsUpdating = [];\r\n            new _StreetTransition__WEBPACK_IMPORTED_MODULE_3__.StreetTransition(\r\n                prevStreet,\r\n                newStreet,\r\n                junctionFrom,\r\n                junctionTo,\r\n                () => {\r\n                    this.inStreetTransition = false;\r\n                    prevStreet.destroy();\r\n                });\r\n\r\n            this.currentStreet = newStreet;\r\n            this.currentStreet.setPlayer(this.player, playerPos);\r\n            this.stuffThatNeedsUpdating.push(this.currentStreet);\r\n        } else {\r\n            this.currentStreet = new _Street__WEBPACK_IMPORTED_MODULE_2__.Street(_WorldData_js__WEBPACK_IMPORTED_MODULE_4__.tstreetData[streetId], (s) => { this.changeStreet(s); });\r\n\r\n            this.currentStreet.setPlayer(this.player, playerPos);\r\n            this.stuffThatNeedsUpdating.push(this.currentStreet);\r\n        }\r\n    }\r\n    update() {\r\n        this.player.update();\r\n        this.stuffThatNeedsUpdating.forEach((i) => i.update());\r\n    }\r\n\r\n    draw() {\r\n        this.player.draw();\r\n        this.stuffThatNeedsUpdating.forEach((i) => i.draw());\r\n    }\r\n}\n\n//# sourceURL=webpack://brainwaves/./scripts/WalkingSim/World.js?");

/***/ }),

/***/ "./scripts/WalkingSim/WorldData.js":
/*!*****************************************!*\
  !*** ./scripts/WalkingSim/WorldData.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"tstreetData\": () => (/* binding */ tstreetData)\n/* harmony export */ });\n/* harmony import */ var _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplatedHtml */ \"./scripts/TemplatedHtml.js\");\n/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vec2 */ \"./scripts/Vec2.js\");\n\r\n\r\n\r\nconst interactablesFunctions = {\r\n    showMessage: (text, then, once = false) => {\r\n        return (interactableElement, interactable) => {\r\n            var messageElement = new _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\r\n                \"post\",\r\n                document.getElementById(\"root\")\r\n            );\r\n            messageElement.element.textContent = text;\r\n            document.body.addEventListener(\r\n                \"keydown\",\r\n                () => {\r\n                    messageElement.element.remove();\r\n                    if (then) {\r\n                        then(interactableElement, interactable);\r\n                    }\r\n                }, {\r\n                    once: true\r\n                }\r\n            );\r\n            if (once) {\r\n                interactable.deactivate();\r\n            }\r\n        };\r\n    },\r\n    showElement: (element, then) => {\r\n        return (interactableElement, interactable) => {\r\n            var messageElement = new _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\r\n                element,\r\n                document.getElementById(\"root\")\r\n            );\r\n            document.body.addEventListener(\r\n                \"keydown\",\r\n                () => {\r\n                    messageElement.element.remove();\r\n                    if (then) {\r\n                        then(interactableElement, interactable);\r\n                    }\r\n                }, {\r\n                    once: true\r\n                }\r\n            );\r\n        };\r\n    }\r\n};\r\n\r\n\r\nconst tstreetData = {\r\n    street1: {\r\n        interactablesList: [{\r\n                element: \"interactableTest\",\r\n                instructionsElement: \"Open\",\r\n                pos: new _Vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](50, -20),\r\n                onInteract: interactablesFunctions.showElement(\"post\", (elem) => {\r\n                    elem.updateText(\"📪\", \"icon\");\r\n                })\r\n            },\r\n            {\r\n                icon: \"🌿\",\r\n                element: \"someGrass\",\r\n                pos: new _Vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](150, -60),\r\n                onInteract: interactablesFunctions.showMessage(\r\n                    \"wow some Poa annua along with other species of grass!\"\r\n                )\r\n            },\r\n            {\r\n                icon: \"🎃\",\r\n                element: \"someGrass\",\r\n                pos: new _Vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](200, -30),\r\n                onInteract: interactablesFunctions.showMessage(\r\n                    \"It's not even Halloween...\",\r\n                    (elem, interactable) => {\r\n                        elem.updateText(\"🥣\", \"icon\");\r\n                        interactable.onInteract = interactablesFunctions.showMessage(\r\n                            \"That's better\"\r\n                        );\r\n                    }\r\n                )\r\n            }\r\n        ],\r\n        junctions: [{\r\n            street: \"street2\",\r\n            pos: { x: 150, y: -10 },\r\n            backwards: true,\r\n        }]\r\n    },\r\n    street2: {\r\n        interactablesList: [{\r\n                icon: \"🥗\",\r\n                element: \"someGrass\",\r\n                pos: new _Vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](50, -20),\r\n                onInteract: interactablesFunctions.showMessage(\"Wow some more grass\")\r\n            },\r\n            {\r\n                icon: \"🐒\",\r\n                element: \"someGrass\",\r\n                pos: new _Vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](120, -20),\r\n                onInteract: interactablesFunctions.showMessage(\r\n                    \"It stole my phone\",\r\n                    (elem, interactable) => {\r\n                        elem.element.classList.add(\"runOff\");\r\n                    },\r\n                    true\r\n                )\r\n            },\r\n            {\r\n                icon: \"👨‍🦳\",\r\n                element: \"someGrass\",\r\n                pos: new _Vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](150, -30),\r\n                onInteract: interactablesFunctions.showMessage(\"My body disapeared 2 years ago. I've been stuck here ever since.\", (l, interactable) => {\r\n                    interactable.setInteraction(interactablesFunctions.showMessage(\"Luckily I dont need to eat any more\", (l, interactable) => {\r\n                        interactable.setInteraction(interactablesFunctions.showMessage(\"The kids play football with me\", (l, interactable) => {\r\n                            interactable.setInteraction(interactablesFunctions.showMessage(\"I dont have any achey joints though\", (l, interactable) => {\r\n                                interactable.setInteraction(interactablesFunctions.showMessage(\"other than my jaw.\", (l, i) => { i.deactivate() }));\r\n                            }));\r\n                        }));\r\n                    }));\r\n                })\r\n            }\r\n\r\n        ],\r\n        junctions: [{\r\n                street: \"street1\",\r\n                pos: { x: 10, y: -50 },\r\n                backwards: false,\r\n            },\r\n            {\r\n                street: \"street3\",\r\n                pos: { x: 200, y: -70 },\r\n                backwards: false,\r\n            }\r\n        ]\r\n    },\r\n    street3: {\r\n        interactablesList: [{\r\n                icon: \"🥗\",\r\n                element: \"someGrass\",\r\n                pos: new _Vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](50, -20),\r\n                onInteract: interactablesFunctions.showMessage(\"Wow some more grass\")\r\n            },\r\n            {\r\n                icon: \"🐒\",\r\n                element: \"someGrass\",\r\n                pos: new _Vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](120, -20),\r\n                onInteract: interactablesFunctions.showMessage(\r\n                    \"It stole my hat!\",\r\n                    (elem, interactable) => {\r\n                        elem.element.classList.add(\"runOff\");\r\n                    },\r\n                    true\r\n                )\r\n            }\r\n        ],\r\n        junctions: [\r\n\r\n            {\r\n                street: \"street2\",\r\n                pos: { x: 150, y: -70 },\r\n                backwards: true,\r\n            }\r\n        ]\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/WalkingSim/WorldData.js?");

/***/ }),

/***/ "./scripts/WalkingSim/script.js":
/*!**************************************!*\
  !*** ./scripts/WalkingSim/script.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"persistanceManager\": () => (/* binding */ persistanceManager),\n/* harmony export */   \"timeSpeedMod\": () => (/* binding */ timeSpeedMod)\n/* harmony export */ });\n/* harmony import */ var _PersistentInteractables_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PersistentInteractables.js */ \"./scripts/WalkingSim/PersistentInteractables.js\");\n/* harmony import */ var _World__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./World */ \"./scripts/WalkingSim/World.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nvar persistanceManager = new _PersistentInteractables_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\npersistanceManager.setIdsOnStreetData();\r\n\r\ndocument.body.addEventListener(\"click\", () => {\r\n    document.getElementById(\"startButton\")?.remove();\r\n});\r\n\r\nwindow.world = new _World__WEBPACK_IMPORTED_MODULE_1__.World();\r\n\r\nvar TickTime = 10;\r\nvar timeSpeedMod = TickTime / 1000;\r\nsetInterval(() => {\r\n    try {\r\n        window.world.update();\r\n        window.world.draw();\r\n    } catch (ex) {\r\n        console.error(ex);\r\n    }\r\n}, TickTime);\n\n//# sourceURL=webpack://brainwaves/./scripts/WalkingSim/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/WalkingSim/script.js");
/******/ 	
/******/ })()
;