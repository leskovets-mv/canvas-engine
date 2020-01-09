import { PositionInterface } from "../../interfaces/position.interface";
import { SizeInterface } from "../../interfaces/size.interface";

export interface SceneObjectInterface {
    position: PositionInterface;
    size: SizeInterface;
    color: string;
    name: string;
    texture: string;
    update?: () => void;
}
