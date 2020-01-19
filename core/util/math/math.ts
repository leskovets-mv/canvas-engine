import { SceneObjectInterface } from "../../components/scene-object/scene-object.interface";
import { PointInterface } from "../interfaces/point.Interface";

export function isPoly(polygons: PointInterface[], target: PointInterface): boolean {
    if (!polygons.length || !target) return;
    let result = true;

    const polygonLength = polygons.length;
    let j = polygonLength - 1;

    for (let i = 0; i < polygonLength; i++) {
        if ((((polygons[i].y <= target.y) && (target.y < polygons[j].y))) &&
            (target.x > (polygons[j].y - polygons[i].x) * (target.y - polygons[i].y) / (polygons[j].y - polygons[i].y) + polygons[i].x)) {
            result = !result;
            break;
        }
        j = i
    }

    return result;
}

export function isCollision(object: SceneObjectInterface, current: SceneObjectInterface): boolean {
    if (!object || !current) return;

    return current.position.x < object.position.x + object.size.width &&
        current.position.x + current.size.width > object.position.x &&
        current.position.y < object.position.y + object.size.height &&
        current.position.y + current.size.height > object.position.y;
}

export function isClick(mouse: PointInterface, target: SceneObjectInterface) {
    if (!mouse || !target) return;

    // if (target.rotate) {
    return insideRotate(mouse, target)
    // } else {
    // return inside(mouse, target)
    // }
}

const insideRotate = (mouse, target) => {
    const { x, y } = mouse;
    const { rotate } = target

    const ax = Math.cos(rotate)
    const ay = Math.sin(rotate)

    return inside({
        y: x * ax - y * ay,
        x: x * ay + y * ax,
    }, target)
}

const inside = (mouse, target) => {
    console.log(mouse)
    return mouse.x >= target.position.x && mouse.y >= target.position.y &&
        mouse.x <= target.position.x + target.size.width &&
        mouse.y <= target.position.y + target.size.height;
}

