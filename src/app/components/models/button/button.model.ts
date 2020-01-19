import { SceneObject } from "../../../../../core/components/scene-object/scene-object";

export class ButtonModel extends SceneObject {
    public start: boolean;
    private clientX: number;
    private clientY: number;

    constructor(options: { [key: string]: any }) {
        super(options);
    }

    public update(): void {
        if (this.clientX && this.clientY) {
            // this.start = this.clickObjectHandler({ x: this.clientX, y: this.clientY });
            console.log(this.clickObjectHandler({ x: this.clientX, y: this.clientY }));
        }
    }
}