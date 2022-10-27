let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({antialias: true});

document.getElementById('scene').appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB);

//Start

camera.position.set(65, 3, 0);
camera.lookAt(0, 0, 0)

let controls = new THREE.PointerLockControls(camera, document.getElementById('scene'));

let light = new THREE.SpotLight(0xffffff, 1.5, 1000, Math.PI / 2);
light.position.set(0, 0, 50);
scene.add(light);

let ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

const loader = new THREE.GLTFLoader();

loader.load('Assets/map_one/map_one.glb', function ( gltf ) {
        gltf.scene.scale.set(40, 40, 40);
		scene.add(gltf.scene);
	}
);

let blocker = document.getElementById('blocker');
let instructions = document.getElementById('instructions');
let crosshair = document.getElementById('crosshair');

instructions.addEventListener('click', function () {
    controls.lock();
});

controls.addEventListener('lock', function () {
    instructions.style.display = 'none';
    blocker.style.display = 'none';
    crosshair.style.display = 'block';
});

controls.addEventListener('unlock', function () {
    blocker.style.display = 'block';
    instructions.style.display = '';
    crosshair.style.display = 'none';
});

//Movement
const keysPressed = {};

const KEY_UP = 'arrowup';
const KEY_LEFT = 'arrowleft';
const KEY_DOWN = 'arrowdown';
const KEY_RIGHT = 'arrowright';
const KEY_W = 'w';
const KEY_A = 'a';
const KEY_S = 's';
const KEY_D = 'd';
const KEY_SHIFT = 'shift';

let playerSettings = {
    speed: 0.2,
    sprint: 0.3
}

function render(){
    updateControls();

    renderer.render(scene, camera);
    requestAnimationFrame(render);
};

function updateControls(){
    if(controls.isLocked){
        if(keysPressed[KEY_SHIFT]){
            if(keysPressed[KEY_W] || keysPressed[KEY_UP]){
                controls.moveForward(playerSettings['sprint']);
            }
    
            if(keysPressed[KEY_S] || keysPressed[KEY_DOWN]){
                controls.moveForward(-playerSettings['sprint']);
            }
    
            if(keysPressed[KEY_D] || keysPressed[KEY_RIGHT]){
                controls.moveRight(playerSettings['sprint']);
            }
    
            if(keysPressed[KEY_A] || keysPressed[KEY_LEFT]){
                controls.moveRight(-playerSettings['sprint']);
            }
        } else {
            if(keysPressed[KEY_W] || keysPressed[KEY_UP]){
                controls.moveForward(playerSettings['speed']);
            }
    
            if(keysPressed[KEY_S] || keysPressed[KEY_DOWN]){
                controls.moveForward(-playerSettings['speed']);
            }
    
            if(keysPressed[KEY_D] || keysPressed[KEY_RIGHT]){
                controls.moveRight(playerSettings['speed']);
            }
    
            if(keysPressed[KEY_A] || keysPressed[KEY_LEFT]){
                controls.moveRight(-playerSettings['speed']);
            }
        }
    }
    
}

render();

document.addEventListener('keydown', (event) => {
    keysPressed[event.key.toLowerCase()] = true;
}, false);

document.addEventListener('keyup', (event) => {
    keysPressed[event.key.toLowerCase()] = false;
}, false);