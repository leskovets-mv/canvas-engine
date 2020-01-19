import {SceneObjectControl} from "../../../../../core/util/controls/scene-object.control";

export class ButtonControl extends SceneObjectControl {
    public clientX: number;
    public clientY: number;

    public mouseUpHandler(event: MouseEvent) {
        this.clientX = null;
        this.clientY = null;
    }

    public mouseDownHandler(event: MouseEvent) {
        const {offsetX, offsetY} = event;
        this.clientX = offsetX;
        this.clientY = offsetY;
    }
}
