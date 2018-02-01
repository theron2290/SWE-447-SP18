
var gl = null;
var cone = null; 

function init() {
	
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    cone = new Cone(gl, 90);

    gl.clearColor( 0.0,  0.0,  0.0,  1.0,);
 
    render();
    
}


function render() {
	
    gl.clear( gl.COLOR_BUFFER_BIT );
   
	cone.render();
	
}

window.onload = init;
