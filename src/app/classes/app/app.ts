import {IApp} from "./app.interface";
import {IPoint} from "../point/point.interface";
import {Map} from "../map/map";
import {IMapConfig} from "../map/map-config.interface";
import {Hexagon} from "../hexagon/hexagon";
import {getScalePosition, isMouseIn, r} from "../../until/math";

const texture = {
    'green': '#179328',
    'brown': '#6f2a2b'
};

export class App<T> implements IApp {
    private _mousePressed: boolean;
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;
    private readonly _map: Map<T>;

    private _offset: IPoint = {x: 0, y: 0};
    private _origin: IPoint = {x: 0, y: 0};
    private _scale: number = 1;

    constructor(mapConfig: IMapConfig<T>) {
        const {width, height} = document.body.getBoundingClientRect();
        this._width = width;
        this._height = height;
        this._map = new Map(mapConfig);
        this.init();
    }

    private init(): void {
        this._canvas = document.createElement('canvas');
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._context = this._canvas.getContext('2d');

        document.body.appendChild(this._canvas);
        this.addControl();
    }

    private draw(): void {
        const dx = this._offset.x * -1 + this._origin.x;
        const dy = this._offset.y * -1 + this._origin.y;
        const dw = this._context.canvas.width / this._scale;
        const dh = this._context.canvas.height / this._scale;
        this._context.save();
        this._context.translate(this._offset.x, this._offset.y);
        this._context.clearRect(dx, dy, dw, dh);

        if (!this._map) {
            return;
        }
        const {size} = this._map;
        this._map.field.forEach((row: Hexagon<T>[]) => {
            row.forEach((hex: Hexagon<T>) => {
                const {x, y} = hex.center;
                let angle = 180 / hex.edges * Math.PI / 180 * -1;
                let dx = x + (size / 2 * Math.cos(angle)) - r(size) / 2;
                let dy = y + size / 2 * Math.sin(angle) - size / 4;
                this._context.beginPath();
                this._context.moveTo(dx, dy);
                for (let i = 0; i < hex.edges; i++) {
                    angle += 360 / hex.edges * Math.PI / 180;
                    dx = dx + size / 2 * Math.cos(angle);
                    dy = dy + size / 2 * Math.sin(angle);
                    this._context.lineTo(dx, dy);
                }
                if (hex.hovered) {
                    this._context.globalAlpha = 0.7;
                }
                this._context.fillStyle = texture[hex.data.toString()];
                this._context.fill();
                this._context.stroke();
                this._context.globalAlpha = 1;

            });
        });
        this._context.restore();
    }

    private addControl(): void {
        window.addEventListener('resize', () => {
            const {width, height} = document.body.getBoundingClientRect();
            this._width = width;
            this._height = height;
            this._canvas.width = this._width;
            this._canvas.height = this._height;
        });

        this._canvas.addEventListener('wheel', event => {
            event.preventDefault();
            const {offsetX, offsetY} = event;
            const wheel = event.deltaY < 0 ? 1 : -1;
            const zoom = Math.exp(wheel * 0.04);
            this._context.translate(this._origin.x, this._origin.y);
            this._origin.x -= offsetX / (this._scale * zoom) - offsetX / this._scale;
            this._origin.y -= offsetY / (this._scale * zoom) - offsetY / this._scale;
            this._context.scale(zoom, zoom);
            this._context.translate(this._origin.x * -1, this._origin.y * -1);
            this._scale *= zoom;
        });
        this._canvas.addEventListener('mousedown', ev => {
            this._mousePressed = true;
        });
        this._canvas.addEventListener('mouseup', ev => {
            this._mousePressed = false
        });
        this._canvas.addEventListener('mousemove', ev => {
            if (!this._mousePressed) {
                const offset = {x: ev.offsetX, y: ev.offsetY};
                const {x, y} = getScalePosition(offset, this._origin, this._offset, this._scale);
                this.hover({x, y});
            } else {
                const {movementX, movementY} = ev;
                this._offset.x += movementX / this._scale;
                this._offset.y += movementY / this._scale;
            }
        });
    }

    private hover(mouse: IPoint): void {
        const {size} = this._map;
        this._map.field.forEach((row: Hexagon<T>[]) => row
            .forEach((hex: Hexagon<T>) => {
                const {center} = hex;
                hex.hovered = isMouseIn(r(size) / 2, hex.edges, center, mouse)
            }))
    }

    public render(): void {
        this.draw();
        requestAnimationFrame(this.render.bind(this));
    }
}