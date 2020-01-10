import {environments} from "../../environments/environments";
import {ButtonControl} from "../controls/button.control";
import {Scene} from "../../core/components/scene/scene";
import {ButtonModel} from "../models/button.model";

export default class MenuScene extends Scene {
    public start: boolean;
    public button: ButtonModel;

    constructor(params: any) {
        super(params);
        this.button = new ButtonModel({control: new ButtonControl()});
        this.appendSceneObject(this.button);
    }

    public update(): void {
        this.context.clearRect(0, 0, environments.WIDTH, environments.HEIGHT);
        if (this.imageList['background']) {
            this.context.drawImage(this.imageList['background'], 0, 0, environments.WIDTH, environments.HEIGHT);
        }
        this.sceneObjects.forEach(sceneObject => {
            sceneObject.update();
        });
        this.context.textAlign = 'center';
        this.context.fillText('Нажмите на экран для начала игры', environments.WIDTH / 2, environments.HEIGHT / 2);
        if (this.button.start) {
            this.setActiveScene('main');
        }
    }

    public restart(): void {
        this.start = false;
    }
}
