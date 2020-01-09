import {MainScene} from "./scenes/main/main.scene";
import projectConfig from './project.config'
import {Engine} from "./core/engine";

const game = new Engine({
    width: projectConfig.WIDTH,
    height: projectConfig.HEIGHT,
});

game.setScene(new MainScene({
    background: 'background.png',
    context: game.context
}));