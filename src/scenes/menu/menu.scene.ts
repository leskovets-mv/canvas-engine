import { Scene } from "../../core/components/scene/scene";
import projectConfig from "../../project.config";

export class MenuScene extends Scene {
    public start: boolean;
    private text = 'Нажмите пробел для начала игры';

    constructor(params: any) {
        super(params);
        document.addEventListener('keypress', (event: KeyboardEvent) => {
            if (event.keyCode === 32) {
                this.start = true;
            }
        })
    }

    public update(): void {
        this.context.clearRect(0, 0, projectConfig.WIDTH, projectConfig.HEIGHT);
        if (this.imageList['background']) {
            this.context.drawImage(this.imageList['background'], 0, 0, projectConfig.WIDTH, projectConfig.HEIGHT);
        }
        this.context.textAlign = 'center';
        this.context.fillText(this.text, projectConfig.WIDTH / 2, projectConfig.HEIGHT / 2);
        if (this.start) {
            this.setActiveScene('main');
        }
    }

    public restart(): void {
        this.start = false;
    }
}
