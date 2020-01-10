import {SceneObjectControl} from "../../core/components/scene-object/scene-object.control";

export class ButtonControl extends SceneObjectControl {
    private clientX: number;
    private clientY: number;

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
