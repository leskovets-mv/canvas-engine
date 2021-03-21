import {SceneObject} from "../scene-object/scene-object";
import {LayerInterface} from "./layer.interface";

export class Layer implements LayerInterface {
    public layerObjects: SceneObject[] = [];
    public name: string;

    constructor(options) {
        this.name = options.name;
    }

    public appendSceneObjects(sceneObject: SceneObject[]): void {
        this.layerObjects.push(...sceneObject);
    }

    public appendSceneObject(sceneObject: SceneObject): void {
        this.layerObjects.push(sceneObject);
    }

    public destroySceneObject(sceneObject: SceneObject): void {
        const index = this.layerObjects.indexOf(sceneObject);
        if (index > -1) {
            this.layerObjects[index].removeControl();
            this.layerObjects.splice(index, 1)
        }
    }

    public clear() {
        while (this.layerObjects.length) {
            this.destroySceneObject(this.layerObjects[0])
        }
    }
}
