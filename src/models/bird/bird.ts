import { SceneObjectInterface } from "../../core/components/scene-object/scene-object.interface";
import { SceneObject } from "../../core/components/scene-object/scene-object";
import { BirdControlInterface } from "./birdControlInterface";

export class Bird extends SceneObject implements SceneObjectInterface {
    public texture: string;
    public control: BirdControlInterface;
    private coldDown: number = 0;

    constructor({ control, ...params }: { [key: string]: any }) {
        super(params);
        this.control = control;
        this.gravity();
    }

    private jump(): void {
        this.coldDown = 2;
        this.direction({ y: -30 });
        if (this.position.y < 0) {
            this.direction({ y: -this.position.y })
        }
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
