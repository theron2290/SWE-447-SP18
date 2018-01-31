"use strict";

	var gl;
	var program;
	
	var Cube = {
		count : 24,
		positions : {
			values : new Float32Array([
			-1.0, -1.0,  1.0,
			1.0, -1.0,  1.0,
			1.0,  1.0,  1.0,
			-1.0,  1.0,  1.0,
  
			-1.0, -1.0, -1.0,
			-1.0,  1.0, -1.0,
			1.0,  1.0, -1.0,
			1.0, -1.0, -1.0,
  
			-1.0,  1.0, -1.0,
			-1.0,  1.0,  1.0,
			1.0,  1.0,  1.0,
			1.0,  1.0, -1.0,

			-1.0, -1.0, -1.0,
			1.0, -1.0, -1.0,
			1.0, -1.0,  1.0,
			-1.0, -1.0,  1.0,

			1.0, -1.0, -1.0,
			1.0,  1.0, -1.0,
			1.0,  1.0,  1.0,
			1.0, -1.0,  1.0,

			-1.0, -1.0, -1.0,
			-1.0, -1.0,  1.0,
			-1.0,  1.0,  1.0,
			-1.0,  1.0, -1.0
			]),
			numComponents : 3
		},		
		indices : {
			values : new Uint16Array([
				0,  1,  2,	 0,  2,  3,
				4,  5,  6,	 4,  6,  7,
				8,  9,  10,	 8, 10, 11,
				12, 13, 14,	12, 14, 15,
				16, 17, 18,	16, 18, 19,
				20, 21, 22,	20, 22, 23
			]),
		},
		
		init : function() {
			//positions
			this.program = initShaders(gl, "Cube-vertex-shader", "Cube-fragment-shader");
			this.positions.buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
			gl.bufferData(gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW);
			this.positions.attributes = gl.getAttribLocation(this.program, "vPosition");
			
			//indices
			this.indices.buffer = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW);
			
		},
			
			draw : function() {
				
			gl.useProgram(this.program);
			gl.bindBuffer(gl.ARRAY_BUFFER, this.positions.buffer);
			gl.vertexAttribPointer(this.positions.attribute, this.positions.numComponents, gl.FLOAT, gl.FALSE, 0, 0);
			gl.enableVertexAttribArray(this.positions.attribute);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer);
			gl.drawElements(gl.TRIANGLES, this.indices.values.length, gl.UNSIGNED_SHORT, 0);

		},
		
	};
	
function init() {
	
	var canvas = document.getElementById("webgl-canvas");
		
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {return; }
		
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
		
	//positions
	Cube.init();
		
	render();

	
}

function render() {
	
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	Cube.draw();
}

window.onload = init;