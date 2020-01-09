import {Scene} from "../../core/components/scene/scene";
import projectConfig from "../../project.config";

export class MenuScene extends Scene {
    private start: boolean;

    constructor(params: any) {
        super(params);
    }

    public update(): void {
        this.context.clearRect(0, 0, projectConfig.WIDTH, projectConfig.HEIGHT);
        this.context.fillText(`Нажмите пробел для начала игры`, projectConfig.WIDTH / 2, projectConfig.HEIGHT / 2);
        if (this.start) {
            this.setActiveScene('main');
        }
    }

    public init(): void {
        this.start = false;
        document.addEventListener('keypress', this.keyPressHandler)
    }

    private keyPressHandler(event: any) {
        if (event.keyCode === 32) {
            this.start = true;
        }
    }
}
