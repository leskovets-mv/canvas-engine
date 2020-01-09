import {SceneObjectInterface} from "../../core/components/scene-object/scene-object.interface";
import {SceneObject} from "../../core/components/scene-object/scene-object";
import {BirdControl} from "../../models/bird/birdControl";
import {Scene} from "../../core/components/scene/scene";
import projectConfig from "../../project.config";
import {Pipe} from "../../models/pipe/pipe";
import {Bird} from "../../models/bird/bird";

export class MainScene extends Scene {
    private player: Bird;
    public background: string;
    public imageList: { [p: string]: HTMLImageElement };
    public sceneObjects: SceneObjectInterface[] = [];
    private tubes: SceneObject[];
    private grounds: SceneObject[];
    private gameOver: boolean;

    constructor(params: any) {
        super(params);
    }

    private generateGround(lastGroundPositinX = 0): SceneObject {
        const ground = new SceneObject({
            position: {x: lastGroundPositinX, y: 260},
            size: {height: 112, width: 336},
            name: 'ground',
            texture: 'ground.png',
            color: 'green'
        });
        this.appendSceneObject(ground);
        return ground;
    };

    private generateTubes(): SceneObject[] {
        const gap = projectConfig.HEIGHT / 3;
        const tubes: SceneObject[] = [];
        const y = -Math.floor(Math.random() * projectConfig.HEIGHT / 3);
        for (let i = 1; i < 3; i++) {
            const tube = new Pipe({
                position: {
                    x: projectConfig.WIDTH,
                    y: i % 2 ? y : y + gap + projectConfig.HEIGHT / 2
                },
                size: {
                    height: projectConfig.HEIGHT / 2,
                    width: 30
                },
                color: 'black',
                name: i % 2 ? 'pipe-r' : 'pipe',
                texture: i % 2 ? 'pipe-r.png' : 'pipe.png'
            });
            tubes.push(tube)
        }
        this.appendSceneObjects(tubes);
        return tubes;
    };

    public init() {
        this.sceneObjects = [];
        this.gameOver = false;
        this.tubes = [];
        this.grounds = [];
        this.player = new Bird({
            position: {x: 30, y: projectConfig.HEIGHT / 2},
            size: {height: 23, width: 32},
            color: 'red',
            name: 'bird',
            texture: 'bird.png',
            control: new BirdControl()
        });
        this.appendSceneObject(this.player);
    };

    public update() {
        if (!this.gameOver) {
            this.context.clearRect(0, 0, projectConfig.WIDTH, projectConfig.HEIGHT);
            if (this.imageList['background']) {
                this.context.drawImage(this.imageList['background'], 0, 0, projectConfig.WIDTH, projectConfig.HEIGHT);
            }
            this.player.update();

            this.sceneObjects.forEach(sceneObject => {
                this.uploadImage(sceneObject.name, sceneObject.texture);
                this.context.fillStyle = sceneObject.color;
                if (sceneObject.texture === '') {
                    this.context.fillRect(sceneObject.position.x, sceneObject.position.y, sceneObject.size.width, sceneObject.size.height);
                } else if (sceneObject.texture) {
                    if (this.imageList[sceneObject.name]) {
                        this.context.drawImage(
                            this.imageList[sceneObject.name],
                            sceneObject.position.x,
                            sceneObject.position.y,
                            sceneObject.size.width,
                            sceneObject.size.height
                        )
                    }
                }
                this.context.fillStyle = 'black';
            });
            this.grounds.forEach((ground, index) => {
                if (this.player.isCollision(ground)) {
                    this.gameOver = true;
                }
                if (ground.position.x + ground.size.width > 0) {
                    ground.position.x--;
                } else {
                    this.grounds.splice(index, 1)
                }
            });
            this.tubes.forEach((tube, index) => {
                if (this.player.isCollision(tube)) {
                    this.gameOver = true;
                }
                if (tube.position.x + tube.size.width < 0) {
                    this.destroySceneObject(tube);
                    this.tubes.splice(index, 1)
                }
                tube.update();
            });
            if (!this.tubes.length) {
                this.tubes.push(...this.generateTubes())
            }
            if (!this.grounds.length) {
                this.grounds.push(this.generateGround());
            } else if (this.grounds.length < 3) {
                const lastGround = this.grounds[this.grounds.length - 1];
                this.grounds.push(this.generateGround(lastGround.position.x + lastGround.size.width - 1));
            }
        } else {
            this.setActiveScene('menu');
        }
    };
}
