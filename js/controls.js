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
    walk: 0.2,
    sprint: 0.3,
    walkSFX: 1.5,
    sprintSFX: 2
}

let safePos = {
    x: undefined,
    y: undefined,
    z: undefined
}

let walkSound = new Audio("Assets/Audio/walk.mp3");
walkSound.loop = true;

let controls = new THREE.PointerLockControls(camera, document.getElementById('scene'));

let blocker = document.getElementById('blocker');
let instructions = document.getElementById('instructions');
let crosshair = document.getElementById('crosshair');

instructions.addEventListener('click', function () {
    controls.lock();
}, false);

controls.addEventListener('lock', function () {
    instructions.style.display = 'none';
    blocker.style.display = 'none';
    crosshair.style.display = 'block';
}, false);

controls.addEventListener('unlock', function () {
    blocker.style.display = 'block';
    instructions.style.display = '';
    crosshair.style.display = 'none';
}, false);

function updateControls(){
    if(controls.isLocked){
        if(keysPressed[KEY_SHIFT]){
            if(keysPressed[KEY_W] || keysPressed[KEY_UP]){
                controls.moveForward(playerSettings['sprint']);
                walkSound.playbackRate = playerSettings['sprintSFX'];
                walkSound.play();
            }
    
            if(keysPressed[KEY_S] || keysPressed[KEY_DOWN]){
                controls.moveForward(-playerSettings['sprint']);
                walkSound.playbackRate = playerSettings['sprintSFX'];
                walkSound.play();
            }
    
            if(keysPressed[KEY_D] || keysPressed[KEY_RIGHT]){
                controls.moveRight(playerSettings['sprint']);
                walkSound.playbackRate = playerSettings['sprintSFX'];
                walkSound.play();
            }
    
            if(keysPressed[KEY_A] || keysPressed[KEY_LEFT]){
                controls.moveRight(-playerSettings['sprint']);
                walkSound.playbackRate = playerSettings['sprintSFX'];
                walkSound.play();
            }
        } else {
            if(keysPressed[KEY_W] || keysPressed[KEY_UP]){
                controls.moveForward(playerSettings['walk']);
                walkSound.playbackRate = playerSettings['walkSFX'];
                walkSound.play();
            }
    
            if(keysPressed[KEY_S] || keysPressed[KEY_DOWN]){
                controls.moveForward(-playerSettings['walk']);
                walkSound.playbackRate = playerSettings['walkSFX'];
                walkSound.play();
            }
    
            if(keysPressed[KEY_D] || keysPressed[KEY_RIGHT]){
                controls.moveRight(playerSettings['walk']);
                walkSound.playbackRate = playerSettings['walkSFX'];
                walkSound.play();
            }
    
            if(keysPressed[KEY_A] || keysPressed[KEY_LEFT]){
                controls.moveRight(-playerSettings['walk']);
                walkSound.playbackRate = playerSettings['walkSFX'];
                walkSound.play();
            }
        }
    }   
}

document.addEventListener('keydown', (event) => {
    keysPressed[event.key.toLowerCase()] = true;
}, false);

document.addEventListener('keyup', (event) => {
    keysPressed[event.key.toLowerCase()] = false;
    if(event.key.toLowerCase() == 'w' || event.key.toLowerCase() == 'a' || event.key.toLowerCase() == 's' || event.key.toLowerCase() == 'd'){
        walkSound.pause();
    }
}, false);