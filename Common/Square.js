function Square(gl, vertexShaderId, fragmentShaderId) {
	var vertShdr = vertexShaderId || "Square-vertex-shader";
	var fragShdr = fragmentShaderId || "Square-fragment-shader";

	this.program = initShaders(gl, vertShdr, fragShdr);

	if ( this.program < 0 ) {
    	alert( "Error: Square shader pipeline failed to compile.\n\n" +
    	    "\tvertex shader id:  \t" + vertShdr + "\n" +
    	    "\tfragment shader id:\t" + fragShdr + "\n" );
    	return; 
	}


	gl.useProgram(this.program);
	this.count = 24;

	this.positions = {
		values : new Float32Array([
			0.0,  0.0,  0.0,
			0.0,  1.0,  0.0,
			1.0,  0.0,  0.0,
			1.0,  1.0,  0.0,
  
			0.0,  0.0, 0.0,
			0.0,  1.0, 0.0,
			0.0,  0.0, -1.0,
			0.0,  1.0, -1.0,
  
			0.0,  1.0,  0.0,
			1.0,  1.0,  0.0,
			0.0,  1.0,  -1.0,
			1.0,  1.0,  -1.0,
  
			0.0,  0.0,  -1.0,
			0.0,  1.0,  -1.0,
			1.0,  0.0,  -1.0,
			1.0,  1.0,  -1.0,
  
			0.0,  1.0,  0.0,
			1.0,  1.0,  0.0,
			1.0,  1.0,  -1.0,
			0.0,  1.0,  -1.0,
  
			0.0,  0.0,  0.0,
			0.0,  1.0,  0.0,
			0.0,  0.0,  -1.0,
			0.0,  1.0,  -1.0,
		]),
		numComponents : 3 

	};
	this.colors = {
		values : new Float32Array([
	    1.0,  1.0,  1.0,
		1.0,  1.0,  1.0,  
		1.0,  1.0,  1.0,
		1.0,  1.0,  1.0,
			
		1.0,  0.0,  1.0,  
		1.0,  0.0,  1.0,
		1.0,  0.0,  1.0,  
		1.0,  0.0,  1.0,
		
		0.0,  1.0,  1.0,
		0.0,  1.0,  0.0,  
		0.0,  1.0,  0.0,
		0.0,  1.0,  0.0,
		
		0.5,  0.5,  0.0,  
		0.5,  0.5,  0.0,  
		0.5,  0.5,  0.0,
		0.5,  0.5,  0.0,
		
		1.0,  1.0,  0.0,
		1.0,  1.0,  0.0,
		1.0,  1.0,  0.0,
		1.0,  1.0,  0.0,
			
		0.0,  0.0,  0.0,
		0.0,  0.0,  0.0,  
		0.0,  0.0,  0.0,  
		0.0,  0.0,  0.0,
		]),
		numComponents : 3
	};
    this.indices = {
    values : new Uint16Array([ 
		 0,  1,  2,      0,  2,  3,    
		4,  5,  6,      4,  6,  7,    
		8,  9,  10,     8,  10, 11,  
		12, 13, 14,     12, 14, 15,  
		16, 17, 18,     16, 18, 19,  
		20, 21, 22,     20, 22, 23, 
	])
    };
	
	// positions
	
	this.positions.buffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );
	this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
	gl.enableVertexAttribArray( this.positions.attributeLoc );

	// colors
    this.colors.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.colors.values, gl.STATIC_DRAW );
    this.colors.attributeLoc = gl.getAttribLocation( this.program, "vColor" );
    gl.enableVertexAttribArray( this.colors.attributeLoc );
    
	// indices
    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );
    

	this.render = function () {
    	gl.useProgram( this.program );
    	//gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    	gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    	gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
        		gl.FLOAT, gl.FALSE, 0, 0 );

           
    	gl.bindBuffer( gl.ARRAY_BUFFER, this.colors.buffer );
    	gl.vertexAttribPointer( this.colors.attributeLoc, this.colors.numComponents,
        		gl.FLOAT, gl.FALSE, 0, 0 );
	
        //gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
		var start = 0;
		var count = this.count;
		//gl.drawArrays(gl.TRIANGLE_STRIP, start, count); // TRIANGLE_STRIP
		gl.drawElements(gl.TRIANGLES, this.indices.values.length, gl.UNSIGNED_SHORT, 0);

	};

};

