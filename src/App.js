import * as THREE from 'three'
import { OrbitControls } from './OrbitControls';

function App() {
  //colors
  const RED = 0x00990000
  const WHITE = 0xffffff
  const BLUE = 0x00333366


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
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: WHITE }));
  const material = new THREE.MeshBasicMaterial({ color: BLUE });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  scene.add(line);

  //table
  const tableGeometry = new THREE.BoxGeometry(10, 0.1, 10,);
  const tableEdges = new THREE.EdgesGeometry(tableGeometry);
  const tableLine = new THREE.LineSegments(tableEdges, new THREE.LineBasicMaterial({ color: WHITE }));
  const tableMaterial = new THREE.MeshBasicMaterial({ color: RED });
  const table = new THREE.Mesh(tableGeometry, tableMaterial);
  table.position.y = -2;
  tableLine.position.y = -2;
  scene.add(table);
  scene.add(tableLine);

  //grid
  const size = 10;
  const divisions = 10;

  const gridHelper = new THREE.GridHelper(size, divisions);
  gridHelper.position.y = -1.95;
  scene.add(gridHelper);

  // controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', animate);
  controls.minDistance = 5;
  controls.maxDistance = 50;
  controls.enablePan = true;

  function animate() {
    requestAnimationFrame(animate);

    cubeCamera.update(renderer, scene)

    renderer.render(scene, camera);
  }

  animate();

}

export default App;
