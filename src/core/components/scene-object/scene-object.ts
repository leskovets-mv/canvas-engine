import {PositionInterface} from "../../util/interfaces/position.interface";
import {SizeInterface} from "../../util/interfaces/size.interface";
import {SceneObjectInterface} from "./scene-object.interface";

export class SceneObject implements SceneObjectInterface {
    public size: SizeInterface;
    public position: PositionInterface;
    public color: string;
    public texture: string;
    public name: string;
    public control: any;

    constructor(params: { [key: string]: any }) {
        this.position = params.position || {};
        this.size = params.size || {};
        this.color = params.color || '';
        this.name = params.name || '';
        this.texture = params.texture || '';
        if (params.update) {
            this.update = params.update;
        }
        if (params.control) {
            this.control = params.control;
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


    public setControl(): void {
        if (this.control) {
            document.addEventListener('keydown', this.control.keyDownHandler.bind(this));
            document.addEventListener('keyup', this.control.keyUpHandler.bind(this));
            document.addEventListener('click', this.control.clickHandler.bind(this));
            document.addEventListener('mouseup', this.control.mouseUpHandler.bind(this));
            document.addEventListener('mousedown', this.control.mouseDownHandler.bind(this));
        }
    }

    public update() {
    };
}
