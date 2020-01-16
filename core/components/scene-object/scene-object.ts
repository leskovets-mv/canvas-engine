import {PointInterface} from "../../util/interfaces/point.Interface";
import {SizeInterface} from "../../util/interfaces/size.interface";
import {SceneObjectInterface} from "./scene-object.interface";
import {isCollision} from "../../util/math/math";

export class SceneObject implements SceneObjectInterface {
    public size: SizeInterface;
    public position: PointInterface;
    public color: string;
    public texture: string;
    public name: string;
    public control: any;
    public text: string;
    public isCollision: (object, current) => boolean;
    private readonly keyDownHandler: (e: KeyboardEvent) => void;
    private readonly keyUpHandler: (e: KeyboardEvent) => void;
    private readonly clickHandler: (e: MouseEvent) => void;
    private readonly mouseUpHandler: (e: MouseEvent) => void;
    private readonly mouseDownHandler: (e: MouseEvent) => void;

    constructor(options: { [key: string]: any }) {
        this.position = options.position || {};
        this.size = options.size || {};
        this.color = options.color || 'transparent';
        this.name = options.name || '';
        if (options.text) {
            this.text = options.text;
        }
        if (options.texture) {
            this.texture = options.texture;
        }
        if (options.update) {
            this.update = options.update;
        }
        if (options.control) {
            this.control = options.control;
            this.keyDownHandler = options.control.keyDownHandler.bind(this);
            this.keyUpHandler = options.control.keyUpHandler.bind(this);
            this.clickHandler = options.control.clickHandler.bind(this);
            this.mouseUpHandler = options.control.mouseUpHandler.bind(this);
            this.mouseDownHandler = options.control.mouseDownHandler.bind(this);
            this.setControl();
        }
        this.isCollision = isCollision
    }

    public direction(velocity: PointInterface): void {
        this.position.x += velocity.x ? velocity.x : 0;
        this.position.y += velocity.y ? velocity.y : 0;
    }

    public clickObjectHandler(target: PointInterface): boolean {
        return this.isCollision(target, this);
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

    public update(): void {
    };
}
