import {Hexagon} from "../hexagon/hexagon";
import {IMap} from "./map.interface";
import {IMapConfig} from "./map-config.interface";
import {IFieldConfig} from "./field-config.interface";
import {r} from "../../until/math";

export class Map<T> implements IMap<T> {
    private readonly row: number;
    private readonly column: number;
    public field: Hexagon<T>[][] = [];
    public size: number;

    constructor(config: IMapConfig<T>) {
        const {row, column, size, data} = config;
        this.row = row;
        this.column = column;
        this.size = size;
        this.init({data})
    }

    private init(config: IFieldConfig<T>): void {
        const {data: d} = config;
        for (let j = 0; j < this.row; j++) {
            this.field.push([]);
            for (let i = 0; i < this.column; i++) {
                const x = this.size * 0.5 + i * r(this.size) + (j % 2 ? r(this.size) / 2 : 0);
                const y = this.size * 0.5 + j * this.size * 0.75;
                const data = `${d[j][i]}`;
                const cell = new Hexagon<T>({x, y, data});
                this.field[j].push(cell);
            }
        }
    }
}