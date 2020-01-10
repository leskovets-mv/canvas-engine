import {SceneObject} from "../../core/components/scene-object/scene-object";

export class ButtonModel extends SceneObject {
    public start: boolean;
    private clientX: number;
    private clientY: number;

    constructor(params: { [key: string]: any }) {
        super(params);
    }

    public update() {
        this.start = !!(this.clientX && this.clientY);
    }
}