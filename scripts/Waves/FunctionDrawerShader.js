import { CardFuncer } from "./CardFuncer";

const vertexShader = require("./shaders/vertexShader.glsl");
const fragShader = require("./shaders/curveShader.glsl");

const maxFunctions = 9;

export class FunctionDrawerFactory{
    constructor(){}
    getFunctionDrawer(){
        if(!this.isMobile() && this.webgl_support()){
            return FunctionDrawerShader;
        }else{
            return FunctionDrawerCanvas;
        }
    }
    webgl_support () { 
        try {
         var canvas = document.createElement('canvas'); 
         return !!window.WebGLRenderingContext &&
           (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch(e) {
          return false;
        }
      }
      isMobile() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      };
}


class FunctionDrawerShader {
    constructor(canvas) {
        this.canvas = canvas;
        this.gl;
        this.vp_size;
        this.prog;
        this.bufObj = {};
        this.mousepos = [0, 0];
        this.progDraw;

        let initScene = async () => {

            this.gl = canvas.getContext("webgl");
            if (!this.gl)
                return;

            this.canvas.addEventListener('mousemove', (e) => {
                this.mousepos = [e.clientX, e.clientY];
            });

            this.progDraw = this.gl.createProgram();
            let status;
            for (let i = 0; i < 2; ++i) {
                let source = i == 0 ? vertexShader : fragShader;
                let shaderObj = this.gl.createShader(i == 0 ? this.gl.VERTEX_SHADER : this.gl.FRAGMENT_SHADER);
                this.gl.shaderSource(shaderObj, source);
                this.gl.compileShader(shaderObj);
                status = this.gl.getShaderParameter(shaderObj, this.gl.COMPILE_STATUS);
                if (!status) console.error(this.gl.getShaderInfoLog(shaderObj));
                this.gl.attachShader(this.progDraw, shaderObj);
                this.gl.linkProgram(this.progDraw);
            }
            

            
            function* linkingProgress(programs) {
                const ext = this.gl.getExtension("KHR_parallel_shader_compile");
                let todo = programs.slice();
                while (todo.length) {
                  if (ext) {
                    todo = todo.filter(
                      (x) => !gl.getProgramParameter(x, ext.COMPLETION_STATUS_KHR)
                    );
                  } else {
                    const x = todo.pop();
                    gl.getProgramParameter(x, gl.LINK_STATUS);
                  }
                  if (!todo.length) return;
                  yield 1.0 - todo.length / programs.length;
                }
              }

            

            const ext = this.gl.getExtension("KHR_parallel_shader_compile");
            if(ext){
                status = this.gl.getProgramParameter(this.progDraw, ext.COMPLETION_STATUS_KHR);
                console.log("doing khr thing");
            }else{
                status = this.gl.getProgramParameter(this.progDraw, this.gl.LINK_STATUS);
                console.log("not doing khr thing");
            }
            if (!status) console.error(this.gl.getProgramInfoLog(this.progDraw));


            this.progDraw.inPos = this.gl.getAttribLocation(this.progDraw, "inPos");
            this.progDraw.iTime = this.gl.getUniformLocation(this.progDraw, "iTime");
            this.progDraw.iMouse = this.gl.getUniformLocation(this.progDraw, "iMouse");
            this.progDraw.iResolution = this.gl.getUniformLocation(this.progDraw, "iResolution");

            //----function uniforms---
            this.progDraw.functionUniforms = [];
            for (var i = 0; i < maxFunctions; i++) {
                this.progDraw.functionUniforms[i] = this.gl.getUniformLocation(this.progDraw, "uFunc" + (i + 1));
            }
            this.progDraw.uActivatingFuncIndex = this.gl.getUniformLocation(this.progDraw, "uActivatingFuncIndex");
            this.progDraw.uActivationAmount = this.gl.getUniformLocation(this.progDraw, "uActivationAmount");


            this.gl.useProgram(this.progDraw);

            var pos = [-1, -1, 1, -1, 1, 1, -1, 1];
            var inx = [0, 1, 2, 0, 2, 3];
            this.bufObj.pos = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufObj.pos);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(pos), this.gl.STATIC_DRAW);
            this.bufObj.inx = this.gl.createBuffer();
            this.bufObj.inx.len = inx.length;
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.bufObj.inx);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inx), this.gl.STATIC_DRAW);
            this.gl.enableVertexAttribArray(this.progDraw.inPos);
            this.gl.vertexAttribPointer(this.progDraw.inPos, 2, this.gl.FLOAT, false, 0, 0);

            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            var resize = ()=>{
                this.gl.uniform2f(this.progDraw.iResolution, this.canvas.width, this.canvas.height);
            }
            window.addEventListener("resize",()=>{
              this.onResize();  
            });
            requestAnimationFrame(render);
        }

        var render = (deltaMS) => {

            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            this.gl.uniform1f(this.progDraw.iTime, deltaMS / 1000.0);
            this.gl.uniform2f(this.progDraw.iResolution, this.canvas.width, this.canvas.height);
            this.gl.uniform2f(this.progDraw.iMouse, this.mousepos[0], this.mousepos[1]);
            this.gl.drawElements(this.gl.TRIANGLES, this.bufObj.inx.len, this.gl.UNSIGNED_SHORT, 0);

            requestAnimationFrame(render);
        }

        

        initScene();
        
    }
    
    onResize(){
        this.canvas.width = 0;
        this.canvas.width = this.canvas.parentElement.getBoundingClientRect().width;
        this.canvas.height=  this.canvas.getBoundingClientRect().height;
        //this.canvas.height = this.canvas.parentElement.getBoundingClientRect().height;
    }
    drawCardResult(cardData) {
        //^list of cards
        if(!this.gl){
            return;
        }
        var activeCards = cardData.filter(i => i.activation != 0);

        //already sorted
        
        for (var i = 0; i < maxFunctions; i++) {
            if (activeCards.length <= i) {
                this.gl.uniform1i(this.progDraw.functionUniforms[i], 0);
                continue;
            }
            var card = activeCards[i];
            this.gl.uniform1i(this.progDraw.functionUniforms[i], card.card.index);
        }

        var activatingCardIndex = activeCards.findIndex(i => i.activation != 0 && i.activation != 1);
        var activatingCardAmount = activeCards.find(i => i.activation != 0 && i.activation != 1)?.activation ?? 0;

        this.gl.uniform1i(this.progDraw.uActivatingFuncIndex, activatingCardIndex);
        this.gl.uniform1f(this.progDraw.uActivationAmount, activatingCardAmount);
      
    }
}


