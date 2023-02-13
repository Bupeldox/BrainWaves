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

/***/ "./scripts/Utils.js":
/*!**************************!*\
  !*** ./scripts/Utils.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"clamp\": () => (/* binding */ clamp),\n/* harmony export */   \"lerp\": () => (/* binding */ lerp)\n/* harmony export */ });\n\r\nconst clamp = (min, v, max) => Math.max(min, Math.min(max, v));\r\n\r\nfunction lerp(c, b, a) {\r\n    var v = a * b + c * (1 - b);\r\n    if (!isFinite(v)) {\r\n        return c;\r\n    }\r\n    return v;\r\n}\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/Utils.js?");

/***/ }),

/***/ "./scripts/Vec2.js":
/*!*************************!*\
  !*** ./scripts/Vec2.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Vec2)\n/* harmony export */ });\nclass Vec2 {\r\n\t//My handy vec2 class ;)\r\n\tconstructor(x, y) {\r\n\t\tif (x.hasOwnProperty(\"x\") && y && y.hasOwnProperty(\"x\")) {\r\n\t\t\tvar out = y.sub(x);\r\n\t\t\tthis.x = out.x;\r\n\t\t\tthis.y = out.y;\r\n\t\t} else if (x.hasOwnProperty(\"x\")) {\r\n\t\t\tthis.x = x.x;\r\n\t\t\tthis.y = x.y;\r\n\t\t} else if (x.hasOwnProperty(\"length\")) {\r\n\t\t\tthis.x = x[0];\r\n\t\t\tthis.y = x[1];\r\n\t\t} else {\r\n\t\t\tthis.x = x;\r\n\t\t\tthis.y = y;\r\n\t\t}\r\n\t}\r\n\r\n\tdistance(vec) {\r\n\t\tvar delta = this.sub(vec);\r\n\t\treturn delta.magnitude();\r\n\t}\r\n\r\n\tadd(vec) {\r\n\t\treturn new Vec2(this.x + vec.x, this.y + vec.y);\r\n\t}\r\n\tsub(vec) {\r\n\t\treturn new Vec2(this.x - vec.x, this.y - vec.y);\r\n\t}\r\n\ttimes(factor) {\r\n\t\treturn new Vec2(this.x * factor, this.y * factor);\r\n\t}\r\n\tmagnitude() {\r\n\t\treturn Math.sqrt(this.x * this.x + this.y * this.y);\r\n\t}\r\n\tnormalised(length = 1) {\r\n\t\tvar out = this.times(length / this.magnitude());\r\n\r\n\t\treturn new Vec2(out.x, out.y);\r\n\t}\r\n\tdot(vec) {\r\n\t\treturn this.x * vec.x + this.y * vec.y;\r\n\t}\r\n\tangle(vec) {\r\n\t\tif (!vec) {\r\n\t\t\tvec = new Vec2(0, 1);\r\n\t\t}\r\n\r\n\t\tvar dp = vec.normalised().dot(this.normalised());\r\n\t\tvar ang = Math.acos(dp);\r\n\t\tif (vec.rotate(Math.PI / 2).dot(this) < 0) {\r\n\t\t\tang *= -1;\r\n\t\t}\r\n\t\treturn ang;\r\n\t}\r\n\r\n\tclone() {\r\n\t\treturn new Vec2(this.x, this.y);\r\n\t}\r\n\trotate(theta) {\r\n\t\tvar cos = Math.cos(theta);\r\n\t\tvar sin = Math.sin(theta);\r\n\t\tvar x = this.x * cos - this.y * sin;\r\n\t\tvar y = this.x * sin + this.y * cos;\r\n\t\treturn new Vec2(x, y);\r\n\t}\r\n\ttimesComponentwise(vec) {\r\n\t\treturn new Vec2(this.x * vec.x, this.y * vec.y);\r\n\t}\r\n}\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/Vec2.js?");

/***/ }),

/***/ "./scripts/Waves/CanvasGrapher.js":
/*!****************************************!*\
  !*** ./scripts/Waves/CanvasGrapher.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CanvasGrapher)\n/* harmony export */ });\n/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils.js */ \"./scripts/Utils.js\");\n/* harmony import */ var _DisplaySettings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DisplaySettings */ \"./scripts/Waves/DisplaySettings.js\");\n\r\n\r\n\r\nclass CanvasGrapher {\r\n    constructor(func, element) {\r\n        this.function = func;\r\n        this.element = element;\r\n    }\r\n\r\n    draw() {\r\n        //debugger;\r\n        var canvas = this.element;\r\n        var parentSize = canvas.parentElement;\r\n        canvas.height = parentSize.offsetHeight + 4;\r\n        canvas.width = parentSize.offsetWidth;\r\n        var ctx = this.element.getContext(\"2d\");\r\n        ctx.fillStyle = \"#ddd\";\r\n        var limit = _DisplaySettings__WEBPACK_IMPORTED_MODULE_1__.DisplaySettings.limit;\r\n        for (var ix = 0; ix < canvas.width; ix++) {\r\n            var x = (((ix / canvas.width) * 2) - 1) * limit;\r\n            var y = this.function(x);\r\n            y = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__.clamp)(-limit, y, limit);\r\n            var cy = ((((1 - y) / _DisplaySettings__WEBPACK_IMPORTED_MODULE_1__.DisplaySettings.limit) + 1) / 2) * canvas.height;\r\n            ctx.fillRect(ix, cy, 1, canvas.height);\r\n        }\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/Waves/CanvasGrapher.js?");

