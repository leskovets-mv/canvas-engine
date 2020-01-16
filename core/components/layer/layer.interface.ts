import { SceneObject } from "../scene-object/scene-object";

export interface LayerInterface {
    name: string;
    layerObjects: SceneObject[];

    appendSceneObjects(sceneObjects): void;

    appendSceneObject(sceneObject): void;
    
    destroySceneObject(sceneObject): void;
}