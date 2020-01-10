import {environments} from "../environments/environments";
import MenuScene from "./scenes/menu.scene";
import MainScene from "./scenes/main.scene";
import Game from "../core/core";

const game = new Game({
    width: environments.WIDTH,
    height: environments.HEIGHT,
});

const menuScene = new MenuScene({
    background: 'background.png',
    context: game.context,
});

const mainScene = new MainScene({
    background: 'background.png',
    context: game.context,
});

game.appendScene({name: 'main', scene: mainScene});
game.appendScene({name: 'menu', scene: menuScene});
game.setActiveScene('menu');
