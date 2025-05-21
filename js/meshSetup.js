export async function loadMeshes(scene, babylonFile) {
    const result = await BABYLON.SceneLoader.ImportMeshAsync("", "./babylon/", babylonFile, scene);
    const dragableMeshes = [];

    result.meshes.forEach(mesh => {
        // Apply physics to cubes
        if (mesh.name.startsWith("Cube")) {
            mesh.isPickable = true;  // Make mesh clickable
            mesh.checkCollisions = true;
            mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
                mesh,
                BABYLON.PhysicsImpostor.BoxImpostor,
                { mass: 2, friction: 0.2, restitution: 0.3 },
                scene
            );
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
