import {SceneObject} from "../../../../../core/components/scene-object/scene-object";
import {isClick} from "../../../../../core/util/math/math";

export class StartButtonModel extends SceneObject {
    public start: boolean;
    private clientX: number;
    private clientY: number;

    constructor(options: { [key: string]: any }) {
        super(options);
    }

    public update(): void {
        if (this.clientX && this.clientY) {
            this.start = isClick.bind(this)({x: this.clientX, y: this.clientY}, this)
        }
    }
}
