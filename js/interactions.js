import { attachBasicDragBehavior } from './helpers.js';

export function setupInteractions(cubes, scene) {
    cubes.forEach((cube, index) => {
        // Add clickable link action
        cube.actionManager = new BABYLON.ActionManager(scene);
        cube.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                () => window.open(`https://example.com/project${index}`, "_blank")
            )
        );

        // Enable drag behavior
        attachBasicDragBehavior(cube, scene);
    });
}
