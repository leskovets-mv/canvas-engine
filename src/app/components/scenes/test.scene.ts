import { Scene } from "../../../../core/components/scene/scene";
import { SceneObject } from "../../../../core/components/scene-object/scene-object";
import { ButtonModel } from "../models/button/button.model";
import { ButtonControl } from "../models/button/button.control";

export class TestScene extends Scene {

    constructor(options: any) {
        super(options);
    }

    public init() {
        const rect = new ButtonModel({
            size: {
                width: 40,
                height: 40
            },
            position: {
                x: 50,
                y: 50
            },
            rotate: 0,
            color: '#999',
            control: new ButtonControl()
        })
        const rect1 = new ButtonModel({
            size: {
                width: 50,
                height: 100
            },
            position: {
                x: 300,
                y: 150
            },
            rotate: 90,
            color: '#888',
            control: new ButtonControl()

        })
        const rect2 = new ButtonModel({
            size: {
                width: 50,
                height: 100
            },
            position: {
                x: 300,
                y: 150
            },
            rotate: 135,
            color: '#777',
            control: new ButtonControl()

        })
        const rect3 = new ButtonModel({
            size: {
                width: 50,
                height: 100
            },
            position: {
                x: 300,
                y: 150
            },
            rotate: 180,
            color: '#666',
            control: new ButtonControl()

        })
        const rect4 = new ButtonModel({
            size: {
                width: 50,
                height: 100
            },
            position: {
                x: 300,
                y: 150
            },
            rotate: 225,
            color: '#555',
            control: new ButtonControl()

        })
        const rect5 = new ButtonModel({
            size: {
                width: 50,
                height: 100
            },
            position: {
                x: 300,
                y: 150
            },
            rotate: 270,
            color: '#444',
            control: new ButtonControl()

        })
        const rect6 = new ButtonModel({
            size: {
                width: 50,
                height: 100
            },
            position: {
                x: 300,
                y: 150
            },
            rotate: 315,
            color: '#333',
            control: new ButtonControl()

        })
        const rect7 = new ButtonModel({
            size: {
                width: 50,
                height: 100
            },
            position: {
                x: 300,
                y: 150
            },
            rotate: 360,
            color: '#222',
            control: new ButtonControl()

        })
        this.appendSceneObjectsToLayer([rect]);
        // this.appendSceneObjectsToLayer([rect7, rect6, rect5, rect4, rect3, rect2, rect1, rect])
    }
}
