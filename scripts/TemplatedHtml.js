
export default class TemplatedHtml {
	constructor(templateClass, addToThisElement,fromTemplate=true) {
		if(!fromTemplate){
			this.constructWithExitsingElement(templateClass);
			return;
		}
		var telem = document.querySelector("#templates> ." + templateClass);

		if (!telem) {
			console.log("." + templateClass);
		}

		this.element = telem.cloneNode(true);
		if (addToThisElement) {
			this.appendInto(addToThisElement);
		}
	}
	constructWithExitsingElement(templateClass){
		var telem = document.querySelector("." + templateClass);
		
		if (!telem) {
			console.log("." + templateClass);
		}

		this.element = telem;
	}

	appendInto(elem) {
		if (elem.hasOwnProperty("element")) {
			//allow either TemplatedHtml or a dom element
			elem = elem.element;
		}
		elem.appendChild(this.element);
	}

	getPart(part) {
		return this.element.querySelector("." + part);
	}

	updateText(text, target) {
		//watch out, textcontent removes all the stuff in an element.
		if (!target) {
			this.element.textContent = text;
		} else {
			this.element.querySelector("." + target).textContent = text;
		}
	}
}

