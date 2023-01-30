
export default class TemplatedHtml {
	constructor(templaceClass, addToThisElement) {
		this.element = document
			.querySelector("#templates> ." + templaceClass)
			.cloneNode(true);
		if (addToThisElement) {
			this.appendInto(addToThisElement);
		}
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

	updateText(text,target) {
		//watch out, textcontent removes all the stuff in an element.
		if (!target) {
			this.element.textContent = text;
		} else {
			this.element.querySelector("." + target).textContent = text;
		}
	}
}

