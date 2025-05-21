export async function loadMeshes(scene) {
    const result = await BABYLON.SceneLoader.ImportMeshAsync("", "./babylon/", "boxes2.babylon", scene);
    const dragableMeshes = [];

    result.meshes.forEach(mesh => {
        //all cubes are rigid body applied
        if (mesh.name.startsWith("Cube")) {
            mesh.isPickable = true;  // Make mesh clickable
            mesh.checkCollisions = true;
            mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2, friction: 0.2, restitution: 0.3 }, scene);
            dragableMeshes.push(mesh);
        } 
        
        else if (mesh.name.startsWith("wall") || mesh.name.startsWith("Plane")) {
            mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
        }
    });

    return dragableMeshes;
}
