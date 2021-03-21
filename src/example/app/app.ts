import {environments} from "../environments/environments";
import {MenuScene} from "./components/scenes/menu.scene";
import {TestScene} from "./components/scenes/test.scene";
import Core from "../../core/core";
import './style.scss';

const core = new Core({
    width: environments.WIDTH,
    height: environments.HEIGHT,
});
window.document.body.appendChild(core.canvas);

const menuScene = new MenuScene({
    context: core.context,
});

const testScene = new TestScene({
    context: core.context,
});

core.appendScene({name: 'menu', scene: menuScene});
core.appendScene({name: 'test', scene: testScene});
core.setActiveScene('menu');
