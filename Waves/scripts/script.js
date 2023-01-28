//import vec2
//import Glitchy Text

//try and match maths functions to deal damage/defend.
//Setup defences, but them functions might be useful for attacking
//parts of the function are cards
//Want to reduce the amount of numbers to just like 1, X and the polynomials
//Don't want to go down a scifi route
//Dont want to use 'blocks' like scratch
//As you put cards in, the output lerps between before that card and after.

var clamp = (min, v, max) => Math.max(min, Math.min(max, v));

function lerp(c, b, a) {
	var v = a * b + c * (1 - b);
	if (!isFinite(v)) {
		return c;
	}
	return v;
}

class CardType {
	constructor(name, func) {
		this.name = name;
		this.func = func;
	}
}



class Card {
	constructor(card, xpos, containerElement) {
		this.card = card;
		this.position = new Vec2(xpos, 0.7);
		this.element = new TemplatedHtml("card");
		this.containerElement = containerElement;
		this.element.updateText( this.card.name,"name");
		this.activation = 0;
		this.updateToNewPosition();
		this.canvasGrapher = new CanvasGrapher(this.card.func,this.element.getPart("cardFunctionCanvas"));
		
	}

	updateToNewPosition() {
		this.element.element.style.left = this.position.x * 100 + "%";
		this.element.element.style.top = this.position.y * 100 + "%";
	}

	setupEvents(callback) {
		var that = this;

		var prevMousePos = new Vec2(0, 0);
		var onMouseDown = (mousePos) => {
			prevMousePos = mousePos;
			this.containerElement.appendChild(this.element.element); //Bring to top
		};
		var onMouseUp = () => {
			if (!(this.activation == 0 || this.activation == 1)) {
				this.activation = clamp(0, Math.round(this.activation), 1);
				this.position.y = 1 - (this.activation + 2) / 4;
				this.updateToNewPosition();
				callback();
			}
		};

		var onMouseMove = (mousePos) => {
			var deltaMousePos = mousePos.sub(prevMousePos);
			if (deltaMousePos.x != 0 || deltaMousePos.y != 0) {
				var ob = this.containerElement.getBoundingClientRect();
				//var offset = new Vec2(ob.left,ob.top);
				var size = new Vec2(ob.width, ob.height);
				var deltaMouseAsFraction = new Vec2(
					deltaMousePos.x / size.x,
					deltaMousePos.y / size.y
				);
				this.position = this.position.add(deltaMouseAsFraction); //0-1

				this.activation = clamp(0, (1 - this.position.y) * 4 - 2, 1);

				prevMousePos = mousePos;
				this.updateToNewPosition();
			}
			callback();
		};

		this.MouseDragHelper = new MouseDragHelper(
			this.element.element,
			onMouseDown,
			onMouseMove,
			onMouseUp
		);
	}
}

class MouseDragHelper {
	constructor(element, onDown, onMove, onUp) {
		this.isDragging = false;
		this.element = element;
		var that = this;

		var eToMousePos = (e) => {
			if (e.touches) {
				return new Vec2(e.touches[0].clientX, e.touches[0].clientY);
			} else {
				return new Vec2(e.pageX, e.pageY);
			}
		};
		
		var onMouseDown = (e)=>{
			this.isDragging = true;
			element.classList.add("dragging");
			onDown(eToMousePos(e));
		};
		var onMouseUp = (e)=>{
			this.isDragging = false;
			element.classList.remove("dragging");
			onUp();
		};
		var onMouseMove = (e)=>{
			if (this.isDragging) {
			
				onMove(eToMousePos(e));
			}
		};
		
		this.mouseDownEvent = element.addEventListener("mousedown", (e) => {
			this.isDragging = true;
			element.classList.add("dragging");
			onDown(eToMousePos(e));
		});
		this.mouseUpEvent = document.addEventListener("mouseup", (e) => {
			this.isDragging = false;
			element.classList.remove("dragging");
			onUp(eToMousePos(e));
		});
		this.mouseMoveEvent = document.addEventListener("mousemove", (e) => {
			if (this.isDragging) {
				onMove(eToMousePos(e));
			}
		});
		
		this.mouseDownEventt = element.addEventListener("touchstart", (e) => {
			onMouseDown(e);
		});
		this.mouseUpEventt = document.addEventListener("touchend", (e) => {
			onMouseUp(e);
		});
		this.mouseUpEventtc = document.addEventListener("touchcancel", (e) => {
			onMouseUp(e);
		});
		this.mouseMoveEventt = document.addEventListener("touchmove", (e) => {
			onMouseMove(e);
		});
	}
	destroy() {
		this.element.removeEventListener("mousedown", this.mouseDownEvent);
		document.removeEventListener("mouseup", this.mouseUpEvent);
		document.removeEventListener("mousemove", this.mouseMoveEvent);
		
		this.element.removeEventListener("touchstart", this.mouseDownEventt);
		document.removeEventListener("touchend", this.mouseUpEventt);
		document.removeEventListener("touchcancel", this.mouseUpEventtc);
		document.removeEventListener("touchmove", this.mouseMoveEventt);
	}
}

