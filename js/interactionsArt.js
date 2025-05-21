import { attachPhysicsDragBehavior} from './helpers.js';

//console.log("✅ interactionsArt.js loaded");

export function setupInteractions(meshes, scene, openPopup) {
    //console.log("🖼️ Setting up art interactions for", meshes.length, "meshes");


    //this relies on these being the first meshes
    //rememver the offset later when you add more on top
    meshes.forEach((mesh, index) => {
        mesh.actionManager = new BABYLON.ActionManager(scene);
        
       

        mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                () => openPopup(index)
                //BABYLON.ActionManager.OnPickTrigger,
                //() => console.log(`Clicked frame ${index}`)
                //BABYLON.ActionManager.OnPickTrigger,
                //() => openPopup(index)
            )
        );

        //  This is for physics-based frame drag
        attachPhysicsDragBehavior(mesh, scene);
    });
}
