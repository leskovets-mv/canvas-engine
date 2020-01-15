import { SceneObjectControl } from "../../util/controls/scene-object.control";
import { PositionInterface } from "../../util/interfaces/position.interface";
import { SizeInterface } from "../../util/interfaces/size.interface";

export interface SceneObjectInterface {
    control: SceneObjectControl;
    position: PositionInterface;
    size: SizeInterface;
    color: string;
    name: string;
    text?: string;
    texture?: string;
    setControl: () => void;
    removeControl: () => void;
    update: () => void;
}
