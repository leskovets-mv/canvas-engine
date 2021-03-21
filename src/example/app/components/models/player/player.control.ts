import {SceneObjectControl} from "../../../../../core/util/controls/scene-object.control";

export class PlayerControl extends SceneObjectControl {
    public isJump = false;

    public mouseUpHandler() {
        this.isJump = false;
    }

    public mouseDownHandler() {
        console.log(this)
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
