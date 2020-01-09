import {SceneInterface} from "./scene/scene.interface";
import {Scene} from "./scene/scene";

export class Engine {
    private canvas: any = <HTMLCanvasElement>document.createElement('canvas');
    public context: CanvasRenderingContext2D = this.canvas.getContext('2d');
    public scene: Scene;
    private readonly width: number;
    private readonly height: number;

    constructor(params: { width: number, height: number, background?: string }) {
        this.width = params.width;
        this.height = params.height;
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.context = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.update();
    }

    public setScene(scene: SceneInterface): void {
        this.scene = new Scene(scene);
    }

    public update(): void {
        if(this.scene){
            this.scene.update()
        }
        requestAnimationFrame(this.update.bind(this))
    }
}
