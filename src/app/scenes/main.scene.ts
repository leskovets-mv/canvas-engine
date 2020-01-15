import { SceneObject } from "../../core/components/scene-object/scene-object";
import { environments } from "../../environments/environments";
import { Scene } from "../../core/components/scene/scene";
import { BirdControl } from "../controls/bird.control";
import { PipeModel } from "../models/pipe.model";
import { BirdModel } from "../models/bird.model";

export default class MainScene extends Scene {
    public background: string;
    public imageList: { [p: string]: HTMLImageElement };
    private player: BirdModel;
    private tubes: SceneObject[];
    private grounds: SceneObject[];
    private gameOver: boolean;
    private score: number;

    constructor(params: { [key: string]: any }) {
        super(params);
    }

    private generateGround(lastGroundPositionX = 0): SceneObject {
        const ground = new SceneObject({
            position: { x: lastGroundPositionX, y: 260 },
            size: { height: 112, width: 336 },
            name: 'ground',
            texture: 'ground.png',
        });
        this.appendSceneObjectToLayer(ground);
        return ground;
    };

    private generateTubes(): SceneObject[] {
        this.score++;
        let y: number;
        const tubes: SceneObject[] = [];
        for (let i = 1; i < 3; i++) {
            y = i % 2 ? Math.floor(Math.random() * environments.HEIGHT / 2) + 100 : y;
            const tube = new PipeModel({
                position: {
                    x: environments.WIDTH,
                    y: i % 2 ? -y : environments.HEIGHT + 60 - y
                },
                size: {
                    height: environments.HEIGHT,
                    width: 30
                },
                name: i % 2 ? 'pipe-r' : 'pipe',
                texture: i % 2 ? 'pipe-r.png' : 'pipe.png'
            });
            tubes.push(tube)
        }
        this.appendSceneObjectsToLayer(tubes);
        return tubes;
    };

    private generatePlayer(): BirdModel {
        const bird = new BirdModel({
            position: { x: 30, y: environments.HEIGHT / 2 },
            size: { height: 23, width: 32 },
            name: 'bird',
            texture: 'bird.png',
            control: new BirdControl()
        });
        this.appendSceneObjectToLayer(bird);

        return bird;
    }

    public init() {
        this.gameOver = false;
        this.tubes = [];
        this.grounds = [];
        this.player = this.generatePlayer();
        this.score = -1;
    };

    public update() {
        super.update();
        if (this.gameOver) {
            this.setActiveScene('menu');
            return;
        }
        this.context.fillText(`Счёт: ${this.score}`, 40, 40);

        // grounds
        if (!this.grounds.length) {
            this.grounds.push(this.generateGround());
        } else if (this.grounds.length < 3) {
            const lastGround = this.grounds[this.grounds.length - 1];
            this.grounds.push(this.generateGround(lastGround.position.x + lastGround.size.width - 1));
        }
        this.grounds.forEach((ground, index) => {
            if (this.player.isCollision(ground)) {
                this.gameOver = true;
            }
            if (ground.position.x + ground.size.width > 0) {
                ground.position.x--;
            } else {
                this.destroySceneObjectToLayer(ground);
                this.grounds.splice(index, 1)
            }
        });
        //end grounds

        // tubes
        if (!this.tubes.length) {
            this.tubes.push(...this.generateTubes())
        }
        this.tubes.forEach((tube, index) => {
            if (this.player.isCollision(tube)) {
                this.gameOver = true;
            }
            if (tube.position.x + tube.size.width < 0) {
                this.destroySceneObjectToLayer(tube);
                this.tubes.splice(index, 1)
            }
        });
        //end tubes
    };
}
