import {SceneObjectInterface} from "./object/sceneObject.interface";

export interface SceneInterface {
    sceneObjects: SceneObjectInterface[],
    imageList: { [ket: string]: HTMLElement },
    background: string,
    context: CanvasRenderingContext2D,
    update: () => void,
}