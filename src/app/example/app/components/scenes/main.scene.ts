import { environments } from "../../../environments/environments";
import { Scene } from "../../../../core/components/scene/scene";
import { BirdControl } from "../models/bird/bird.control";
import { GroundModel } from "../models/ground/ground.model";
import { PipeModel } from "../models/pipe/pipe.model";
import { BirdModel } from "../models/bird/bird.model";

export class MainScene extends Scene {
    public background: string;
    private player: BirdModel;
    private pipes: PipeModel[];
    private grounds: GroundModel[];
    private gameOver: boolean;
    private score: number;

    constructor(options: { [key: string]: any }) {
        super(options);
    }

    private generateGround(lastGroundPositionX = 0): GroundModel {
        const ground = new GroundModel({
            position: { x: lastGroundPositionX, y: 260 },
            size: { height: 112, width: 336 },
            name: 'ground',
            texture: 'ground.png',
        });
        this.appendSceneObjectToLayer(ground);
        return ground;
    };

    private generateTubes(): PipeModel[] {
        this.score++;
        let y: number;
        const pipes: PipeModel[] = [];
        for (let i = 1; i < 3; i++) {
            if (i % 2) {
                y = Math.floor(Math.random() * environments.HEIGHT / 2) + 100
            }
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
            pipes.push(tube)
        }
        this.appendSceneObjectsToLayer(pipes);
        return pipes;
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
        this.pipes = [];
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
        if (!this.grounds.length) {
            this.grounds.push(this.generateGround());
        } else if (this.grounds.length < 3) {
            const lastGround = this.grounds[this.grounds.length - 1];
            this.grounds.push(this.generateGround(lastGround.position.x + lastGround.size.width - 1));
        }
        this.grounds.forEach((ground, index) => {
            if (this.player.isCollision(ground, this.player)) {
                this.gameOver = true;
            }
            if (ground.position.x + ground.size.width > 0) {
                ground.position.x--;
            } else {
                this.destroySceneObjectToLayer(ground);
                this.grounds.splice(index, 1)
            }
        });
        if (!this.pipes.length) {
            this.pipes.push(...this.generateTubes())
        }
        this.pipes.forEach((tube, index) => {
            if (this.player.isCollision(tube, this.player)) {
                this.gameOver = true;
            }
            if (tube.position.x + tube.size.width < 0) {
                this.destroySceneObjectToLayer(tube);
                this.pipes.splice(index, 1)
            }
        });
    };
}
