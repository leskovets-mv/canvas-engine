import { environments } from "../../../environments/environments";
import { StartButtonControl } from "../models/start-button/start-button.control";
import { StartButtonModel } from "../models/start-button/start-button.model";
import {Scene} from "../../../../core/components/scene/scene";

export class MenuScene extends Scene {
    public start: boolean;
    public button: StartButtonModel;

    constructor(options: any) {
        super(options);
    }

    public update(): void {
        super.update();
        if (this.button.start) {
            this.setActiveScene('test');
            return;
        }
    }

    public init(): void {
        this.button = new StartButtonModel({
            control: new StartButtonControl(),
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
