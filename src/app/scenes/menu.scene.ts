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
        super.update();
        if (this.button.start) {
            this.setActiveScene('main');
            return;
        }
    }

    public init(): void {
        this.button = new ButtonModel({
            control: new ButtonControl(),
            position: { x: environments.WIDTH / 2 - 150, y: environments.HEIGHT / 2 - 50 },
            size: { width: 300, height: 100 },
            name: 'button',
            text: 'Начать игру',
            color: '#ccc'
        });
        this.appendSceneObjectToLayer(this.button);
        this.start = false;
    }
}
