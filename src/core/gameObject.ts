import { GameObjectInterface } from "./interfaces/gameObject.interface";
import { PositionInterface } from "./interfaces/position.interface";
import { SizeInterface } from "./interfaces/size.interface";

export class GameObject {
    public size: SizeInterface
    public position: PositionInterface
    public color: string;
    public texture: string;
    public name: string

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

    public direction(velosity: PositionInterface): void {
        this.position.x += velosity.x ? velosity.x : 0;
        this.position.y += velosity.y ? velosity.y : 0;
    }

    public isCollision(object: GameObjectInterface): boolean {
        return this.position.x < object.position.x + object.size.width &&
            this.position.x + this.size.width > object.position.x &&
            this.position.y < object.position.y + object.size.height &&
            this.position.y + this.size.height > object.position.y
    }

    public update(): void {

    }
}

