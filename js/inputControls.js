export function setupInputControls(scene, camera, canvas, panYLimits = { min: -Infinity, max: Infinity }) {
    //const minPanY = -18; // adjust to fit your scene
    //const maxPanY = 5;


    // Handle keyboard controls
    scene.onKeyboardObservable.add((eventData) => {
        const evt = eventData.event;

        if (evt.key === 'ArrowUp') {
            camera.inertialPanningY += 0.05; // Adjust speed as needed
        }
        if (evt.key === 'ArrowDown') {
            camera.inertialPanningY -= 0.05;
        }
        if (evt.key === 'ArrowLeft') {
            camera.alpha -= 0.05; // Rotate camera to the left
        }
        if (evt.key === 'ArrowRight') {
            camera.alpha += 0.05; // Rotate camera to the right
        }
    }, BABYLON.KeyboardEventTypes.KEYDOWN);

    // Handle mouse wheel for zoom
    const mousewheel = camera.inputs.attached.mousewheel;
    camera.inputs.remove(mousewheel);

    scene.onPointerObservable.add((eventData) => {
        const evt = eventData.event;
        const wheelSensitivity = 1500;  // Adjust sensitivity as needed
        const moveFactor = evt.deltaY / wheelSensitivity;

        camera.inertialPanningY -= moveFactor;
    }, BABYLON.PointerEventTypes.POINTERWHEEL);


    //Clamp vertical panning (camera.target.y)
    scene.onBeforeRenderObservable.add(() => {
        const target = camera.target;
        if (target.y < panYLimits.min) target.y = panYLimits.min;
        if (target.y > panYLimits.max) target.y = panYLimits.max;
    });







    // Optionally, disable some inputs if needed
    camera.attachControl(canvas, false);
}
