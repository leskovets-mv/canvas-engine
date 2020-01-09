import {BirdControlInterface} from "./birdControlInterface";

export class BirdControl implements BirdControlInterface {
    public jump: boolean;

    constructor() {
        this.init();
    }

    private keyPressHandler(event: any) {
        if (event.keyCode === 32) {
            this.jump = true;
        }
    }

    private keyUpHandler(event: any) {
        if (event.keyCode === 32) {
            this.jump = false;
        }
    }

    private init() {
        document.addEventListener('keypress', this.keyPressHandler);
        document.addEventListener('keyup', this.keyUpHandler);
    }
}
