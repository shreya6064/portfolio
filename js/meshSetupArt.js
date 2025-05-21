export async function loadMeshes(scene, babylonFile) {

    //console.log("load meshes called");
    const result = await BABYLON.SceneLoader.ImportMeshAsync("", "./babylon/", babylonFile, scene);
    const dragableMeshes = [];

    //console.log("🔍 All mesh names:");
    //result.meshes.forEach(mesh => console.log(mesh.name));

    result.meshes.forEach(mesh => {
        // Apply physics to cubes
        if (mesh.name.startsWith("img_fram")) {
        //if (mesh.name.includes("frame")){

            //console.log("BOOBIES");
            mesh.isPickable = true;  // Make mesh clickable
            mesh.checkCollisions = true;
            mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
                mesh,
                BABYLON.PhysicsImpostor.BoxImpostor,
                { mass: 0, 
                    friction: 0.4, 
                    restitution: 0.3,
                    /*
                    nativeOptions: {
                        linearDamping: 0.3,
                        angularDamping: 0.8
                    }
                    */
                },
                scene
            );

            mesh.physicsImpostor.physicsBody.linearDamping = 0.3;
            mesh.physicsImpostor.physicsBody.angularDamping = 0.8;

            dragableMeshes.push(mesh);
        } 




        // Apply static physics to walls and planes
        else if (mesh.name.startsWith("wall") || mesh.name.startsWith("Plane")) {
            mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
                mesh,
                BABYLON.PhysicsImpostor.BoxImpostor,
                { mass: 0, friction: 0.5, restitution: 0.7 },
                scene
            );
        }
    });

    return dragableMeshes;
}
