var gl;
var program;

var Cone = {          
	positions : { 
		numComponents : 3
	},      

	indices : {},
	
	program : undefined,

	init : function() {

		var numSides = 8;     
		var dTheta = 2.0 * Math.PI / numSides;         
	
		var positions = [ 0.0, 0.0, 0.0 ];
		var indices = [0];	
	
		for ( var i = 0; i < numSides; ++i ) {         
			var theta = i * dTheta;         
			var x = Math.cos(theta),             
				y = Math.sin(theta),             
				z = 0.0;                     
			
		positions.push(x, y, z);
		indices.push(i+1);
		}
		
		indices.push(1);
		
		positions.push(0.0, 0.0, 1.0);
		
		indices = indices.concat(indices);
		indices[numSides + 2] = numSides + 1;
		
		this.program = initShaders(gl, "Cone-vertex-shader", "Cone-fragment-shader");
		this.positions.buffer = gl.createBuffer();     
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);     
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
		
		this.indices.buffer = gl.createBuffer();     
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);     
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		
		this.positions.attribute = gl.getAttribLocation(this.program, "vPosition");
	},

	draw : function () {         
		gl.useProgram(this.program);         
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);     
		gl.vertexAttribPointer(this.positions.attribute, this.positions.numComponents,         
			gl.FLOAT, gl.FALSE, 0, 0);     
		gl.enableVertexAttribArray(this.positions.attribute);         
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);              
		
		var count = 10;     
		var offset = 0;      
		gl.drawElements(gl.TRIANGLE_FAN, count, gl.UNSIGNED_SHORT, offset);         
		
		count = 10;      
		offset = 10 * 2;     
		gl.drawElements(gl.TRIANGLE_FAN, count, gl.UNSIGNED_SHORT, offset); 
	}
}



function init() {
	
	var canvas = document.getElementById("webgl-canvas");
	
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {return; }
	
	gl.clearColor(1.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	Cone.init();
	
	render();

}


function render() {
	
	Cone.draw();
	
}

window.onload = init