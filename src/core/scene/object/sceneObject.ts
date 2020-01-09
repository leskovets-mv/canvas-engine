import {PositionInterface} from "../../interfaces/position.interface";
import {SceneObjectInterface} from "./sceneObject.interface";
import {SizeInterface} from "../../interfaces/size.interface";

export class SceneObject {
    public size: SizeInterface;
    public position: PositionInterface;
    public color: string;
    public texture: string;
    public name: string;

    constructor(params: any) {
        this.position = params.position;
        this.size = params.size;
        this.color = params.color;
        this.name = params.name;
        this.texture = params.texture;
        if (params.update) {
            this.update = params.update;
        }
    }

    public direction(velocity: PositionInterface): void {
        this.position.x += velocity.x ? velocity.x : 0;
        this.position.y += velocity.y ? velocity.y : 0;
    }

    public isCollision(object: SceneObjectInterface): boolean {
        return this.position.x < object.position.x + object.size.width &&
            this.position.x + this.size.width > object.position.x &&
            this.position.y < object.position.y + object.size.height &&
            this.position.y + this.size.height > object.position.y
    }

    public update(): void {
    };
}