class FunctionDrawerCanvas{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        window.addEventListener("resize",()=>{
            this.onResize();  
        });
    }
    onResize(){
        this.canvas.width = 0;
        this.canvas.width = this.canvas.parentElement.getBoundingClientRect().width;
        this.canvas.height=  this.canvas.getBoundingClientRect().height;
        this.drawCardResult(false);
    }
    drawCardResult(cardData,points){
        
        
        if(!cardData){
            cardData = this.prevData.cardData;
            points = this.prevData.points;
        }else{
            this.prevData = {cardData:cardData,points:points};
        }

        var cardFuncer = new CardFuncer();
        cardFuncer.setCards(cardData);

        var values = [];
        if(points){
            values = points.map(i=>-i.y);
        }else{
            for(var x=-5;x<5;x+=0.1){
                values.push(cardFuncer.evaluate(x));
            }
        }

        var pointTransform = (i,v)=>{
            var p = i/values.length;
            var x = p*this.canvas.width;
            var y = ((v/5)+0.5)*this.canvas.height;
            return {x:x,y:y};
        }

        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(pointTransform(0,values[0]).x,pointTransform(0,values[0]).y);
        for(var i = 1;i<values.length;i++){
            var p = pointTransform(i,values[i]);
            this.ctx.lineTo(p.x,p.y);
        }
        this.ctx.stroke();

    }
}



