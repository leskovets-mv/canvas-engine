import {SceneObjectControl} from "../../../../core/util/controls/scene-object.control";

export class ButtonControl extends SceneObjectControl {
    public clientX: number;
    public clientY: number;

    public mouseUpHandler(event: MouseEvent) {
        this.clientX = null;
        this.clientY = null;
    }

    public mouseDownHandler(event: MouseEvent) {
        const {clientX, clientY} = event;
        this.clientX = clientX;
        this.clientY = clientY;
    }
}
