import { SceneObjectControl } from "../../util/controls/scene-object.control";
import { PointInterface } from "../../util/interfaces/point.Interface";
import { SizeInterface } from "../../util/interfaces/size.interface";

export interface SceneObjectInterface {
    control: SceneObjectControl;
    position: PointInterface;
    rotate: number;
    size: SizeInterface;
    color: string;
    name: string;
    text?: string;
    texture?: string;
    setControl: () => void;
    removeControl: () => void;
    update: () => void;
}
