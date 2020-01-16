import {SceneObject} from "../../../../core/components/scene-object/scene-object";

export class BirdModel extends SceneObject {
    private coldDown: number = 0;
    private isJump: boolean;

    constructor(options: { [key: string]: any }) {
        super(options);
        this.gravity();
    }

    private jump(): void {
        this.coldDown = 2;
        this.direction({y: -30});
        if (this.position.y < 0) {
            this.direction({y: -this.position.y})
        }
    }

    private gravity(): void {
        this.direction({y: 0.7});
    }

    public update() {
        if (!this.isJump && this.coldDown > 0) {
            this.coldDown--;
        } else if (this.isJump && this.coldDown === 0) {
            this.jump();
        }
        this.gravity();
    }
}
