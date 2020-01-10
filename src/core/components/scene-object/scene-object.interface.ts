import {PositionInterface} from "../../util/interfaces/position.interface";
import {SceneObjectControl} from "./scene-object.control";
import {SizeInterface} from "../../util/interfaces/size.interface";

export interface SceneObjectInterface {
    position: PositionInterface;
    size: SizeInterface;
    color: string;
    name: string;
    texture: string;
    update: () => void;
    control: SceneObjectControl
}
