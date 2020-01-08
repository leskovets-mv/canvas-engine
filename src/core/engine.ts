import { GameObjectInterface } from "./interfaces/gameObject.interface";
import { resolve } from 'path';

export class Engine {
    public width: number;
    public height: number;
    public gameObjects: GameObjectInterface[] = [];
    private canvas: any = <HTMLCanvasElement>document.createElement('canvas');
    public context: CanvasRenderingContext2D = this.canvas.getContext('2d');
    public update: () => void;
    public imageList: any = {};

    constructor(params: { width: number, height: number }) {
        this.width = params.width;
        this.height = params.height;
    }

    public init(): void {
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.context = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
    }

    public addedgameObjects(gameObjects: GameObjectInterface[]): void {
        this.gameObjects.push(...gameObjects);
    }

    public addedgameObject(gameObject: GameObjectInterface): void {
        this.gameObjects.push(gameObject);
    }

    public destroyGameObject(gameObject: GameObjectInterface): void {
        const gameObjectIndex = this.gameObjects.indexOf(gameObject)
        if (gameObjectIndex > -1) {
            this.gameObjects.splice(gameObjectIndex, 1)
        }
    }

    public uploadImage(image: string, pathFile: string) {
        if (this.imageList[image]) return;
        const img = new Image();

        img.onload = (event:any) => {
            this.imageList[image] = event.path[0];
        }

        img.src = resolve(__dirname, 'assets', pathFile);
    }
}
