import {SceneObject} from "../scene-object/scene-object";

export interface LayerInterface {
    name: string;
    layerObjects: SceneObject[];

    appendSceneObjects(sceneObjects: SceneObject[]): void;

    appendSceneObject(sceneObject: SceneObject): void;

    destroySceneObject(sceneObject: SceneObject): void;
}
