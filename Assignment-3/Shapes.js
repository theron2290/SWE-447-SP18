// Projection transformation parameters
var P = undefined;  // matrix storing the projection transformation
var near = 1.0;     // near clipping plane's distance
var far = 10.0;     // far clipping plane's distance

// Viewing transformation parameters
var V = undefined;
var angle = 0.0;
var dAngle = Math.PI / 10.0;

function init() {
  canvas = document.getElementById("webgl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL initialization failed"); }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Configure our objects
  Objects = [  /*Cube,*/ /*Cylinder,*/ Cone ];

  //Cube.offset = [ -3.0,  3.0, 0.0 ];
  //Cylinder.offset = [-3.0, 0.0, 0.0];
  Cone.offset = [0.0, -3.0, 0.0];
  
  

  Objects.forEach( function(obj) {
    obj.init(); 

    obj.update = function (angle) {
      var axis = [ 1.0, 1.0, 1.0 ];
      var M = mult(translate(this.offset), rotate(angle, axis));
  
      var MV = mult(V, M);
  
      gl.useProgram(this.program);
      gl.uniformMatrix4fv(this.uniforms.P, false, flatten(P));
      gl.uniformMatrix4fv(this.uniforms.MV, false, flatten(MV));
    };

    obj.uniforms = { 
      MV : gl.getUniformLocation(obj.program, "MV"),
      P : gl.getUniformLocation(obj.program, "P"),
    };
  });


  resize();

  window.requestAnimationFrame(render);  
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  V = translate(0.0, 0.0, -0.5*(near + far));

  angle += dAngle;

  Objects.forEach( function(obj) {
    obj.update(angle);
    obj.draw();
  });

  window.requestAnimationFrame(render);
}

function resize() {
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;

  gl.viewport(0, 0, w, h);

  var fovy = 120.0; // degrees
  var aspect = w / h;

  P = perspective(fovy, aspect, near, far);
}

window.onload = init;
window.onresize = resize;