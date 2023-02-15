import Vec2 from "./Vec2";

export class HtmlLine{
	constructor(container,from,to){
		this.lineProps = {width:0,rotation:0,translation:{}};
		this.from = new Vec2(0,0);
		if(from){
			this.from = from;
		}
		this.to = new Vec2(0,0);
		if(to){
			this.to = to;
		}
		
		initiliseElement(container,{lineWidth:"3px"})
		this.Update();
		this.Draw();
	}
    initiliseElement(container,s){
		this.element = document.createElement("div");
		container.appendChild(this.element);
		
        this.element.classList.add("lineSegment");
		this.element.style.height=s.lineWidth;
        this.element.style.position = "absolute";		
	}
	Update(newTo,newFrom){
	
		if(newTo){
			this.to = newTo;
		}
		if(newFrom){
			this.from = newFrom;	
		}
		
		var fromToVec = this.from.sub(this.to);//{x:this.from.x-this.to.x,y:this.from.y-this.to.y};

		this.lineProps.width = this.pythag(fromToVec);
		this.lineProps.rotation = (Math.PI)+this.angleTo(fromToVec);

		this.lineProps.width = fromToVec.magnitude();
		//line.offset({top:from.y,left:from.x});
		var basePos = {top:this.from.y,left:this.from.x-this.lineProps.width/2};
		basePos.left-=fromToVec.x/2;
		basePos.top-=fromToVec.y/2;
		this.lineProps.translation = basePos;
	}
	angleTo(vec){
		var x1 = vec.x;
		var y1 = vec.y;
		var x2 = 1;
		var y2 = 0;
		return Math.atan2(x1*y2-y1*x2,x1*x2+y1*y2)
	}
	pythag(vec){
		return Math.sqrt( Math.pow(vec.x,2)+Math.pow(vec.y,2)  );
	}
	Draw(){
		this.element.style.top = this.lineProps.translation.top+"px";
		this.element.style.left = this.lineProps.translation.left+"px";
		this.element.style.transform = "rotate(-"+this.lineProps.rotation+"rad)";
		this.element.style.width = this.lineProps.width+"px";
		
	}
}