/***/ }),

/***/ "./scripts/Waves/Card.js":
/*!*******************************!*\
  !*** ./scripts/Waves/Card.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Card)\n/* harmony export */ });\n/* harmony import */ var _MouseDragHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MouseDragHelper.js */ \"./scripts/Waves/MouseDragHelper.js\");\n/* harmony import */ var _CanvasGrapher_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasGrapher.js */ \"./scripts/Waves/CanvasGrapher.js\");\n/* harmony import */ var _Vec2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Vec2.js */ \"./scripts/Vec2.js\");\n/* harmony import */ var _TemplatedHtml_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TemplatedHtml.js */ \"./scripts/TemplatedHtml.js\");\n/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Utils.js */ \"./scripts/Utils.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass Card {\r\n    constructor(card, xpos, containerElement) {\r\n        this.card = card;\r\n        this.position = new _Vec2_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](xpos, 0.7);\r\n        this.element = new _TemplatedHtml_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](\"card\");\r\n        this.containerElement = containerElement;\r\n        this.element.updateText(this.card.name, \"name\");\r\n        this.activation = 0;\r\n        this.updateToNewPosition();\r\n        this.canvasGrapher = new _CanvasGrapher_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.card.func, this.element.getPart(\"cardFunctionCanvas\"));\r\n\r\n    }\r\n\r\n    updateToNewPosition() {\r\n        this.element.element.style.left = this.position.x * 100 + \"%\";\r\n        this.element.element.style.top = this.position.y * 100 + \"%\";\r\n    }\r\n\r\n    setupEvents(callback) {\r\n        var that = this;\r\n\r\n        var prevMousePos = new _Vec2_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](0, 0);\r\n        var onMouseDown = (mousePos) => {\r\n            prevMousePos = mousePos;\r\n            this.containerElement.appendChild(this.element.element); //Bring to top\r\n        };\r\n        var onMouseUp = () => {\r\n            if (!(this.activation == 0 || this.activation == 1)) {\r\n                this.activation = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__.clamp)(0, Math.round(this.activation), 1);\r\n                this.position.y = 1 - (this.activation + 2) / 4;\r\n                this.updateToNewPosition();\r\n                callback();\r\n            }\r\n        };\r\n\r\n        var onMouseMove = (mousePos) => {\r\n            var deltaMousePos = mousePos.sub(prevMousePos);\r\n            if (deltaMousePos.x != 0 || deltaMousePos.y != 0) {\r\n                var ob = this.containerElement.getBoundingClientRect();\r\n                //var offset = new Vec2(ob.left,ob.top);\r\n                var size = new _Vec2_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](ob.width, ob.height);\r\n                var deltaMouseAsFraction = new _Vec2_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\r\n                    deltaMousePos.x / size.x,\r\n                    deltaMousePos.y / size.y\r\n                );\r\n                this.position = this.position.add(deltaMouseAsFraction); //0-1\r\n\r\n                this.activation = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_4__.clamp)(0, (1 - this.position.y) * 4 - 2, 1);\r\n\r\n                prevMousePos = mousePos;\r\n                this.updateToNewPosition();\r\n            }\r\n            callback();\r\n        };\r\n\r\n        this.MouseDragHelper = new _MouseDragHelper_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\r\n            this.element.element,\r\n            onMouseDown,\r\n            onMouseMove,\r\n            onMouseUp\r\n        );\r\n    }\r\n}\n\n//# sourceURL=webpack://brainwaves/./scripts/Waves/Card.js?");

/***/ }),

/***/ "./scripts/Waves/CardFuncer.js":
/*!*************************************!*\
  !*** ./scripts/Waves/CardFuncer.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CardFuncer\": () => (/* binding */ CardFuncer)\n/* harmony export */ });\nclass CardFuncer {\r\n    constructor() {\r\n        this.cardList = [];\r\n    }\r\n    setCards(c) {\r\n        this.cardList = c;\r\n    }\r\n    evaluate(x) {\r\n        this.cardList.forEach((c) => (x = c.func(x)));\r\n        return x;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/Waves/CardFuncer.js?");

/***/ }),

/***/ "./scripts/Waves/DisplaySettings.js":
/*!******************************************!*\
  !*** ./scripts/Waves/DisplaySettings.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DisplaySettings\": () => (/* binding */ DisplaySettings)\n/* harmony export */ });\nvar DisplaySettings = {\r\n    limit: 4,\r\n};\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/Waves/DisplaySettings.js?");

/***/ }),

