import {SceneInterface} from "./scene.interface";
import {SceneObjectInterface} from "./object/sceneObject.interface";

export class Scene implements SceneInterface {
    public sceneObjects: SceneObjectInterface[];
    public imageList: { [p: string]: HTMLElement } = {};
    public background: string;
    public update: () => void;
    public context: CanvasRenderingContext2D;

    constructor(params: any) {
        if (params.background) {
            this.uploadImage('background', params.background);
            this.background = params.background;
        }
        if (params.update) {
            this.update = params.update
        }
        this.context = params.context;
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
}

