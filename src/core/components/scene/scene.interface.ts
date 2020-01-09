import {SceneObjectInterface} from "../scene-object/scene-object.interface";

export interface SceneInterface {
    setActiveScene: (sceneName: string) => void,
    sceneObjects: SceneObjectInterface[],
    imageList: { [ket: string]: HTMLElement },
    background: string,
    context: CanvasRenderingContext2D,

    update(): void,

    init(): void,
}