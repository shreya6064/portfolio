export function attachBasicDragBehavior(mesh, scene) {
    const pointerDragBehavior = new BABYLON.PointerDragBehavior();
    pointerDragBehavior.useObjectOrientationForDragging = false;
    mesh.addBehavior(pointerDragBehavior);

    pointerDragBehavior.onDragObservable.add(event => {
        const finalPosition = pointerDragBehavior.attachedNode.position.add(event.delta);
        if (finalPosition.y > 0 && finalPosition.y < 6) {
            mesh.position.y += event.delta.y;
        }
    });
}



//for art frames
export function attachPhysicsDragBehavior(mesh, scene) {
    const dragBehavior = new BABYLON.PointerDragBehavior({ dragPlaneNormal: new BABYLON.Vector3(1, 0, 0) });
    dragBehavior.useObjectOrientationForDragging = false;
    mesh.addBehavior(dragBehavior);

    // Start with mass = 0 to simulate "hanging"
    mesh.physicsImpostor.setMass(0);
    mesh.physicsImpostor.sleep();  // Optional: prevent any nudges


    const bounds = {
        minX: -8,
        maxX: 8,
        minY: -20,
        maxY: 6,
        minZ: -8,
        maxZ: 8,
    };


    dragBehavior.onDragStartObservable.add(() => {
        if (mesh.physicsImpostor) {
            mesh.physicsImpostor.setMass(2);
            mesh.physicsImpostor.wakeUp();
            
        }
    });

    /*
    dragBehavior.onDragObservable.add(event => {
        mesh.position.addInPlace(event.delta);
    });
*/

    dragBehavior.onDragObservable.add(event => {
        // Proposed new position
        const newPos = mesh.position.add(event.delta);

        // Clamp each axis
        newPos.x = BABYLON.Scalar.Clamp(newPos.x, bounds.minX, bounds.maxX);
        newPos.y = BABYLON.Scalar.Clamp(newPos.y, bounds.minY, bounds.maxY);
        newPos.z = BABYLON.Scalar.Clamp(newPos.z, bounds.minZ, bounds.maxZ);

        // Apply clamped position
        mesh.position.copyFrom(newPos);
    });

    dragBehavior.onDragEndObservable.add(() => {
        if (mesh.physicsImpostor) {
            //mesh.physicsImpostor.setMass(2);
            //mesh.physicsImpostor.wakeUp();
        }
    });
}


