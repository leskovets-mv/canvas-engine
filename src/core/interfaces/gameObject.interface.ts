import { PositionInterface } from "./position.interface";
import { SizeInterface } from "./size.interface";

export interface GameObjectInterface {
    position: PositionInterface;
    size: SizeInterface;
    color: string;
    name: string;
    texture: string;
    update?: () => void;
}