/***/ "./scripts/Waves/FunctionDrawer.js":
/*!*****************************************!*\
  !*** ./scripts/Waves/FunctionDrawer.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FunctionDrawer\": () => (/* binding */ FunctionDrawer)\n/* harmony export */ });\n/* harmony import */ var _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplatedHtml */ \"./scripts/TemplatedHtml.js\");\n/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vec2 */ \"./scripts/Vec2.js\");\n/* harmony import */ var _FunctionListCalculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FunctionListCalculator */ \"./scripts/Waves/FunctionListCalculator.js\");\n\r\n\r\n\r\n\r\n\r\nclass FunctionDrawer {\r\n    constructor(graphTarget, functionTextTarget) {\r\n        this.element = new _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"GraphOutput\", graphTarget);\r\n        this.functionTextElement = new _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\r\n            \"functionTextOutput\",\r\n            functionTextTarget\r\n        );\r\n        this.centerPoint = new _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"centerPoint\", this.element);\r\n        this.pointElements = [];\r\n        this.limit = 4;\r\n        this.functionListCalculator = new _FunctionListCalculator__WEBPACK_IMPORTED_MODULE_2__.FunctionListCalculator();\r\n    }\r\n\r\n    formatPointsForDisplay(points) {\r\n        points = points.filter(\r\n            (i) => i.x < this.limit &&\r\n                i.x > -this.limit &&\r\n                i.y > -this.limit &&\r\n                i.y < this.limit\r\n        );\r\n        points = points.map((i) => {\r\n            i = i.times(1 / this.limit); //Bring within -1 and 1\r\n            i = i.timesComponentwise(new _Vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](1, -1)); //Flip Y cus html\r\n            i = i.add(new _Vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](1, 1)).times(0.5); //Bring between 0 and 1\r\n            return i;\r\n        });\r\n        return points;\r\n    }\r\n    getText(cards) {\r\n        return this.functionListCalculator.getText(\r\n            cards.filter((i) => i.activation == 1).map((i) => i.card)\r\n        );\r\n    }\r\n    drawCardResult(cards) {\r\n        //1 = fully with the activated cards\r\n        var calcText = this.getText(cards);\r\n        this.functionTextElement?.updateText(calcText);\r\n\r\n        var points = this.functionListCalculator.calculateCardList(cards);\r\n\r\n        points = this.formatPointsForDisplay(points);\r\n        if (this.pointElements.length > points.length) {\r\n            //more elements\r\n            this.pointElements.forEach((p, i, array) => {\r\n                if (i >= points.length) {\r\n                    const index = array.indexOf(p);\r\n                    if (index > -1) {\r\n                        // only splice array when item is found\r\n                        array.splice(index, 1); // 2nd parameter means remove one item only\r\n                    }\r\n                    p.element.remove();\r\n                }\r\n            });\r\n        } else if (this.pointElements.length < points.length) {\r\n            //more points\r\n            var c = points.length - this.pointElements.length;\r\n            for (var i = 0; i < c; i++) {\r\n                var element = new _TemplatedHtml__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"curveMarker\", this.element);\r\n                this.pointElements.push(element);\r\n            }\r\n        }\r\n        points.forEach((p, i) => {\r\n            var element = this.pointElements[i];\r\n            element.element.style.top = Math.round(p.y * 100000) / 1000 + \"%\";\r\n            element.element.style.left = Math.round(p.x * 100000) / 1000 + \"%\";\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/Waves/FunctionDrawer.js?");

/***/ }),

/***/ "./scripts/Waves/FunctionEditor.js":
/*!*****************************************!*\
  !*** ./scripts/Waves/FunctionEditor.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FunctionEditor\": () => (/* binding */ FunctionEditor)\n/* harmony export */ });\n/* harmony import */ var _mathFuncs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mathFuncs */ \"./scripts/Waves/mathFuncs.js\");\n/* harmony import */ var _FunctionDrawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FunctionDrawer */ \"./scripts/Waves/FunctionDrawer.js\");\n/* harmony import */ var _TemplatedHtml_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TemplatedHtml.js */ \"./scripts/TemplatedHtml.js\");\n/* harmony import */ var _Card_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Card.js */ \"./scripts/Waves/Card.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass FunctionEditor {\r\n    constructor(changeCallBack,availableFuncs) {\r\n        this.baseElement = new _TemplatedHtml_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\r\n            \"functionEditor\",\r\n            document.getElementById(\"root\")\r\n        );\r\n        this.changeCallback = changeCallBack;\r\n\r\n        //Just put all the cards in, why not\r\n        this.cards = \r\n            _mathFuncs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].filter((a,i)=>availableFuncs.includes(i))\r\n            .map((c, i, ar) => {\r\n                var cardd = new _Card_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](\r\n                    c,\r\n                    (i + 1) / (2 + ar.length),\r\n                    this.baseElement.getPart(\"cards\")\r\n                );\r\n                if (i % 2 == 0) {\r\n                    cardd.position.y = 0.9;\r\n                }\r\n                cardd.updateToNewPosition();\r\n                return cardd;\r\n            });\r\n        /*\r\n            var c = 2;\r\n            this.cards[c].position.y = 0.2;\r\n            this.cards[c].activation = 1;\r\n            this.cards[c].updateToNewPosition();\r\n\r\n            c = 5;\r\n            this.cards[c].position.y = 0.2;\r\n            this.cards[c].activation = 1;\r\n            this.cards[c].updateToNewPosition();\r\n        */\r\n\r\n        this.cards.forEach((i) => {\r\n            i.element.appendInto(this.baseElement.getPart(\"cards\"));\r\n            i.canvasGrapher.draw();\r\n        });\r\n\r\n        this.functionDrawer = new _FunctionDrawer__WEBPACK_IMPORTED_MODULE_1__.FunctionDrawer(\r\n            this.baseElement.getPart(\"output\"),\r\n            this.baseElement.getPart(\"activeFunction\")\r\n        );\r\n\r\n        this.cards.forEach((i) => i.setupEvents(() => {\r\n            this.onCardChange();\r\n        }));\r\n\r\n        this.onCardChange();\r\n        this.animateCurve();\r\n    }\r\n\r\n    onCardChange() {\r\n        this.cards = this.cards.sort((a, b) => a.position.x - b.position.x);\r\n        if (this.cards.find((x) => x.activation > 0 && x.card.name.includes(\"t\"))) {\r\n            this.animateCurve();\r\n        } else {\r\n            this.stopCurveAnimation();\r\n        }\r\n        this.functionDrawer.drawCardResult(this.cards);\r\n        this.changeCallback();\r\n    }\r\n    animateCurve(stop) {\r\n        this.functionDrawer.drawCardResult(this.cards);\r\n        if (this.onFunctionChange) {\r\n            this.onFunctionChange();\r\n        }\r\n\r\n        this.animationTimeout = setTimeout(() => {\r\n            this.animateCurve();\r\n        }, 100);\r\n    }\r\n    stopCurveAnimation() {\r\n        clearTimeout(this.animationTimeout);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/Waves/FunctionEditor.js?");

