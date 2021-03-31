import {IPoint} from "../point/point.interface";

export interface IHexagon<T> {
    center: IPoint;
    edges: number;
    data: T;
    hovered: boolean;
}