// No imports needed — using global BABYLON from script tag

const PROJECTS_JSON_PATH = "/assets/data/projects.json";
const TEMPLATE_PATH = "babylon/project_template.babylon";

export async function loadProjects(scene) {
  const response = await fetch(PROJECTS_JSON_PATH);
  const projects = await response.json();

  const spacingY = 6;
  let currentY = -4;


  //well at least the loop works
  for (const project of projects) {


    const result = await BABYLON.SceneLoader.ImportMeshAsync("", TEMPLATE_PATH, "", scene);
    const allMeshes = result.meshes;

    // Move all meshes down together
    allMeshes.forEach(mesh => {
    mesh.position.y += currentY;
    });

    // 🧱 Find specific anchor meshes
    const titleAnchor = allMeshes.find(m => m.name.includes("TitleAnchor"));
    console.log(titleAnchor);
    const descAnchor = allMeshes.find(m => m.name.includes("DescriptionAnchor"));
    const imgAnchor = allMeshes.find(m => m.name.includes("ImageAnchor"));

    injectText(scene, project.title, titleAnchor, "bold", 64);
    injectText(scene, project.description, descAnchor, "normal", 32);

    if (imgAnchor && project.image) {
    const mat = new BABYLON.StandardMaterial("imgMat", scene);
    mat.diffuseTexture = new BABYLON.Texture(project.image, scene);
    imgAnchor.material = mat;
    }

    /*
    if (project.link) {
      root.actionManager = new BABYLON.ActionManager(scene);
      root.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
          window.open(project.link, "_blank");
        })
      );
    }
      */

    currentY -= spacingY;
  }
}

function injectText(scene, content, anchorMesh, fontWeight = "normal", fontSize = 48) {
    if (!anchorMesh) return;
    console.log("i am being called");
    const dynTex = new BABYLON.DynamicTexture("dynamicText", { width: 1024, height: 256 }, scene);
    dynTex.drawText(content, null, null, `${fontWeight} ${fontSize}px sans-serif`, "white", "null", true);

    const textMat = new BABYLON.StandardMaterial("textMat", scene);
    textMat.diffuseTexture = dynTex;
    textMat.emissiveColor = BABYLON.Color3.White();
    anchorMesh.material = textMat;
}