/***/ }),

/***/ "./scripts/Waves/FunctionListCalculator.js":
/*!*************************************************!*\
  !*** ./scripts/Waves/FunctionListCalculator.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FunctionListCalculator\": () => (/* binding */ FunctionListCalculator)\n/* harmony export */ });\n/* harmony import */ var _DisplaySettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DisplaySettings */ \"./scripts/Waves/DisplaySettings.js\");\n/* harmony import */ var _CardFuncer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CardFuncer */ \"./scripts/Waves/CardFuncer.js\");\n/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils.js */ \"./scripts/Utils.js\");\n/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Vec2 */ \"./scripts/Vec2.js\");\n\r\n\r\n\r\n\r\n\r\nclass FunctionListCalculator {\r\n    constructor() {\r\n        this.cardFuncer = new _CardFuncer__WEBPACK_IMPORTED_MODULE_1__.CardFuncer();\r\n        this.savedPoints = [];\r\n    }\r\n    calculatePoints(cardsTypes) {\r\n        this.cardFuncer.setCards(cardsTypes);\r\n        var output = [];\r\n        for (var x = -_DisplaySettings__WEBPACK_IMPORTED_MODULE_0__.DisplaySettings.limit; x < _DisplaySettings__WEBPACK_IMPORTED_MODULE_0__.DisplaySettings.limit; x += _DisplaySettings__WEBPACK_IMPORTED_MODULE_0__.DisplaySettings.spacing) {\r\n            output.push(new _Vec2__WEBPACK_IMPORTED_MODULE_3__[\"default\"](x, this.cardFuncer.evaluate(x)));\r\n        }\r\n        return output;\r\n    }\r\n    calculateCardList(cards) {\r\n        var activatedCards = cards.filter((i) => i.activation === 1);\r\n        var movingCards = cards.filter((i) => i.activation !== 0);\r\n\r\n        var lerpAmount = 1;\r\n        if (activatedCards.length != movingCards.length) {\r\n            var movingCard = movingCards.find(\r\n                (i) => i.activation != 1 && i.activation != 0\r\n            );\r\n            lerpAmount = movingCard.activation;\r\n        }\r\n\r\n        var pointsForFullyActiveCards = this.calculatePoints(\r\n            activatedCards.map((i) => i.card)\r\n        );\r\n\r\n        var pointsForMovingCards = this.calculatePoints(\r\n            movingCards.map((i) => i.card)\r\n        );\r\n\r\n        var points = pointsForFullyActiveCards.map(\r\n            (e, i) => new _Vec2__WEBPACK_IMPORTED_MODULE_3__[\"default\"](\r\n                (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__.lerp)(e.x, lerpAmount, pointsForMovingCards[i].x),\r\n                (0,_Utils_js__WEBPACK_IMPORTED_MODULE_2__.lerp)(e.y, lerpAmount, pointsForMovingCards[i].y)\r\n            )\r\n        );\r\n        this.savedPoints = points;\r\n        return points;\r\n    }\r\n    getText(cards) {\r\n        var output = \"x\";\r\n        cards.forEach((c, i) => {\r\n            if (i == 0) {\r\n                let t = c.name;\r\n                output = t.replaceAll(\"x\", output);\r\n            } else {\r\n                let t = c.name.replace(\"(x)\", \"x\");\r\n                output = t.replaceAll(\"x\", \"(\" + output + \")\");\r\n            }\r\n        });\r\n        return \"y = \" + output;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/Waves/FunctionListCalculator.js?");

/***/ }),

