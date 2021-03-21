import {Scene} from "../../../../core/components/scene/scene";
import {PlayerModel} from "../models/player/player.model";
import {environments} from "../../../environments/environments";
import {PlayerControl} from "../models/player/player.control";

export class TestScene extends Scene {
    private player: PlayerModel;

    constructor(options) {
        super(options);
    }

    public init(): void {
        this.player = new PlayerModel({
            control: new PlayerControl(),
            position: {x: environments.WIDTH / 2 - 150, y: environments.HEIGHT / 2 - 50},
            size: {width: 300, height: 100},
            name: 'player',
            color: 'red'
        });
        this.appendSceneObjectToLayer(this.player);
    }
}
