import {SceneObject} from "../../core/scene/object/sceneObject";

export class Pipe extends SceneObject {
    constructor(params: any) {
        super(params);
    }

    public update():void {
        this.position.x -= 5;
    }
}