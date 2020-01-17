import { environments } from "../../../src/environments/environments";
import { SceneObject } from "../scene-object/scene-object";
import { SceneInterface } from "./scene.interface";
import { Layer } from "../layer/layer";

export class Scene implements SceneInterface {
    public layers: { [name: string]: Layer } = {};
    public imageList: { [name: string]: any } = {};
    public context: CanvasRenderingContext2D;
    public setActiveScene: (sceneName: string) => void;

    constructor(options) {
        if (options.background) {
            this.uploadImage('background', options.background);
        }
        if (options.update) {
            this.update = options.update
        }
        this.addLayer('default');
        this.setActiveScene = options.setActiveScene;
        this.context = options.context;
    }

    public addLayer(layerName: string) {
        this.layers[layerName] = new Layer({
            name: layerName,
            context: this.context
        });
    }

    public appendSceneObjectsToLayer(sceneObjects: SceneObject[], layerName: string = 'default'): void {
        sceneObjects.forEach(sceneObject => this.uploadImage(sceneObject.name, sceneObject.texture));
        this.layers[layerName].appendSceneObjects(sceneObjects);
    }

    public appendSceneObjectToLayer(sceneObject: SceneObject, layerName: string = 'default'): void {
        this.uploadImage(sceneObject.name, sceneObject.texture);
        this.layers[layerName].appendSceneObject(sceneObject);
    }

    public destroySceneObjectToLayer(sceneObject: SceneObject, layerName: string = 'default'): void {
        this.layers[layerName].destroySceneObject(sceneObject);
    }

    public clearLayer(layerName: string = 'default') {
        this.layers[layerName].clear();
    }

    public update(): void {
        this.context.clearRect(0, 0, environments.WIDTH, environments.HEIGHT);

        if (this.imageList['background']) {
            this.context.drawImage(this.imageList['background'], 0, 0, environments.WIDTH, environments.HEIGHT);
        }
        for (let layerName in this.layers) {
            this.layers[layerName].layerObjects.forEach(sceneObject => {
                this.context.save();
                this.context.fillStyle = sceneObject.color;
                if (sceneObject.rotate) {
                    const translateX = sceneObject.position.x + sceneObject.size.height / 2
                    const translateY = sceneObject.position.y + sceneObject.size.height / 2
                    this.context.translate(translateX, translateY)
                    this.context.rotate(sceneObject.rotate * Math.PI / 180);
                    this.context.translate(-translateX, -translateY)
                }
                this.context.fillRect(
                    sceneObject.position.x,
                    sceneObject.position.y,
                    sceneObject.size.width,
                    sceneObject.size.height
                );
                if (sceneObject.texture && this.imageList[sceneObject.name]) {
                    this.context.drawImage(
                        this.imageList[sceneObject.name],
                        sceneObject.position.x,
                        sceneObject.position.y,
                        sceneObject.size.width,
                        sceneObject.size.height
                    )
                }
                this.context.fillStyle = 'black';
                if (sceneObject.text) {
                    this.context.font = 'bold 20px sans-serif';
                    this.context.textAlign = 'center';
                    this.context.fillText(
                        sceneObject.text,
                        sceneObject.position.x + sceneObject.size.width / 2,
                        sceneObject.position.y + sceneObject.size.height / 2 + 10
                    );
                }
                this.context.restore();
                sceneObject.update();
            });
        }
    }

    public uploadImage(image: string, pathFile: string): void {
        if (!image || !pathFile || this.imageList[image]) return;
        const img = new Image();

        img.addEventListener('load', (event: Event & { path: HTMLImageElement[] }) => {
            this.imageList[image] = event.path[0];
        });

        img.src = './assets/' + pathFile;
    }

    public init(): void {
    }
}

