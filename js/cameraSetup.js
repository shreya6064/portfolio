export function setupCamera(scene, canvas) {
  const camera = new BABYLON.ArcRotateCamera("camera", 0, Math.PI / 2, 10, new BABYLON.Vector3(-1.0, 4.0, 0.0), scene);
  camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

  // Set orthographic bounds dynamically
  const resizeOrtho = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const ratio = width / height;
    const orthoSize = 3;

    camera.orthoLeft = -orthoSize * ratio;
    camera.orthoRight = orthoSize * ratio;
    camera.orthoTop = orthoSize;
    camera.orthoBottom = -orthoSize;
  };
  resizeOrtho();
  window.addEventListener("resize", resizeOrtho);

  // 🔒 Lock rotation
  camera.alpha = 0;
  camera.beta = Math.PI / 2;
  camera.lowerAlphaLimit = camera.alpha;
  camera.upperAlphaLimit = camera.alpha;
  camera.lowerBetaLimit = camera.beta;
  camera.upperBetaLimit = camera.beta;

  // 🔒 Lock zoom
  //camera.radius = 45;
  //camera.lowerRadiusLimit = camera.radius;
  //camera.upperRadiusLimit = camera.radius;

  // ✅ Allow vertical panning only
  camera.panningAxis = new BABYLON.Vector3(0, 1, 0);
  camera.panningSensibility = 1000; // higher = slower scroll
  camera.useAutoRotationBehavior = false;

  // ❌ Disable zooming
  camera.wheelPrecision = 0;
  camera.zoomingSensibility = 0;

  // 🖱️ Optional: enable panning on left click instead of right
  camera._panningMouseButton = 0;

  // 🎯 Ensure good scroll experience
  camera.attachControl(canvas, true);
  //camera.inputs.attached.mouse.buttons = [0]; // Left click only
  scene.activeCamera = camera;

  return camera;
}
