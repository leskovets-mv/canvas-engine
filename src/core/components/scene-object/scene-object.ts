import { PositionInterface } from "../../util/interfaces/position.interface";
import { SizeInterface } from "../../util/interfaces/size.interface";
import { SceneObjectInterface } from "./scene-object.interface";

export class SceneObject implements SceneObjectInterface {
    public size: SizeInterface;
    public position: PositionInterface;
    public color: string;
    public texture: string;
    public name: string;
    public control: any;
    public text: string;
    public keyDownHandler: (e: KeyboardEvent) => void;
    public keyUpHandler: (e: KeyboardEvent) => void;
    public clickHandler: (e: MouseEvent) => void;
    public mouseUpHandler: (e: MouseEvent) => void;
    public mouseDownHandler: (e: MouseEvent) => void;

    constructor(params: { [key: string]: any }) {
        this.position = params.position || {};
        this.size = params.size || {};
        this.color = params.color || '';
        this.name = params.name || '';
        if (params.text) {
            this.text = params.text;
        }
        this.texture = params.texture || '';
        if (params.update) {
            this.update = params.update;
        }
        if (params.control) {
            this.control = params.control;
            this.keyDownHandler = params.control.keyDownHandler.bind(this)
            this.keyUpHandler = params.control.keyUpHandler.bind(this)
            this.clickHandler = params.control.clickHandler.bind(this)
            this.mouseUpHandler = params.control.mouseUpHandler.bind(this)
            this.mouseDownHandler = params.control.mouseDownHandler.bind(this)
            this.setControl();
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

    public clickObjectHandler({ x, y }) {
        if (!x || !y) return false;

        return (x >= this.position.x && x <= this.position.x + this.size.width) &&
            (y >= this.position.y && y <= this.position.y + this.size.height)
    }

    public setControl(): void {
        if (this.control) {
            document.addEventListener('keydown', this.keyDownHandler, true);
            document.addEventListener('keyup', this.keyUpHandler, true);
            document.addEventListener('click', this.clickHandler, true);
            document.addEventListener('mouseup', this.mouseUpHandler, true);
            document.addEventListener('mousedown', this.mouseDownHandler, true);
        }
    }

    public removeControl(): void {
        if (this.control) {
            document.removeEventListener('keydown', this.keyDownHandler, true);
            document.removeEventListener('keyup', this.keyUpHandler, true);
            document.removeEventListener('click', this.clickHandler, true);
            document.removeEventListener('mouseup', this.mouseUpHandler, true);
            document.removeEventListener('mousedown', this.mouseDownHandler, true);
        }
    }

    public update(): void { };
}
