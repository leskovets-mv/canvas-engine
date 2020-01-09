import {SceneInterface} from "./scene.interface";
import {SceneObjectInterface} from "../scene-object/scene-object.interface";

export class Scene implements SceneInterface {
    public sceneObjects: SceneObjectInterface[];
    public imageList: { [p: string]: HTMLElement } = {};
    public background: string;
    public context: CanvasRenderingContext2D;
    public setActiveScene: (sceneName: string) => void;

    constructor(params: any) {
        if (params.background) {
            this.uploadImage('background', params.background);
            this.background = params.background;
        }
        if (params.update) {
            this.update = params.update
        }
        this.setActiveScene = params.setActiveScene;
        this.context = params.context;
        this.init();
    }

    public uploadImage(image: string, pathFile: string): void {
        if (this.imageList[image]) return;
        const img = new Image();

        img.addEventListener('load', (event: any) => {
            this.imageList[image] = event.path[0];
        });

        img.src = './assets/' + pathFile;
    }

    public appendSceneObjects(sceneObject: SceneObjectInterface[]): void {
        this.sceneObjects.push(...sceneObject);
    }

    public appendSceneObject(gameObject: SceneObjectInterface): void {
        this.sceneObjects.push(gameObject);
    }

    public destroySceneObject(gameObject: SceneObjectInterface): void {
        const gameObjectIndex = this.sceneObjects.indexOf(gameObject);
        if (gameObjectIndex > -1) {
            this.sceneObjects.splice(gameObjectIndex, 1)
        }
    }

    init(): void {
    }

    update(): void {
    }
}

