import {IHexagon} from "./hexagon.interface";
import {IPoint} from "../point/point.interface";

export class Hexagon<T> implements IHexagon<T> {
    public readonly edges = 6;
    public center: IPoint;
    public data: T;
    public hovered: boolean;

    constructor(config) {
        const {data, x, y} = config;
        this.data = data;
        this.center = {x, y};
    }
}