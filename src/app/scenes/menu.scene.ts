import { environments } from "../../environments/environments";
import { ButtonControl } from "../controls/button.control";
import { Scene } from "../../core/components/scene/scene";
import { ButtonModel } from "../models/button.model";

export default class MenuScene extends Scene {
    public start: boolean;
    public button: ButtonModel;

    constructor(params: any) {
        super(params);
    }

    public update(): void {
        this.context.clearRect(0, 0, environments.WIDTH, environments.HEIGHT);
        if (this.imageList['background']) {
            this.context.drawImage(this.imageList['background'], 0, 0, environments.WIDTH, environments.HEIGHT);
        }
        this.sceneObjects.forEach(sceneObject => {
            this.context.font = 'bold 20px sans-serif';
            this.context.textAlign = 'center';
            this.context.fillStyle = sceneObject.color;
            this.context.fillRect(
                sceneObject.position.x,
                sceneObject.position.y,
                sceneObject.size.width,
                sceneObject.size.height
            )
            this.context.fillStyle = 'black'
            if (sceneObject.text) {
                this.context.fillText(
                    sceneObject.text,
                    sceneObject.position.x + sceneObject.size.width / 2,
                    sceneObject.position.y + sceneObject.size.height / 2 + 10
                );
            }
            sceneObject.update();
        });

        if (this.button.start) {
            this.setActiveScene('main');
        }
    }

    public restart(): void {
        this.button = new ButtonModel({
            control: new ButtonControl(),
            position: { x: environments.WIDTH / 2 - 150, y: environments.HEIGHT / 2 - 50 },
            size: { width: 300, height: 100 },
            name: 'button',
            text: 'Начать игру',
            color: '#ccc'
        });
        this.appendSceneObject(this.button);
        this.start = false;
    }
}