class CardFuncer {
	constructor() {
		this.cardList = [];
	}
	setCards(c) {
		this.cardList = c;
	}
	evaluate(x) {
		this.cardList.forEach((c) => (x = c.func(x)));
		return x;
	}
}

class FunctionListCalculator {
	constructor() {
		this.cardFuncer = new CardFuncer();
		this.savedPoints = [];
	}
	calculatePoints(cardsTypes) {
		this.cardFuncer.setCards(cardsTypes);
		var output = [];
		for (
			var x = -DisplaySettings.limit;
			x < DisplaySettings.limit;
			x += DisplaySettings.spacing
		) {
			output.push(new Vec2(x, this.cardFuncer.evaluate(x)));
		}
		return output;
	}
	calculateCardList(cards) {
		var activatedCards = cards.filter((i) => i.activation === 1);
		var movingCards = cards.filter((i) => i.activation !== 0);

		var lerpAmount = 1;
		if (activatedCards.length != movingCards.length) {
			var movingCard = movingCards.find(
				(i) => i.activation != 1 && i.activation != 0
			);
			lerpAmount = movingCard.activation;
		}

		var pointsForFullyActiveCards = this.calculatePoints(
			activatedCards.map((i) => i.card)
		);

		var pointsForMovingCards = this.calculatePoints(
			movingCards.map((i) => i.card)
		);

		var points = pointsForFullyActiveCards.map(
			(e, i) =>
				new Vec2(
					lerp(e.x, lerpAmount, pointsForMovingCards[i].x),
					lerp(e.y, lerpAmount, pointsForMovingCards[i].y)
				)
		);
		this.savedPoints = points;
		return points;
	}
	getText(cards) {
		var output = "x";
		cards.forEach((c,i) => {
			if(i==0){
				let t = c.name;
				output= t.replaceAll("x",  output);
			}else{
				let t = c.name.replace("(x)", "x")
				output= t.replaceAll("x", "(" + output + ")");
			}
		});
		return "y = "+ output;
	}
}

class FunctionDrawer {
	constructor(graphTarget, functionTextTarget) {
		this.element = new TemplatedHtml("GraphOutput", graphTarget);
		this.functionTextElement = new TemplatedHtml(
			"functionTextOutput",
			functionTextTarget
		);
		this.centerPoint = new TemplatedHtml("centerPoint", this.element);
		this.pointElements = [];
		this.limit = 4;
		this.functionListCalculator = new FunctionListCalculator();
	}

	formatPointsForDisplay(points) {
		points = points.filter(
			(i) =>
				i.x < this.limit &&
				i.x > -this.limit &&
				i.y > -this.limit &&
				i.y < this.limit
		);
		points = points.map((i) => {
			i = i.times(1 / this.limit); //Bring within -1 and 1
			i = i.timesComponentwise(new Vec2(1, -1)); //Flip Y cus html
			i = i.add(new Vec2(1, 1)).times(0.5); //Bring between 0 and 1
			return i;
		});
		return points;
	}
	getText(cards){
		return this.functionListCalculator.getText(
			cards.filter((i) => i.activation == 1).map((i) => i.card)
		);
	}
	drawCardResult(cards) {
		//1 = fully with the activated cards

		var calcText = this.getText(cards);
		this.functionTextElement?.updateText(calcText);

		var points = this.functionListCalculator.calculateCardList(cards);

		points = this.formatPointsForDisplay(points);
		if (this.pointElements.length > points.length) {
			//more elements
			this.pointElements.forEach((p, i, array) => {
				if (i >= points.length) {
					const index = array.indexOf(p);
					if (index > -1) {
						// only splice array when item is found
						array.splice(index, 1); // 2nd parameter means remove one item only
					}
					p.element.remove();
				}
			});
		} else if (this.pointElements.length < points.length) {
			//more points
			var c = points.length - this.pointElements.length;
			for (var i = 0; i < c; i++) {
				var element = new TemplatedHtml("curveMarker", this.element);
				this.pointElements.push(element);
			}
		}
		points.forEach((p, i) => {
			var element = this.pointElements[i];
			element.element.style.top = Math.round(p.y * 100000) / 1000 + "%";
			element.element.style.left = Math.round(p.x * 100000) / 1000 + "%";
		});
	}
}

