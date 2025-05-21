// tvHandler.js
export function makeVideoTV(scene, meshName, videoFile, options = {}) {
    const mesh = scene.getMeshByName(meshName);
    if (!mesh) {
      console.warn(`No mesh found with name: ${meshName}`);
      return;
    }
  
    const {
      path = "assets/videos/",     // default folder
      loop = true,
      autoplay = true,
      muted = true,
      materialName = `${meshName}_mat`,
      textureName = `${meshName}_texture`,
      resolution = "auto"
    } = options;
  
    const videoTexture = new BABYLON.VideoTexture(
      textureName,
      [path + videoFile],
      scene,
      true,
      true
    );


    videoTexture.vScale = -1;
    videoTexture.video.loop = loop;
    videoTexture.video.muted = muted;
  
    if (autoplay) {
      videoTexture.video.play();
    }
  
    const videoMat = new BABYLON.StandardMaterial(materialName, scene);
    videoMat.emissiveTexture  = videoTexture;
    videoMat.disableLighting = true; // 
  
    mesh.material = videoMat;


    //click to play and pause
    mesh.isPickable = true;
    mesh.actionManager = new BABYLON.ActionManager(scene);
    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        () => {
            const vid = videoTexture.video;
            if (vid.paused) {
            vid.play();
            } else {
            vid.pause();
            }
        }
        )
    );


  
    return {
      mesh,
      videoTexture,
      material: videoMat
    };
  }
  