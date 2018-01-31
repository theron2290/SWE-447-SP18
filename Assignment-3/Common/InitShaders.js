//
//  initShaders.js
//

function initShaders( gl, vertexShader, fragmentShader )
{
    var vertShdr;
    var fragShdr;

    if (vertexShader === undefined ) {
        alert( 'No vertex shader provided to initShaders()' );
        return -1;
    }

    if (fragmentShader === undefined ) {
        alert( 'No fragment shader provided to initShaders()' );
        return -1;
    }
    
    var vertElem = document.getElementById( vertexShader ) || { text : vertexShader } ;
    
    vertShdr = gl.createShader( gl.VERTEX_SHADER );
    gl.shaderSource( vertShdr, vertElem.text );
    gl.compileShader( vertShdr );

    if ( !gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS) ) {
        var msg = "Vertex shader failed to compile.  The error log is:\n\n"
    	   + gl.getShaderInfoLog( vertShdr );
        alert( msg );
        return -1;
    }
    

    var fragElem = document.getElementById( fragmentShader ) || { text : fragmentShader }; 
    
    fragShdr = gl.createShader( gl.FRAGMENT_SHADER );
    gl.shaderSource( fragShdr, fragElem.text );
    gl.compileShader( fragShdr );

    if ( !gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS) ) {
        var msg = "Fragment shader failed to compile.  The error log is:\n\n"
    	   + gl.getShaderInfoLog( fragShdr );
        alert( msg );
        return -1;
    }

    var program = gl.createProgram();
    gl.attachShader( program, vertShdr );
    gl.attachShader( program, fragShdr );
    gl.linkProgram( program );
    
    if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {
        var msg = "Shader program failed to link.  The error log is:\n\n"
            + gl.getProgramInfoLog( program );
        alert( msg );
        return -1;
    }

    return program;
}