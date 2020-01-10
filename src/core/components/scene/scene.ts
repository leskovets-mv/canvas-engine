import { SceneObject } from "../scene-object/scene-object";
import { SceneInterface } from "./scene.interface";

export class Scene implements SceneInterface {
    public sceneObjects: SceneObject[] = [];
    public imageList: { [p: string]: any } = {};
    public background: string;
    public context: CanvasRenderingContext2D;
    public setActiveScene: (sceneName: string) => void;

    constructor(params: { [key: string]: any }) {
        if (params.background) {
            this.uploadImage('background', params.background);
            this.background = params.background;
        }
        if (params.update) {
            this.update = params.update
        }
        this.setActiveScene = params.setActiveScene;
        this.context = params.context;
    }

    public uploadImage(image: string, pathFile: string): void {
        if (this.imageList[image]) return;
        const img = new Image();

        img.addEventListener('load', (event: Event & { path: HTMLImageElement[] }) => {
            this.imageList[image] = event.path[0];
        });

        img.src = './assets/' + pathFile;
    }

    public appendSceneObjects(sceneObject: SceneObject[]): void {
        this.sceneObjects.push(...sceneObject);
    }

    public appendSceneObject(sceneObject: SceneObject): void {
        this.sceneObjects.push(sceneObject);
    }

    public destroySceneObject(sceneObject: SceneObject): void {
        const sceneObjectIndex = this.sceneObjects.indexOf(sceneObject);
        if (sceneObjectIndex > -1) {
            this.sceneObjects[sceneObjectIndex].removeControl();
            this.sceneObjects.splice(sceneObjectIndex, 1)
        }
    }

    public restart(): void {
    }

    public update(): void {
    }
}

