import { GameObjectInterface } from "./interfaces/gameObject.interface";

export class Engine {
    public gameObjects: GameObjectInterface[] = [];
    private canvas: any = <HTMLCanvasElement>document.createElement('canvas');
    public context: CanvasRenderingContext2D = this.canvas.getContext('2d');
    public update: () => void;
    public imageList: any = {};
    private background: string;
    private width: number;
    private height: number;

    constructor(params: { width: number, height: number, background?: string }) {
        this.width = params.width;
        this.height = params.height;
        if (params.background) {
            this.background = params.background
            this.uploadImage('background', params.background)
        }
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

        img.onload = (event: any) => {
            this.imageList[image] = event.path[0];
        }

        img.src = './assets/' + pathFile;
    }
}
