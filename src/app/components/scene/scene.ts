import {environments} from "../../../src/environments/environments";
import {SceneObject} from '../scene-object/scene-object';
import {SceneInterface} from './scene.interface';
import {Layer} from '../layer/layer';

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
      this.update = options.update;
    }
    this.addLayer('default');
    this.setActiveScene = options.setActiveScene;
    this.context = options.context;
  }

  public addLayer(layerName: string): void {
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

  public clearLayer(layerName: string = 'default'): void {
    this.layers[layerName].clear();
  }

  public update(): void {
    this.context.clearRect(0, 0, environments.WIDTH, environments.HEIGHT);
    if (this.imageList.background) {
      this.context.drawImage(this.imageList.background, 0, 0, environments.WIDTH, environments.HEIGHT);
    }
    for (const layerName in this.layers) {
      this.layers[layerName].layerObjects.forEach(sceneObject => {
        this.context.save();
        if (sceneObject.rotate) {
          this.context.translate(sceneObject.position.x, sceneObject.position.y);
          this.context.rotate(-sceneObject.rotate * Math.PI / 180);
          this.context.translate(-sceneObject.position.x, -sceneObject.position.y);
        }
        this.drawSceneObject(sceneObject);
        this.context.restore();
        sceneObject.update();
      });
    }
  }

  public uploadImage(image: string, pathFile: string): void {
    if (!image || !pathFile || this.imageList[image]) {
      return;
    }
    const img = new Image();

    img.addEventListener('load', (event: Event & { path: HTMLImageElement[] }) => {
      this.imageList[image] = event.path[0];
    });

    img.src = `./assets/${pathFile}`;
  }

  public init(): void {
  }

  private drawSceneObject(sceneObject): void {
    this.context.fillStyle = sceneObject.color;
    if (sceneObject.texture && this.imageList[sceneObject.name]) {
      this.drawTexture(sceneObject);
    }
    if (sceneObject.type === 'rect') {
      this.drawRect(sceneObject);
    } else if (sceneObject.type === 'arc') {
      this.context.save();
      this.context.beginPath();
      if (sceneObject.size.width === sceneObject.size.height) {
        this.drawCircle(sceneObject);
      } else {
        this.drawEllipce(sceneObject);
      }
      this.context.restore();
      this.context.closePath();
      this.context.fill();
    }
    if (sceneObject.text) {
      this.drawText(sceneObject);
    }
  }

  private drawText(sceneObject): void {
    this.context.fillStyle = 'black';
    this.context.font = 'bold 20px sans-serif';
    this.context.textAlign = 'center';
    this.context.fillText(
      sceneObject.text,
      sceneObject.position.x + sceneObject.size.width / 2,
      sceneObject.position.y + sceneObject.size.height / 2 + 10
    );
  }

  private drawTexture(sceneObject): void {
    this.context.drawImage(
      this.imageList[sceneObject.name],
      sceneObject.position.x,
      sceneObject.position.y,
      sceneObject.size.width,
      sceneObject.size.height
    );
  }

  private drawCircle(sceneObject): void {
    this.context.arc(
      sceneObject.position.x,
      sceneObject.position.y,
      sceneObject.size.height / 2,
      0, 2 * Math.PI, true
    );
  }

  private drawEllipce(sceneObject): void {
    if (sceneObject.size.width < sceneObject.size.height) {
      this.context.translate(sceneObject.position.x, sceneObject.position.y);
      this.context.scale(sceneObject.size.width / sceneObject.size.height, 1);
      this.context.arc(0, 0, sceneObject.size.height / 2, 0, 2 * Math.PI, true);
      this.context.translate(-sceneObject.position.x, -sceneObject.position.y);
    } else {
      this.context.translate(sceneObject.position.x, sceneObject.position.y);
      this.context.scale(1, sceneObject.size.width / sceneObject.size.height);
      this.context.arc(0, 0, sceneObject.size.width / 2, 0, 2 * Math.PI, true);
      this.context.translate(-sceneObject.position.x, -sceneObject.position.y);
    }
  }

  private drawRect(sceneObject): void {
    this.context.fillRect(
      sceneObject.position.x,
      sceneObject.position.y,
      sceneObject.size.width,
      sceneObject.size.height
    );
  }
}