class FunctionEditor {
	constructor(changeCallBack) {
		this.baseElement = new TemplatedHtml(
			"functionEditor",
			document.getElementById("root")
		);
		this.changeCallback = changeCallBack;

		//Just put all the cards in, why not
		this.cards = mathFuncs.map((c, i, ar) => {
			var cardd =  new Card(
				c,
				(i  + 1) / (2 + ar.length),
				this.baseElement.getPart("cards")
			);
			if(i%2==0){
				cardd.position.y = 0.9;
			}
			cardd.updateToNewPosition()
			return cardd;
		});

		var c = 2;
		this.cards[c].position.y = 0.2;
		this.cards[c].activation = 1;
		this.cards[c].updateToNewPosition();

		c = 5;
		this.cards[c].position.y = 0.2;
		this.cards[c].activation = 1;
		this.cards[c].updateToNewPosition();

		this.cards.forEach((i) =>{
			
			i.element.appendInto(this.baseElement.getPart("cards"));
			i.canvasGrapher.draw();
		}
		);
		this.functionDrawer = new FunctionDrawer(
			this.baseElement.getPart("output"),
			this.baseElement.getPart("activeFunction")
		);
		this.cards.forEach((i) =>
			i.setupEvents(() => {
				this.onCardChange();
			})
		);
		this.onCardChange();
		this.animateCurve();
	}

	onCardChange() {
		this.cards = this.cards.sort((a, b) => a.position.x - b.position.x);
		if (this.cards.find((x) => x.activation > 0 && x.card.name.includes("t"))) {
			this.animateCurve();
		} else {
			this.stopCurveAnimation();
		}
		this.functionDrawer.drawCardResult(this.cards);
		this.changeCallback();
	}
	animateCurve(stop) {
		this.functionDrawer.drawCardResult(this.cards);
		if (this.onFunctionChange) {
			this.onFunctionChange();
		}

		this.animationTimeout = setTimeout(() => {
			this.animateCurve();
		}, 100);
	}
	stopCurveAnimation() {
		clearTimeout(this.animationTimeout);
	}
}

class TargetFunction {
	constructor(cardList, element) {
		this.functionDrawer = new FunctionDrawer(element);
		this.cardList = cardList;
		this.drawCurve();
	}
	drawCurve() {
		// pls fix this// pls fix this// pls fix this// pls fix this// pls fix this// pls fix this// pls fix this
		for (var i = 0; i < 10; i++) {
			this.functionDrawer.drawCardResult(this.cardList);
		}
		if (
			this.cardList.find((x) => x.activation > 0 && x.card.name.includes("t"))
		) {
			this.animateCurve();
		} else {
			this.stopCurveAnimation();
		}
	}
	animateCurve(stop) {
		this.functionDrawer.drawCardResult(this.cardList);
		if (this.onFunctionChange) {
			this.onFunctionChange();
		}
		this.animationTimeout = setTimeout(() => {
			this.animateCurve();
		}, 100);
	}
	stopCurveAnimation() {
		clearTimeout(this.animationTimeout);
	}

	compareToCurrent(userPoints) {
		this.drawCurve();

		var targetPoints = this.functionDrawer.functionListCalculator.calculateCardList(
			this.cardList
		);
		var currentPoints = userPoints; //this.functionDrawer.functionListCalculator.calculateCardList(createdCards);

		var totalDifference = 0;
		targetPoints.map((p, i) => {
			var target = p.y;
			var guess = currentPoints[i].y;
			if (isNaN(target) && isNaN(guess)) {
				totalDifference += 0;
				return;
			} else if (isNaN(target) || isNaN(guess)) {
				totalDifference += 100;
				return;
			}
			totalDifference += Math.abs(p.y - currentPoints[i].y);
		});

		return totalDifference;
	}
	generateNewCurve(complexity) {
		var list = [];
		var funcs = mathFuncs;
		const selected = mathFuncs
			.sort(() => 0.5 - Math.random())
			.slice(0, complexity);

		for (var i = 0; i < selected.length; i++) {
			var card = selected[i];
			var cardInstance = new Card(card, i);
			cardInstance.activation = 1;
			list.push(cardInstance);
		}
		this.cardList = list;
		this.drawCurve();
	}
}

