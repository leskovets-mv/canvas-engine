import Core from "../../core/core";
import { environments } from "../environments/environments";
import { MenuScene } from "./components/scenes/menu.scene";
import { MainScene } from "./components/scenes/main.scene";
import { TestScene } from "./components/scenes/test.scene";

const core = new Core({
    width: environments.WIDTH,
    height: environments.HEIGHT,
});

const menuScene = new MenuScene({
    background: 'background.png',
    context: core.context,
});
const testScene = new TestScene({
    context: core.context,
});

const mainScene = new MainScene({
    background: 'background.png',
    context: core.context,
});

core.appendScene({ name: 'main', scene: mainScene });
core.appendScene({ name: 'menu', scene: menuScene });
core.appendScene({ name: 'test', scene: testScene });
core.setActiveScene('test');
