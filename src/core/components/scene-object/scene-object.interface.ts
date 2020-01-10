import { PositionInterface } from "../../util/interfaces/position.interface";
import { SceneObjectControl } from "./scene-object.control";
import { SizeInterface } from "../../util/interfaces/size.interface";

export interface SceneObjectInterface extends SceneObjectControl {
    position: PositionInterface;
    size: SizeInterface;
    color: string;
    name: string;
    texture: string;
    setControl: () => void;
    removeControl: () => void;
    update: () => void;
    text?: string;
    control: SceneObjectControl;
    keyDownHandler: (e: KeyboardEvent) => void;
    keyUpHandler: (e: KeyboardEvent) => void;
    clickHandler: (e: MouseEvent) => void;
    mouseUpHandler: (e: MouseEvent) => void;
    mouseDownHandler: (e: MouseEvent) => void;
}
