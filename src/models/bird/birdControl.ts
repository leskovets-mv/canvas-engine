import { BirdControlInterface } from "./birdControlInterface";

export class BirdControl implements BirdControlInterface {
    public jump: boolean;

    constructor() {
        document.addEventListener('keypress', (event: KeyboardEvent) => {
            if (event.keyCode === 32) {
                this.jump = true;
            }
        });
        document.addEventListener('keyup', (event: KeyboardEvent) => {
            if (event.keyCode === 32) {
                this.jump = false;
            }
        });
    }
}
