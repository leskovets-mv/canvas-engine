import { Scene } from "./components/scene/scene";

export default class Core {
    private canvas: HTMLCanvasElement = document.createElement('canvas');
    public context: CanvasRenderingContext2D = this.canvas.getContext('2d');
    public scenes: { [key: string]: Scene } = {};
    private activeScene: Scene;
    private readonly width: number;
    private readonly height: number;
    private requestId: number;

    constructor(params: { width: number, height: number, background?: string }) {
        this.width = params.width;
        this.height = params.height;
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.context = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
    }

    public setActiveScene(scene: string): void {
        cancelAnimationFrame(this.requestId)
        if (!this.scenes[scene]) return;
        if (this.activeScene) {
            this.activeScene.clearLayer('default')
        }
        this.activeScene = this.scenes[scene];
        this.activeScene.init();
        this.update();
    }

    public appendScene({ name, scene }): void {
        scene.setActiveScene = this.setActiveScene.bind(this);
        this.scenes[name] = scene
    }

    public update(): void {
        if (this.activeScene) {
            this.activeScene.update();
        }
        this.requestId = window.requestAnimationFrame(this.update.bind(this))
    }
}
