const vertexShader = require("./shaders/vertexShader.glsl");
const fragShader = require ("./shaders/curveShader.glsl");

export class FunctionDrawerShader {
    constructor(canvas) {   
        this.canvas = canvas;
        this.gl;
        this. vp_size;
        this. prog;
        this.  bufObj = {};
        this. mousepos = [0, 0];
        this.progDraw;

        let initScene = ()=> {
            
            this.gl = canvas.getContext("experimental-webgl");
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
            status = this.gl.getProgramParameter(this.progDraw, this.gl.LINK_STATUS);
            if (!status) console.error(this.gl.getProgramInfoLog(this.progDraw));
            this.progDraw.inPos = this.gl.getAttribLocation(this.progDraw, "inPos");
            this.progDraw.iTime = this.gl.getUniformLocation(this.progDraw, "iTime");
            this.progDraw.iMouse = this.gl.getUniformLocation(this.progDraw, "iMouse");
            this.progDraw.iResolution = this.gl.getUniformLocation(this.progDraw, "iResolution");
            this.gl.useProgram(this.progDraw);

            var pos = [-1, -1, 1, -1, 1, 1, -1, 1];
            var inx = [0, 1, 2, 0, 2, 3];
             this.bufObj.pos = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER,  this.bufObj.pos);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(pos), this.gl.STATIC_DRAW);
             this.bufObj.inx = this.gl.createBuffer();
             this.bufObj.inx.len = inx.length;
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,  this.bufObj.inx);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(inx), this.gl.STATIC_DRAW);
            this.gl.enableVertexAttribArray(this.progDraw.inPos);
            this.gl.vertexAttribPointer(this.progDraw.inPos, 2, this.gl.FLOAT, false, 0, 0);

            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

            //window.onresize = resize;
            //resize();
            requestAnimationFrame(render);
        }

        var render=(deltaMS)=> {

            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            this.gl.uniform1f(this.progDraw.iTime, deltaMS / 1000.0);
            this.gl.uniform2f(this.progDraw.iResolution, this.canvas.width, this.canvas.height);
            this.gl.uniform2f(this.progDraw.iMouse, this.mousepos[0], this.mousepos[1]);
            this.gl.drawElements(this.gl.TRIANGLES,  this.bufObj.inx.len, this.gl.UNSIGNED_SHORT, 0);

            requestAnimationFrame(render);
        }

        initScene();
    }
    update(cardData) {
        
    }
}




