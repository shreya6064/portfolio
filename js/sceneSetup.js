
export function initializeEngine(canvas) {
    const engine = new BABYLON.Engine(canvas, true);

    // Handle resizing
    //window.addEventListener("resize", () => engine.//resize());
    function resizeCanvas() {
        // Get available space (excluding other UI elements if needed)
        const availableWidth = window.innerWidth; 
        const availableHeight = window.innerHeight;

        // Adjust canvas size dynamically
        canvas.style.width = `${availableWidth}px`;
        canvas.style.height = `${availableHeight}px`;
        engine.resize();
    }

    // Initial resize
    resizeCanvas();

    // Listen for window resize
    window.addEventListener("resize", resizeCanvas);


    return engine;
}



export function createScene(engine) {
    const scene = new BABYLON.Scene(engine);

    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.OimoJSPlugin()); //cleaner
    //scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin()); //more natural


    scene.collisionsEnabled = true;
    //scene.clearColor = new BABYLON.Color4(0.086, 0.086, 0.086, 1.0);  // Transparent background
    scene.clearColor = new BABYLON.Color4(0.0, 0.0, 0.0, 0.0); 
    //scene.clearColor = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0); 


    // ✨ Add FXAA antialiasing pipeline
    scene.onReadyObservable.add(() => {
        if (scene.activeCamera) {
            const pipeline = new BABYLON.DefaultRenderingPipeline(
                "defaultPipeline",
                true,
                scene,
                [scene.activeCamera]
            );
            pipeline.samples = 4;
            pipeline.fxaaEnabled = true;
        }
    });




    return scene;
}
