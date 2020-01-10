import {SceneObjectControl} from "../../core/components/scene-object/scene-object.control";

export class BirdControl extends SceneObjectControl {
    public isJump = false;

    public mouseUpHandler(event: MouseEvent) {
        this.isJump = false;
    }

    public mouseDownHandler(event: MouseEvent) {
        this.isJump = true;
    }

    public keyDownHandler(event: KeyboardEvent): void {
        if (event.keyCode === 32) {
            this.isJump = true;
        }
    }

    public keyUpHandler(event: KeyboardEvent): void {
        if (event.keyCode === 32) {
            this.isJump = false;
        }
    }
}
