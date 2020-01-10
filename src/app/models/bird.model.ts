import {SceneObject} from "../../core/components/scene-object/scene-object";

export class BirdModel extends SceneObject {
    private coldDown: number = 0;
    private isJump: boolean;

    constructor(params: { [key: string]: any }) {
        super(params);
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
        this.direction({y: 1});
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
