import {MainScene} from "./scenes/main/main.scene";
import {MenuScene} from "./scenes/menu/menu.scene";
import projectConfig from './project.config'
import {Core} from "./core/core";

const game = new Core({
    width: projectConfig.WIDTH,
    height: projectConfig.HEIGHT,
});

const menuScene = new MenuScene({
    background: 'background.png',
    context: game.context,
    setActiveScene: game.setActiveScene.bind(game)
});

const mainScene = new MainScene({
    background: 'background.png',
    context: game.context,
    setActiveScene: game.setActiveScene.bind(game)
});

game.appendScene({name: 'main', scene: mainScene});
game.appendScene({name: 'menu', scene: menuScene});
game.setActiveScene('menu');
