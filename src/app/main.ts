import './style.scss';
import {App} from "./classes/app/app";

const row = 100;
const column = 100;

const generateMap = () => {
    const map = [];
    for (let i = 0; i < row; i++) {
        const r = [];
        for (let j = 0; j < column; j++) {
            r.push(Math.random() < 0.4 ? 'green' : 'brown');
        }
        map.push(r)
    }
    return map;
};

const data = generateMap();


const mapConfig = {data, row, column, size: 47};

const app = new App(mapConfig);

app.render();