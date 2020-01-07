import { GameControlInterface } from "./gameControl";
import { GameObject } from "./core/gameObject";

export class Bird extends GameObject {
    control: GameControlInterface;
    coldDown: number = 0;

    constructor({ control, ...params }: any) {
        super(params);
        this.control = control;
        this.gravity();
    }

    private jump(): void {
        this.coldDown = 2;
        this.direction({ y: -30 });
    }

    private gravity(): void {
        this.direction({ y: 1 });
    }

    public update() {
        if (this.coldDown > 0 && !this.control.jump) {
            this.coldDown--;
        } else if (this.control.jump && this.coldDown === 0) {
            this.jump();
        }
        this.gravity();
    }
}
