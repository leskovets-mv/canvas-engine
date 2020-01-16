import { Layer } from "../layer/layer";

export interface SceneInterface {
    setActiveScene: (sceneName: string) => void,
    imageList: { [name: string]: HTMLElement },
    context: CanvasRenderingContext2D,
    layers: { [name: string]: Layer };

    update(): void,

    init(): void,
}