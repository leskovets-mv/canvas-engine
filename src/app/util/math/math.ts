import {SceneObjectInterface} from "../../components/scene-object/scene-object.interface";
import {PointInterface} from "../interfaces/point.Interface";


export function isClick(mouse: PointInterface, target: SceneObjectInterface): boolean {
    if (!mouse || !target) return;

    return positionInsideTarget(mouse, target)
}

export function positionInsideTarget(mouse, target): boolean {
    return mouse.x >= target.position.x && mouse.y >= target.position.y &&
        mouse.x <= target.position.x + target.size.width &&
        mouse.y <= target.position.y + target.size.height;
}

export function positionInsideRotateTarget(mouse, target): boolean {
    const {x, y} = mouse;
    const {rotate} = target;

    const ax = Math.cos(rotate);
    const ay = Math.sin(rotate);

    return positionInsideTarget({
        y: x * ax - y * ay,
        x: x * ay + y * ax,
    }, target)
}

export function positionInsidePolygons(mouse: PointInterface, polygons: PointInterface[],): boolean {
    if (!polygons.length || !mouse) return;
    let result = true;

    const polygonLength = polygons.length;
    let j = polygonLength - 1;

    for (let i = 0; i < polygonLength; i++) {
        if ((((polygons[i].y <= mouse.y) && (mouse.y < polygons[j].y))) &&
            (mouse.x > (polygons[j].y - polygons[i].x) * (mouse.y - polygons[i].y) / (polygons[j].y - polygons[i].y) + polygons[i].x)) {
            result = !result;
            break;
        }
        j = i
    }

    return result;
}

export function isCollision(current: SceneObjectInterface, target: SceneObjectInterface): boolean {
    if (!target || !current) return;

    return current.position.x < target.position.x + target.size.width &&
        current.position.x + current.size.width > target.position.x &&
        current.position.y < target.position.y + target.size.height &&
        current.position.y + current.size.height > target.position.y;
}