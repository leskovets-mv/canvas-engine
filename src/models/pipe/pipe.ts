import {SceneObject} from "../../core/components/scene-object/scene-object";

export class Pipe extends SceneObject {
    constructor(params: any) {
        super(params);
    }

    public update():void {
        this.position.x -= 5;
    }
}