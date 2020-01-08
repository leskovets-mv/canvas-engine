import { Engine } from "./core/engine";
import { Bird } from "./bird";
import { GameObject } from "./core/gameObject";
import { GameControl } from "./gameControl";
import { Tube } from "./tube";

const WIDTH = 600;
const HEIGHT = 300;

const game = new Engine({
    width: WIDTH,
    height: HEIGHT
});

const generateTubes = (): GameObject[] => {
    const grap = HEIGHT / 3;
    const tubes: GameObject[] = []
    const y = -Math.floor(Math.random() * HEIGHT / 3)

    for (let i = 1; i < 3; i++) {
        const tube = new Tube({
            position: {
                x: WIDTH,
                y: i % 2 ? y : y + grap + HEIGHT / 2
            },
            size: {
                height: HEIGHT / 2,
                width: 30
            },
            color: 'black',
        })
        tubes.push(tube)
    }

    return tubes;
}

const tubes: GameObject[] = generateTubes()


game.update = () => {
    const _game = game;
    _game.context.clearRect(0, 0, _game.width, _game.height);
    _game.gameObjects.forEach(gameObject => {
        _game.context.fillStyle = gameObject.color;
        _game.context.fillRect(gameObject.position.x, gameObject.position.y, gameObject.size.width, gameObject.size.height);
        _game.context.fillStyle = 'black';
    })
    player.update();

    if (player.isCollision(grow)) {
        console.log('Врезался')
    }

    tubes.forEach((tube, index) => {
        if (player.isCollision(tube)) {
            console.log('Врезался')
        }

        if (tube.position.x + tube.size.width < 0) {
            game.destroyGameObject(tube)
            tubes.splice(index, 1)
        }

        if (!tubes.length) {
            tubes.push(...generateTubes())
            game.addedgameObjects(tubes)
        }

        tube.update();
    })

    requestAnimationFrame(_game.update);
}

game.uploadImage('bird', 'bird.png')
game.uploadImage('ground', 'ground.png')
game.uploadImage('pipe', 'pipe.png')

const player = new Bird({
    position: { x: 30, y: HEIGHT / 2 },
    size: { height: 32, width: 32 },
    color: 'red',
    control: GameControl()
})

const grow = new GameObject({
    position: { x: 0, y: 280 },
    size: { height: 40, width: 336 },
    color: 'green'
})

game.addedgameObjects([player, ...tubes, grow]);
game.init();
game.update();