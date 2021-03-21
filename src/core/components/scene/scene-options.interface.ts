export interface SceneOptionsInterface {
    context: CanvasRenderingContext2D;
    background?: string;
    update: () => void;
    setActiveScene: () => void;
}
