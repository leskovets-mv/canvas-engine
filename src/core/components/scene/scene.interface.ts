import { SceneObjectInterface } from "../scene-object/scene-object.interface";
import { Layer } from "../layer/layer";

export interface SceneInterface {
    setActiveScene: (sceneName: string) => void,
    imageList: { [name: string]: HTMLElement },
    background: string,
    context: CanvasRenderingContext2D,
    layers: { [name: string]: Layer };

    update(): void,

    init(): void,
}