class FunctionMatchGame {
	constructor() {
		this.thoughtTextOutput = new TemplatedHtml(
			"thought",
			document.getElementById("root")
		);
		this.functionEditor = new FunctionEditor(() => {
			this.onFunctionChange();
		});
		this.targetFunction = new TargetFunction(
			[],
			this.functionEditor.baseElement.getPart("output")
		);
		this.glitchyText = new GitchyText(
			"This gets hard.",
			this.thoughtTextOutput.element
		);
		getQuote((d) => {
			this.nextQuote = d.content;
		});
		this.nextQuote = "Awaiting";
		this.level = 1;
		this.accuracyOutput = new TemplatedHtml(
			"scoreOutput",
			this.functionEditor.baseElement.getPart("textContainer")
		);
		this.complexityOutput = new TemplatedHtml(
			"scoreOutput",
			this.functionEditor.baseElement.getPart("textContainer")
		);
		this.nextButton = new TemplatedHtml(
			"nextButton",
			this.functionEditor.baseElement.getPart("buttonContainer")
		);
		this.harderButton = new TemplatedHtml(
			"nextButton",
			this.functionEditor.baseElement.getPart("buttonContainer")
		);
		this.nextButton.element.addEventListener("click", () => {
			this.nextLevel();
		});
		this.harderButton.element.addEventListener("click", () => {
			this.nextLevel(true);
		});
		this.functionEditor.functionDrawer.centerPoint.updateText("💎");
		this.functionEditor.functionDrawer.centerPoint.element.style.filter =
			"hue-rotate(180deg)";
		this.targetFunction.generateNewCurve(1);
		this.onFunctionChange();
		this.currentComplexity = 1;
		this.updateLevelText();
	}

	onFunctionChange() {
		if (this.accuracyOutput) {
			var difference = this.getAccuracy();
			var score = 5 - Math.log(difference);
			this.hasPassed = score > 20 || isNaN(score);
			this.glitchyText.updateValue((score+4) / 10);
			this.accuracyOutput.updateText(
				"score:" + (this.hasPassed ? "✅" : Math.round(score * 100) / 100)
			);
			if (this.hasPassed) {
				this.setButtonState("NextLevel")
			} else {
				this.setButtonState("MidLevel")
			}
		}
	}
	setButtonState(state){
		switch(state){
			case "NextLevel":
				this.nextButton.element.style.background = "#e3e";
				this.nextButton.updateText("Next Wave");
				this.harderButton.element.style.display="block";
				this.harderButton.element.style.background = "#f33";
				this.harderButton.updateText("Harder Curves!!!");
				break;
			case "MidLevel":
				this.nextButton.element.style.background = "#efe";
				this.nextButton.updateText("Hint");
				this.harderButton.element.style.display="none";
				break;
		}
	}

	getAccuracy() {
		var accuracy = this.targetFunction.compareToCurrent(
			this.functionEditor.functionDrawer.functionListCalculator.savedPoints
		);
		return accuracy;
	}

	updateLevelText() {
		this.complexityOutput.updateText(
			"No. of cards:" + Math.round(this.currentComplexity * 10) / 10
		);
	}

	nextLevel(moreDifficult) {
		if (this.hasPassed) {
			this.level++;
			if(moreDifficult){
				this.currentComplexity++;
			}
			this.glitchyText.updateValue(0, true);
			this.glitchyText.updateText(this.nextQuote);
			getQuote((d) => {
				this.nextQuote = d.content;
			});
			this.updateLevelText();
			this.targetFunction.generateNewCurve(this.currentComplexity);
			this.onFunctionChange();
		}else{
			debugger;
			this.nextButton.updateText(this.targetFunction.functionDrawer.getText(this.targetFunction.cardList));
		
		}
	}
}