/***/ "./scripts/Waves/FunctionMatchGame.js":
/*!********************************************!*\
  !*** ./scripts/Waves/FunctionMatchGame.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"FunctionMatchGame\": () => (/* binding */ FunctionMatchGame)\n/* harmony export */ });\n/* harmony import */ var _FunctionEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FunctionEditor */ \"./scripts/Waves/FunctionEditor.js\");\n/* harmony import */ var _TargetFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TargetFunction */ \"./scripts/Waves/TargetFunction.js\");\n/* harmony import */ var _GitchyText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GitchyText */ \"./scripts/Waves/GitchyText.js\");\n/* harmony import */ var _TemplatedHtml__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TemplatedHtml */ \"./scripts/TemplatedHtml.js\");\n\r\n\r\n\r\n\r\n\r\nclass FunctionMatchGame {\r\n    constructor(gameData) {\r\n        this.gameData = gameData;\r\n        this.thoughtTextOutput = new _TemplatedHtml__WEBPACK_IMPORTED_MODULE_3__[\"default\"](\r\n            \"thought\",\r\n            document.getElementById(\"root\")\r\n        );\r\n        this.functionEditor = new _FunctionEditor__WEBPACK_IMPORTED_MODULE_0__.FunctionEditor(() => {\r\n            this.onFunctionChange();\r\n        },gameData.useable);\r\n        this.targetFunction = new _TargetFunction__WEBPACK_IMPORTED_MODULE_1__.TargetFunction(\r\n            [],\r\n            this.functionEditor.baseElement.getPart(\"output\")\r\n        );\r\n        this.glitchyText = new _GitchyText__WEBPACK_IMPORTED_MODULE_2__.GitchyText(\r\n            this.gameData.thought,\r\n            this.thoughtTextOutput.element\r\n        );\r\n        this.level = 1;\r\n        this.accuracyOutput = new _TemplatedHtml__WEBPACK_IMPORTED_MODULE_3__[\"default\"](\r\n            \"scoreOutput\",\r\n            this.functionEditor.baseElement.getPart(\"textContainer\")\r\n        );\r\n        this.complexityOutput = new _TemplatedHtml__WEBPACK_IMPORTED_MODULE_3__[\"default\"](\r\n            \"scoreOutput\",\r\n            this.functionEditor.baseElement.getPart(\"textContainer\")\r\n        );\r\n        /*\r\n        this.nextButton = new TemplatedHtml(\r\n            \"nextButton\",\r\n            this.functionEditor.baseElement.getPart(\"buttonContainer\")\r\n        );\r\n        this.harderButton = new TemplatedHtml(\r\n            \"nextButton\",\r\n            this.functionEditor.baseElement.getPart(\"buttonContainer\")\r\n        );\r\n        this.nextButton.element.addEventListener(\"click\", () => {\r\n            this.nextLevel();\r\n        });\r\n        this.harderButton.element.addEventListener(\"click\", () => {\r\n            this.nextLevel(true);\r\n        });*/\r\n        this.functionEditor.functionDrawer.centerPoint.updateText(\"💎\");\r\n        this.functionEditor.functionDrawer.centerPoint.element.style.filter = \"hue-rotate(180deg)\";\r\n\r\n        this.targetFunction.setCurve(this.gameData.target);\r\n        this.onFunctionChange();\r\n        this.currentComplexity = 1;\r\n        this.updateLevelText();\r\n    }\r\n\r\n    onFunctionChange() {\r\n        if (this.accuracyOutput) {\r\n            var difference = this.getAccuracy();\r\n            var score = 5 - Math.log(difference);\r\n            this.hasPassed = score > 20 || isNaN(score);\r\n            this.glitchyText.updateValue((score + 4) / 10);\r\n            this.accuracyOutput.updateText(\r\n                \"score:\" + (this.hasPassed ? \"✅\" : Math.round(score * 100) / 100)\r\n            );\r\n            if (this.hasPassed) {\r\n                this.setButtonState(\"NextLevel\");\r\n            } else {\r\n                this.setButtonState(\"MidLevel\");\r\n            }\r\n        }\r\n    }\r\n    setButtonState(state) {\r\n        switch (state) {\r\n            case \"NextLevel\":\r\n                this.nextButton.element.style.background = \"#e3e\";\r\n                this.nextButton.updateText(\"Next Wave\");\r\n                this.harderButton.element.style.display = \"block\";\r\n                this.harderButton.element.style.background = \"#f33\";\r\n                this.harderButton.updateText(\"Harder Curves!!!\");\r\n                break;\r\n            case \"MidLevel\":\r\n                this.nextButton.element.style.background = \"#efe\";\r\n                this.nextButton.updateText(\"Hint\");\r\n                this.harderButton.element.style.display = \"none\";\r\n                break;\r\n        }\r\n    }\r\n\r\n    getAccuracy() {\r\n        var accuracy = this.targetFunction.compareToCurrent(\r\n            this.functionEditor.functionDrawer.functionListCalculator.savedPoints\r\n        );\r\n        return accuracy;\r\n    }\r\n\r\n    updateLevelText() {\r\n        this.complexityOutput.updateText(\r\n            \"No. of cards:\" + Math.round(this.currentComplexity * 10) / 10\r\n        );\r\n    }\r\n    \r\n    /*\r\n    nextLevel(moreDifficult) {\r\n        if (this.hasPassed) {\r\n            this.level++;\r\n            if (moreDifficult) {\r\n                this.currentComplexity++;\r\n            }\r\n            this.glitchyText.updateValue(0, true);\r\n            this.glitchyText.updateText(this.nextQuote);\r\n            getQuote((d) => {\r\n                this.nextQuote = d.content;\r\n            });\r\n            this.updateLevelText();\r\n            this.targetFunction.generateNewCurve(this.currentComplexity);\r\n            this.onFunctionChange();\r\n        } else {\r\n            debugger;\r\n            this.nextButton.updateText(this.targetFunction.functionDrawer.getText(this.targetFunction.cardList));\r\n\r\n        }\r\n    }*/\r\n}\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/Waves/FunctionMatchGame.js?");

