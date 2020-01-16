import {SceneObject} from "../../../../core/components/scene-object/scene-object";

export class PipeModel extends SceneObject {
    constructor(options: { [key: string]: any }) {
        super(options);
    }

    public update(): void {
        this.direction({x:-2})
    }
}