class TextScrambler {
	constructor(text) {
		this.text = text;
		this.letters =
			"qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!£$%^&*()-=_+[]{};'#:@~,./<>?";
	}
	updateScrambledness(amount) {
		var getRandomCharacter = () => {
			var index = Math.floor(Math.random() * this.letters.length);
			return this.letters[index];
		};

		var text = "";
		for (var i = 0; i < this.text.length; i++) {
			if (Math.random() > amount) {
				text += getRandomCharacter();
			} else {
				text += this.text[i];
			}
		}
		return text;
	}
}

class GitchyText {
	constructor(text, element) {
		this.element = element;
		this.value = 0;
		this.lerpingValue = 0;
		this.lerpSpeed = 0.2;
		this.textScrambler = new TextScrambler(text);
		this.loop();
	}
	updateValue(v, force) {
		this.value = clamp(0, v, 1);
		if (force) {
			this.lerpingValue = this.value;
		}
		this.loop();
	}
	updateText(text) {
		this.textScrambler.text = text;
		this.loop();
	}
	loop(stop) {
		/*if (!this.timeout) {
			this.lerpingValue = 0;
		}
		if (stop) {
			clearInterval(this.timeout);
			this.element.textContent = this.textScrambler.updateScrambledness(
				this.value
			);
			this.lerpingValue = this.value;
			return;
		}*/

		var delta = this.value - this.lerpingValue;
		if (delta < 0 || Math.abs(delta) < this.lerpSpeed) {
			this.lerpingValue = this.value;
		} else {
			this.lerpingValue = this.lerpingValue + Math.sign(delta) * this.lerpSpeed;
		}

		this.element.textContent = this.textScrambler.updateScrambledness(
			clamp(0, this.value, 1)
		);
	}
}

class CanvasGrapher {
	constructor(func,element){
		this.function = func;
		this.element = element;
	}
	
	draw(){
		//debugger;
		var canvas = this.element;
		var parentSize = canvas.parentElement;
		canvas.height = parentSize.offsetHeight+4;
		canvas.width = parentSize.offsetWidth;
		var ctx = this.element.getContext("2d");
		ctx.fillStyle="#ddd";
		var limit = DisplaySettings.limit;
		for(var ix=0;ix<canvas.width;ix++){
			var x = (((ix/canvas.width)*2)-1)*limit;
			var y = this.function(x);
			y = clamp(-limit,y,limit);
			var cy = ((((1-y)/DisplaySettings.limit)+1)/2)*canvas.height;
			ctx.fillRect(ix,cy,1,canvas.height);
		}
	}
	
}


var quoteInfo
async function getQuote(cb) {
	var url = "https://api.quotable.io/random?limit=10";
	fetch(url, { method: "GET" }) // Call the fetch function passing the url of the API as a parameter
		.then((res) => res.json())
		.then(function (res) {
			console.log(res);
			quoteInfo = {
				currentIndex:1,
				quotes:[],
			}
			cb(res);
			// Your code for handling the data you get from the API
		})
		.catch(function () {
			cb({ content: "Idk" });
			// This is where you run code if the server returns any errors
		});
}

var mathFuncs = [
	new CardType("x+1", (x) => x + 1),
	new CardType("x*-1", (x) => x * -1),
	new CardType("x⁻¹", (x) => Math.pow(x, -1)),
	new CardType("x²", (x) => Math.pow(x, 2)),
	new CardType("x³", (x) => Math.pow(x, 3)),
	new CardType("√x", (x) => Math.pow(x, 0.5)),
	new CardType("sin(x)", (x) => Math.sin(x)),
	new CardType("e^x", (x) => Math.pow(2, x)),
	new CardType("ln(x)", (x) => Math.log2(x)),//shhhh
	new CardType("x+sin(t)", (x) => x + Math.sin(time / 1000)),
	new CardType("|x|", (x) => Math.abs(x)),
	new CardType("x%2", (x) => x % 2)
	//new CardType("1%x", (x) => 1%x),
	//new CardType("x+randt", (x) => x+Math.random()),
	//new CardType("round(x)", (x) => Math.round(x))
];


var DisplaySettings = {
	limit: 4,
	spacing: 0.14
};

var matchGame = new FunctionMatchGame();

//to make time based calculations use the same time.
var time = 0;
setInterval(() => {
	time += 10;
}, 10);


//todo - Make update loops come from 1 place, not using timeouts.