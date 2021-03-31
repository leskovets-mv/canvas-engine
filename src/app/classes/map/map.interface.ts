import {Hexagon} from "../hexagon/hexagon";

export interface IMap<T> {
    field: Hexagon<T>[][];
    size: number;
}