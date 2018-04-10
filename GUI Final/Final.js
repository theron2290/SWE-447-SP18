var scene, camera, renderer, mesh;
var floor;

var keyboard = {};
var viewer = {height: 1.8, speed:0.2, turnSpeed:Math.PI * 0.03};

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
	
	mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1,1,1),
		new THREE.MeshBasicMaterial({color:0xff9999, wireframe:false})
	);
	
	scene.add(mesh);
	
	floor = new THREE.Mesh(
		new THREE.PlaneGeometry(10,10, 10,10),
		new THREE.MeshBasicMaterial({color:0xffffff, wireframe: false})	
	);
	floor.rotation.x -= Math.PI / 2;
	scene.add(floor);
	
	camera.position.set(0,viewer.height,-5);
	camera.lookAt(new THREE.Vector3(0,viewer.height,0));
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(1280, 720);
	document.body.appendChild(renderer.domElement);
	
	animate();
}

function animate(){
	requestAnimationFrame(animate);
	
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
	
	 if (keyboard[87]){//w key
        camera.position.x -= Math.sin(camera.rotation.y) * viewer.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * viewer.speed;
    }
	if (keyboard[83]){//s key
        camera.position.x += Math.sin(camera.rotation.y) * viewer.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * viewer.speed;
    }
	if (keyboard[65]){//a key
        camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * viewer.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * viewer.speed;
    }
	if (keyboard[68]){//d key
        camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * viewer.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * viewer.speed;
    }
	if(keyboard[37]){ //left arrow key
		camera.rotation.y -= viewer.turnSpeed;
	}
	if(keyboard[39]){ //right arrow key
		camera.rotation.y += viewer.turnSpeed;
	}
	
	renderer.render(scene, camera);
}

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;