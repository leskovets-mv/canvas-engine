import {IPoint} from "../classes/point/point.interface";

export function r(radius: number): number {
    return Math.sqrt(3) * radius / 2;
}

export function isMouseIn(radius, edges, center, mouse): boolean {
    const {x: cx, y: cy} = center;
    const {x: mx, y: my} = mouse;
    const distance = Math.hypot(mx - cx, my - cy);
    const angle = Math.atan2(cy - my, mx - cx);
    const angleMouse = radius * Math.cos(Math.PI / edges);
    return distance <= (radius + angleMouse) / 2 + Math.cos(angle / edges) * (radius - angleMouse) / 2;
}

export function getScalePosition(position: IPoint,
                                 origin: IPoint = {x: 0, y: 0},
                                 offset: IPoint = {x: 0, y: 0},
                                 scale: number = 1): IPoint {
    const {x, y} = position;
    const dx = x / scale + origin.x - offset.x;
    const dy = y / scale + origin.y - offset.y;
    return {x: dx, y: dy};
}