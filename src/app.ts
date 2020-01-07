import { Engine } from "./core/engine";
import { Bird } from "./bird";
import { GameObject } from "./core/gameObject";
import { GameControl } from "./gameControl";

const game = new Engine({
    width: 600,
    height: 300
});

game.update = () => {
    const _game = game;
    _game.context.clearRect(0, 0, _game.width, _game.height);
    _game.gameObjects.forEach(gameObject => {
        _game.context.fillStyle = gameObject.color;
        _game.context.fillRect(gameObject.position.x, gameObject.position.y, gameObject.size.width, gameObject.size.height);
        _game.context.fillStyle = 'black';
    })
    player.update();
    requestAnimationFrame(_game.update);
}

const player = new Bird({
    position: { x: 30, y: 30 },
    size: { height: 10, width: 10 },
    color: 'red',
    control: GameControl()
})

const grow = new GameObject({
    position: { x: 0, y: 280 },
    size: { height: 20, width: 600 },
    color: 'green'
})

const cloud = new GameObject({
    position: { x: 0, y: 0 },
    size: { height: 20, width: 600 },
    color: 'blue'
})


game.addedgameObjects([player, grow, cloud]);
game.init();
game.update();