/***/ }),

/***/ "./scripts/Waves/GitchyText.js":
/*!*************************************!*\
  !*** ./scripts/Waves/GitchyText.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GitchyText\": () => (/* binding */ GitchyText)\n/* harmony export */ });\n/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils.js */ \"./scripts/Utils.js\");\n/* harmony import */ var _TextScrambler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TextScrambler */ \"./scripts/Waves/TextScrambler.js\");\n\r\n\r\n\r\n\r\nclass GitchyText {\r\n    constructor(text, element) {\r\n        this.element = element;\r\n        this.value = 0;\r\n        this.lerpingValue = 0;\r\n        this.lerpSpeed = 0.2;\r\n        this.textScrambler = new _TextScrambler__WEBPACK_IMPORTED_MODULE_1__.TextScrambler(text);\r\n        this.loop();\r\n    }\r\n    updateValue(v, force) {\r\n        this.value = (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__.clamp)(0, v, 1);\r\n        if (force) {\r\n            this.lerpingValue = this.value;\r\n        }\r\n        this.loop();\r\n    }\r\n    updateText(text) {\r\n        this.textScrambler.text = text;\r\n        this.loop();\r\n    }\r\n    loop(stop) {\r\n        /*if (!this.timeout) {\r\n            this.lerpingValue = 0;\r\n        }\r\n        if (stop) {\r\n            clearInterval(this.timeout);\r\n            this.element.textContent = this.textScrambler.updateScrambledness(\r\n                this.value\r\n            );\r\n            this.lerpingValue = this.value;\r\n            return;\r\n        }*/\r\n        var delta = this.value - this.lerpingValue;\r\n        if (delta < 0 || Math.abs(delta) < this.lerpSpeed) {\r\n            this.lerpingValue = this.value;\r\n        } else {\r\n            this.lerpingValue = this.lerpingValue + Math.sign(delta) * this.lerpSpeed;\r\n        }\r\n\r\n        this.element.textContent = this.textScrambler.updateScrambledness(\r\n            (0,_Utils_js__WEBPACK_IMPORTED_MODULE_0__.clamp)(0, this.value, 1)\r\n        );\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/Waves/GitchyText.js?");

/***/ }),

/***/ "./scripts/Waves/MouseDragHelper.js":
/*!******************************************!*\
  !*** ./scripts/Waves/MouseDragHelper.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MouseDragHelper)\n/* harmony export */ });\n/* harmony import */ var _Vec2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Vec2 */ \"./scripts/Vec2.js\");\n\r\n\r\nclass MouseDragHelper {\r\n    constructor(element, onDown, onMove, onUp) {\r\n        this.isDragging = false;\r\n        this.element = element;\r\n        var that = this;\r\n\r\n        var eToMousePos = (e) => {\r\n            if (e.touches) {\r\n                return new _Vec2__WEBPACK_IMPORTED_MODULE_0__[\"default\"](e.touches[0].clientX, e.touches[0].clientY);\r\n            } else {\r\n                return new _Vec2__WEBPACK_IMPORTED_MODULE_0__[\"default\"](e.pageX, e.pageY);\r\n            }\r\n        };\r\n\r\n        var onMouseDown = (e) => {\r\n            this.isDragging = true;\r\n            element.classList.add(\"dragging\");\r\n            onDown(eToMousePos(e));\r\n        };\r\n        var onMouseUp = (e) => {\r\n            this.isDragging = false;\r\n            element.classList.remove(\"dragging\");\r\n            onUp();\r\n        };\r\n        var onMouseMove = (e) => {\r\n            if (this.isDragging) {\r\n\r\n                onMove(eToMousePos(e));\r\n            }\r\n        };\r\n\r\n        this.mouseDownEvent = element.addEventListener(\"mousedown\", (e) => {\r\n            this.isDragging = true;\r\n            element.classList.add(\"dragging\");\r\n            onDown(eToMousePos(e));\r\n        });\r\n        this.mouseUpEvent = document.addEventListener(\"mouseup\", (e) => {\r\n            this.isDragging = false;\r\n            element.classList.remove(\"dragging\");\r\n            onUp(eToMousePos(e));\r\n        });\r\n        this.mouseMoveEvent = document.addEventListener(\"mousemove\", (e) => {\r\n            if (this.isDragging) {\r\n                onMove(eToMousePos(e));\r\n            }\r\n        });\r\n\r\n        this.mouseDownEventt = element.addEventListener(\"touchstart\", (e) => {\r\n            onMouseDown(e);\r\n        });\r\n        this.mouseUpEventt = document.addEventListener(\"touchend\", (e) => {\r\n            onMouseUp(e);\r\n        });\r\n        this.mouseUpEventtc = document.addEventListener(\"touchcancel\", (e) => {\r\n            onMouseUp(e);\r\n        });\r\n        this.mouseMoveEventt = document.addEventListener(\"touchmove\", (e) => {\r\n            onMouseMove(e);\r\n        });\r\n    }\r\n    destroy() {\r\n        this.element.removeEventListener(\"mousedown\", this.mouseDownEvent);\r\n        document.removeEventListener(\"mouseup\", this.mouseUpEvent);\r\n        document.removeEventListener(\"mousemove\", this.mouseMoveEvent);\r\n\r\n        this.element.removeEventListener(\"touchstart\", this.mouseDownEventt);\r\n        document.removeEventListener(\"touchend\", this.mouseUpEventt);\r\n        document.removeEventListener(\"touchcancel\", this.mouseUpEventtc);\r\n        document.removeEventListener(\"touchmove\", this.mouseMoveEventt);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/Waves/MouseDragHelper.js?");

