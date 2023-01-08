import * as THREE from 'three'
import { OrbitControls } from './OrbitControls';

function App() {
  // scene
  const scene = new THREE.Scene();

  // camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);

  const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);

  //renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //box
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00333366 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', animate);
  controls.minDistance = 5;
  controls.maxDistance = 50;
  controls.enablePan = false;

  function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    cubeCamera.update(renderer, scene)

    renderer.render(scene, camera);
  }

  animate();

}

export default App;
