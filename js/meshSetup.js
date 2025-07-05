export async function loadMeshes(scene, babylonFile) {
    const result = await BABYLON.SceneLoader.ImportMeshAsync("", "./babylon/", babylonFile, scene);
    const dragableMeshes = [];
    const taggedGroups = {};
    //select the cubes that act as tags!
    const tagCubes = [];
    const projectEmpties = [];

    result.meshes.forEach(mesh => {
        // Apply physics to cubes
        if (mesh.name.startsWith("Cube_tag_")){
            tagCubes.push(mesh);
        }

        if (mesh.name.startsWith("Cube")) {

            mesh.isPickable = true;  // Make mesh clickable
            mesh.checkCollisions = true;
            mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
                mesh,
                BABYLON.PhysicsImpostor.BoxImpostor,
                { mass: 2, friction: 0.8, restitution: 0.1 },
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



        if (mesh.name.startsWith("Empty") && mesh.metadata?.tags) {
            projectEmpties.push(mesh);

            const rawTagString = mesh.metadata.tags.replace(/[{}]/g, "");
            const tags = rawTagString.split(',').map(t => t.trim().toLowerCase());
            tags.forEach(tag => {
                if (!taggedGroups[tag]) taggedGroups[tag] = [];
                taggedGroups[tag].push(mesh);
            });
            }
        });


    //console.log(taggedGroups);
    return { dragableMeshes, taggedGroups, tagCubes, projectEmpties };
}
