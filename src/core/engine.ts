import { GameObjectInterface } from "./interfaces/gameObject.interface";

export class Engine {
    public width: number;
    public height: number;
    public gameObjects: GameObjectInterface[] = [];
    private canvas: any = <HTMLCanvasElement>document.createElement('canvas');
    public context: CanvasRenderingContext2D = this.canvas.getContext('2d');
    public update: () => void;

    constructor(params: { width: number, height: number }) {
        this.width = params.width;
        this.height = params.height;
    }

    init() {
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.context = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
    }

    addedgameObjects(gameObjects: GameObjectInterface[]) {
        this.gameObjects.push(...gameObjects);
    }

    addedgameObject(gameObject: GameObjectInterface) {
        this.gameObjects.push(gameObject);
    }
}