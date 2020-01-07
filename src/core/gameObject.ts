import { GameObjectInterface } from "./interfaces/gameObject.interface";
import { PositionInterface } from "./interfaces/position.interface";
import { SizeInterface } from "./interfaces/size.interface";

export class GameObject {
    public size: SizeInterface
    public position: PositionInterface
    public color: string;

    constructor(params:any) {
        this.position = params.position;
        this.size = params.size;
        this.color = params.color;
    }

    public direction(velosity: PositionInterface): void {
        this.position.x += velosity.x ? velosity.x : 0;
        this.position.y += velosity.y ? velosity.y : 0;
    }

    public isCollision(gameObject: GameObjectInterface): boolean {
        return false;
    }

    public update(): void {

    }
}

