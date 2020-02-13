import {Scene} from './components/scene/scene';

declare const window;

interface CoreOptions {
    width: number;
    height: number;
    background?: string;
    render?: boolean;
}

export default class Core {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public scenes: { [key: string]: Scene } = {};
    private activeScene: Scene;
    private readonly width: number;
    private readonly height: number;
    private requestId: number;

    constructor(options: CoreOptions) {
        this.width = options.width;
        this.height = options.height;
        this.canvas = this.generateCanvas();
        this.context = this.canvas.getContext('2d');
    }

    private generateCanvas(): HTMLCanvasElement {
        const canvas = window.document.createElement('canvas');
        canvas.height = this.height;
        canvas.width = this.width;
        return canvas;
    }

    public setActiveScene(scene: string): void {
        window.cancelAnimationFrame(this.requestId);
        if (!this.scenes[scene]) {
            return;
        }
        if (this.activeScene) {
            this.activeScene.clearLayer('default');
        }
        this.activeScene = this.scenes[scene];
        this.activeScene.init();
        this.update();
    }

    public appendScene({name, scene}): void {
        scene.setActiveScene = this.setActiveScene.bind(this);
        this.scenes[name] = scene;
    }

    public update(): void {
        if (this.activeScene) {
            this.activeScene.update();
        }
        this.requestId = window.requestAnimationFrame(this.update.bind(this));
    }
}
