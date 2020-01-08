import { GameObject } from "./core/gameObject";

export class Tube extends GameObject {

    constructor(params: any) {
        super(params);
    }

    update() {
        this.position.x -= 5;
    }
}