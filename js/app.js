//Define your globals
var camera, scene, renderer,
    mouseX = 0, mouseY = 0,
    particles = [];

//Call init function
init();
update();

//Define init function
function init () {
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;
  //Arg 1 is field of view; angle in degrees, where the larger the angle, the wider the lens
  //Arg 2 is the aspect ration; has to match the aspect of canvas renderer
  //Arg 3, 4 are near and far; they define the range that the camera can see
  camera = new THREE.PerspectiveCamera(80, WIDTH/HEIGHT, 1, 4000);

  //Position camera
  camera. position.z = 1000;

  //Scene
  scene = new THREE.Scene();
  scene.add(camera);

  //Renderer
  //What is the difference between this and a WebGL Renderer
  renderer = new THREE.CanvasRenderer();
  renderer.setSize(WIDTH, HEIGHT);

  //add renderer's canvas domElement to body
  //we want the canvas to fill the whole browser so we set height and width
  //accordingly
  document.body.appendChild(renderer.domElement);

  makeParticles();

  document.addEventListener('mousemove', onMouseMove, false);

}

function update() {
  updateParticles();
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

function get_random_color() {
  function c() {
    return Math.floor(Math.random()*256).toString(16);
  }
  return "#"+c()+c()+c();
}

function makeParticles() {
  var particle, material;
  for (var zpos= -1000; zpos < 1000; zpos+=20){
    var color = get_random_color();
    material = new THREE.ParticleCanvasMaterial( {color: color, program: particleRender});
    particle = new THREE.Particle(material);
    particle.position.x = Math.random() * 1000 - 500;
    particle.position.y = Math.random() * 1000 - 500;
    particle.position.z = zpos;
    //Make particles larger
    particle.scale.x = particle.scale.y = 10;
    scene.add(particle);
    //Fill up that particle array
    particles.push(particle);
  }
}

function particleRender(context) {
  context.beginPath();
  context.arc(0,0,1,0, Math.PI * 2, true);
  context.fill();
}

function updateParticles() {
  for (var i=0; i<particles.length; i++){
    particle = particles[i];
    particle.position.z += mouseY * 0.1;

    if (particle.position.z > 1000) particle.position.z-=2000;
  }
}

function onMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}
