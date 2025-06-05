export function setupCamera(scene, canvas) {
    // Create FreeCamera (no rotation/zoom/orbit behavior)
    const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, 0), scene);

    // ORTHOGRAPHIC mode for 2D-like projection
    camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

    // Set initial position and rotation to face +X (like left to right pages)
    camera.position = new BABYLON.Vector3(10.0, 4.0, 0.0); 
    camera.rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);

    // Set orthographic bounds
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

    // Disable all mouse controls
    camera.inputs.clear();

    // Enable only up/down keyboard movement
    camera.keysUp = [87, 38];    // W or ↑
    camera.keysDown = [83, 40];  // S or ↓
    camera.keysLeft = [];
    camera.keysRight = [];

    // Mouse wheel scroll = vertical motion
    canvas.addEventListener("wheel", (e) => {
        //e.preventDefault();
        const scrollAmount = e.deltaY * 0.005;
        camera.position.y -= scrollAmount;
    }, { passive: false });




    // ✅ Handle touch scroll (vertical movement only)
  let lastTouchY = null;

  canvas.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      lastTouchY = e.touches[0].clientY;
    }
  });

  canvas.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1 && lastTouchY !== null) {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - lastTouchY;
      camera.position.y += deltaY * 0.02; // adjust scroll speed here
      lastTouchY = currentY;
      e.preventDefault(); // Prevent browser scrolling
    }
  });

  canvas.addEventListener("touchend", () => {
    lastTouchY = null;
  });





    // Attach and activate camera
    camera.attachControl(canvas, false);
    scene.activeCamera = camera;

    return camera;
}