/***/ }),

/***/ "./scripts/Waves/TargetFunction.js":
/*!*****************************************!*\
  !*** ./scripts/Waves/TargetFunction.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TargetFunction\": () => (/* binding */ TargetFunction)\n/* harmony export */ });\n/* harmony import */ var _mathFuncs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mathFuncs */ \"./scripts/Waves/mathFuncs.js\");\n/* harmony import */ var _FunctionDrawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FunctionDrawer */ \"./scripts/Waves/FunctionDrawer.js\");\n/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Card */ \"./scripts/Waves/Card.js\");\n\r\n\r\n\r\n\r\nclass TargetFunction {\r\n    constructor(cardList, element) {\r\n        this.functionDrawer = new _FunctionDrawer__WEBPACK_IMPORTED_MODULE_1__.FunctionDrawer(element);\r\n        this.cardList = cardList;\r\n        this.drawCurve();\r\n    }\r\n    drawCurve() {\r\n        // pls fix this// pls fix this// pls fix this// pls fix this// pls fix this// pls fix this// pls fix this\r\n        for (var i = 0; i < 10; i++) {\r\n            this.functionDrawer.drawCardResult(this.cardList);\r\n        }\r\n        if (this.cardList.find((x) => x.activation > 0 && x.card.name.includes(\"t\"))) {\r\n            this.animateCurve();\r\n        } else {\r\n            this.stopCurveAnimation();\r\n        }\r\n    }\r\n    animateCurve(stop) {\r\n        this.functionDrawer.drawCardResult(this.cardList);\r\n        if (this.onFunctionChange) {\r\n            this.onFunctionChange();\r\n        }\r\n        this.animationTimeout = setTimeout(() => {\r\n            this.animateCurve();\r\n        }, 100);\r\n    }\r\n    stopCurveAnimation() {\r\n        clearTimeout(this.animationTimeout);\r\n    }\r\n\r\n    compareToCurrent(userPoints) {\r\n        this.drawCurve();\r\n\r\n        var targetPoints = this.functionDrawer.functionListCalculator.calculateCardList(\r\n            this.cardList\r\n        );\r\n        var currentPoints = userPoints; //this.functionDrawer.functionListCalculator.calculateCardList(createdCards);\r\n\r\n        var totalDifference = 0;\r\n        targetPoints.map((p, i) => {\r\n            var target = p.y;\r\n            var guess = currentPoints[i].y;\r\n            if (isNaN(target) && isNaN(guess)) {\r\n                totalDifference += 0;\r\n                return;\r\n            } else if (isNaN(target) || isNaN(guess)) {\r\n                totalDifference += 100;\r\n                return;\r\n            }\r\n            totalDifference += Math.abs(p.y - currentPoints[i].y);\r\n        });\r\n\r\n        return totalDifference;\r\n    }\r\n    setCurve(funcList){\r\n        var list = [];\r\n\r\n        for (var i = 0; i < funcList.length; i++) {\r\n            var functionIndex = funcList[i];\r\n            var card = _mathFuncs__WEBPACK_IMPORTED_MODULE_0__[\"default\"][functionIndex];\r\n            var cardInstance = new _Card__WEBPACK_IMPORTED_MODULE_2__[\"default\"](card, i);\r\n            cardInstance.activation = 1;\r\n            list.push(cardInstance);\r\n        }\r\n        this.cardList = list;\r\n        this.drawCurve();\r\n    }\r\n    /*\r\n    generateNewCurve(complexity) {\r\n        var list = [];\r\n        var funcs = mathFuncs;\r\n        const selected = mathFuncs\r\n            .sort(() => 0.5 - Math.random())\r\n            .slice(0, complexity);\r\n\r\n        for (var i = 0; i < selected.length; i++) {\r\n            var card = selected[i];\r\n            var cardInstance = new Card(card, i);\r\n            cardInstance.activation = 1;\r\n            list.push(cardInstance);\r\n        }\r\n        this.cardList = list;\r\n        this.drawCurve();\r\n    }*/\r\n}\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/Waves/TargetFunction.js?");

/***/ }),

