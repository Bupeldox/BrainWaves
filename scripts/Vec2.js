export default class Vec2 {
	//My handy vec2 class ;)
	constructor(x, y) {
		if (x.hasOwnProperty("x") && y && y.hasOwnProperty("x")) {
			var out = y.sub(x);
			this.x = out.x;
			this.y = out.y;
		} else if (x.hasOwnProperty("x")) {
			this.x = x.x;
			this.y = x.y;
		} else if (x.hasOwnProperty("length")) {
			this.x = x[0];
			this.y = x[1];
		} else {
			this.x = x;
			this.y = y;
		}
	}

	distance(vec) {
		var delta = this.sub(vec);
		return delta.magnitude();
	}

	add(vec) {
		return new Vec2(this.x + vec.x, this.y + vec.y);
	}
	sub(vec) {
		return new Vec2(this.x - vec.x, this.y - vec.y);
	}
	times(factor) {
		return new Vec2(this.x * factor, this.y * factor);
	}
	magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	normalised(length = 1) {
		var out = this.times(length / this.magnitude());

		return new Vec2(out.x, out.y);
	}
	dot(vec) {
		return this.x * vec.x + this.y * vec.y;
	}
	angle(vec) {
		if (!vec) {
			vec = new Vec2(0, 1);
		}

		var dp = vec.normalised().dot(this.normalised());
		var ang = Math.acos(dp);
		if (vec.rotate(Math.PI / 2).dot(this) < 0) {
			ang *= -1;
		}
		return ang;
	}

	clone() {
		return new Vec2(this.x, this.y);
	}
	rotate(theta) {
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);
		var x = this.x * cos - this.y * sin;
		var y = this.x * sin + this.y * cos;
		return new Vec2(x, y);
	}
	timesComponentwise(vec) {
		return new Vec2(this.x * vec.x, this.y * vec.y);
	}
}
