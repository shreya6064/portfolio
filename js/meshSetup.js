export async function loadMeshes(scene, babylonFile) {
    const result = await BABYLON.SceneLoader.ImportMeshAsync("", "./babylon/", babylonFile, scene);
    const dragableMeshes = [];
    //const taggedGroups = {};
    //select the cubes that act as tags!
    const tagCubes = [];

    const techTagsMap = {};
    const skillTagsMap = {};
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



        if (mesh.name.startsWith("Empty")) {
            projectEmpties.push(mesh);

            const techTags = (mesh.metadata?.tech || "")
            .replace(/[{}]/g, "")
            .split(",").map(t => t.trim().toLowerCase()).filter(Boolean);

            const skillTags = (mesh.metadata?.skills || "")
            .replace(/[{}]/g, "")
            .split(",").map(t => t.trim().toLowerCase()).filter(Boolean);

            // Map projects under each tech tag
            techTags.forEach(tag => {
                if (!techTagsMap[tag]) techTagsMap[tag] = [];
                console.log(tag);
                techTagsMap[tag].push(mesh);
                });

            // Map projects under each skill tag
            skillTags.forEach(tag => {
                if (!skillTagsMap[tag]) skillTagsMap[tag] = [];
                console.log(tag)
                skillTagsMap[tag].push(mesh);
                });
        }



        });


    //console.log(taggedGroups);
    //return { dragableMeshes, taggedGroups, tagCubes, projectEmpties };
    return { dragableMeshes, tagCubes, projectEmpties, techTagsMap, skillTagsMap };

}
