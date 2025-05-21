export function setupCamera(scene, canvas) {
    const camera = new BABYLON.ArcRotateCamera("camera", 0, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
    //alpha beta radius u silly idiot



    // Enable ORTHOGRAPHIC mode
    //camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

    // Define orthographic projection size (adjust these values as needed)
    //const orthoSize = 3; // Controls how much of the scene is visible
    //camera.orthoLeft = -orthoSize;
    //camera.orthoRight = orthoSize;
    //camera.orthoTop = orthoSize;
    //camera.orthoBottom = -orthoSize;





    var empty = scene.getMeshByName("Empty");

    //point the camera is looking at in the start
    camera.setTarget(new BABYLON.Vector3(-1.0 ,4.0, 0.0));
    camera.keysDown = '83'
    camera.keysUp = '87'
    camera.keysLeft = '65'
    camera.keysRight = '68'

    camera.upperBetaLimit = (Math.PI / 2);
    camera.lowerBetaLimit = Math.PI/2.5;
    camera.upperAlphaLimit = (Math.PI/6);
    camera.lowerAlphaLimit = -(Math.PI/6); 

    camera.minZ = 0.1;
    camera.angularSpeed = 0.05;

    camera.fov=1.25;

    //setting maximunm and minimum camera zoom
    camera.lowerRadiusLimit = 3;
    camera.upperRadiusLimit = 7;

    camera.panningAxis = new BABYLON.Vector3(0,1,0);
    camera.zoomingSensibility = 0;

    camera._panningMouseButton = 1;
    camera._useCtrlForPanning = false;


    


    camera.attachControl(canvas, false);
    camera.applyGravity = true;
    camera.checkCollisions = true;
    camera.ellipsoid = new BABYLON.Vector3(0.3, 0.6, 0.4);
    scene.activeCamera = camera;
    return camera;
}