/***/ "./scripts/Waves/TextScrambler.js":
/*!****************************************!*\
  !*** ./scripts/Waves/TextScrambler.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TextScrambler\": () => (/* binding */ TextScrambler)\n/* harmony export */ });\nclass TextScrambler {\r\n    constructor(text) {\r\n        this.text = text;\r\n        this.letters =\r\n            \"qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!£$%^&*()-=_+[]{};'#:@~,./<>?\";\r\n    }\r\n    updateScrambledness(amount) {\r\n        var getRandomCharacter = () => {\r\n            var index = Math.floor(Math.random() * this.letters.length);\r\n            return this.letters[index];\r\n        };\r\n\r\n        var text = \"\";\r\n        for (var i = 0; i < this.text.length; i++) {\r\n            if (Math.random() > amount) {\r\n                text += getRandomCharacter();\r\n            } else {\r\n                text += this.text[i];\r\n            }\r\n        }\r\n        return text;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/Waves/TextScrambler.js?");

/***/ }),

/***/ "./scripts/Waves/TimeHandler.js":
/*!**************************************!*\
  !*** ./scripts/Waves/TimeHandler.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getTime\": () => (/* binding */ getTime)\n/* harmony export */ });\n\r\nfunction getTime(){\r\n    return time;\r\n}\r\n\r\nvar time = 0;\r\nsetInterval(() => {\r\n    time += 10;\r\n}, 10);\r\n\r\n\n\n//# sourceURL=webpack://brainwaves/./scripts/Waves/TimeHandler.js?");

/***/ }),

/***/ "./scripts/Waves/mathFuncs.js":
/*!************************************!*\
  !*** ./scripts/Waves/mathFuncs.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _TimeHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TimeHandler */ \"./scripts/Waves/TimeHandler.js\");\n\r\n\r\nclass CardType {\r\n    constructor(name, func) {\r\n        this.name = name;\r\n        this.func = func;\r\n    }\r\n}\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([\r\n    new CardType(\"x+1\", (x) => x + 1),\r\n    new CardType(\"x*-1\", (x) => x * -1),\r\n    new CardType(\"x⁻¹\", (x) => Math.pow(x, -1)),\r\n    new CardType(\"x²\", (x) => Math.pow(x, 2)),\r\n    new CardType(\"x³\", (x) => Math.pow(x, 3)),\r\n    new CardType(\"√x\", (x) => Math.pow(x, 0.5)),\r\n    new CardType(\"sin(x)\", (x) => Math.sin(x)),\r\n    new CardType(\"e^x\", (x) => Math.pow(2, x)),\r\n    new CardType(\"ln(x)\", (x) => Math.log2(x)), //shhhh\r\n    new CardType(\"x+sin(t)\", (x) => x + Math.sin((0,_TimeHandler__WEBPACK_IMPORTED_MODULE_0__.getTime)() / 1000)),\r\n    new CardType(\"|x|\", (x) => Math.abs(x)),\r\n    new CardType(\"x%2\", (x) => x % 2)\r\n    //new CardType(\"1%x\", (x) => 1%x),\r\n    //new CardType(\"x+randt\", (x) => x+Math.random()),\r\n    //new CardType(\"round(x)\", (x) => Math.round(x))\r\n]);\n\n//# sourceURL=webpack://brainwaves/./scripts/Waves/mathFuncs.js?");

/***/ }),

/***/ "./scripts/Waves/script.js":
/*!*********************************!*\
  !*** ./scripts/Waves/script.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _FunctionMatchGame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FunctionMatchGame */ \"./scripts/Waves/FunctionMatchGame.js\");\n//import vec2\r\n//import Glitchy Text\r\n\r\n\r\n\r\n//try and match maths functions to deal damage/defend.\r\n//Setup defences, but them functions might be useful for attacking\r\n//parts of the function are cards\r\n//Want to reduce the amount of numbers to just like 1, X and the polynomials\r\n//Don't want to go down a scifi route\r\n//Dont want to use 'blocks' like scratch\r\n//As you put cards in, the output lerps between before that card and after.\r\n\r\n\r\nvar gamDat = {\r\n    target:[1,2],\r\n    useable:[0,1,2,3,4,5,6,7,8,9,10,11],\r\n    thought:\"Test\",\r\n};\r\n\r\nconst queryString = window.location.search;\r\nconst urlParams = new URLSearchParams(queryString);\r\n\r\nif(urlParams.get('target')&&urlParams.get('useable')&&urlParams.get('thought')){\r\n\r\n    gamDat.target = urlParams.get('target').split(\",\").map(i=>+i);\r\n    gamDat.useable = urlParams.get('useable').split(\",\").map(i=>+i);\r\n    gamDat.thought = urlParams.get('thought');\r\n\r\n}\r\n\r\n\r\nvar matchGame = new _FunctionMatchGame__WEBPACK_IMPORTED_MODULE_0__.FunctionMatchGame(gamDat);\r\n\r\n//to make time based calculations use the same time.\r\n\r\n//todo - Make update loops come from 1 place, not using timeouts.\n\n//# sourceURL=webpack://brainwaves/./scripts/Waves/script.js?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/Waves/script.js");
/******/ 	
/******/ })()
;