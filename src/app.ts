import { Engine } from "./core/engine";
import { Bird } from "./bird";
import { GameObject } from "./core/gameObject";
import { GameControl } from "./gameControl";
import { Tube } from "./tube";

const WIDTH: number = 600;
const HEIGHT: number = 300;

let gameOver: boolean = false;
let score: number = 0;

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
            name: i % 2 ? 'pipe-r' : 'pipe',
            texture: i % 2 ? 'pipe-r.png' : 'pipe.png'
        })
        tubes.push(tube)
    }

    game.addedgameObjects(tubes)

    return tubes;
}

const generateGround = (lastGroundPositinX = 0): GameObject => {
    const ground = new GameObject({
        position: { x: lastGroundPositinX, y: 260 },
        size: { height: 112, width: 336 },
        name: 'ground',
        texture: 'ground.png',
        color: 'green'
    })

    game.addedgameObject(ground)

    return ground;
}

const tubes: GameObject[] = [];
const grounds: GameObject[] = [];

game.update = () => {
    const _game = game;
    _game.context.clearRect(0, 0, _game.width, _game.height);
    _game.gameObjects.forEach(gameObject => {
        _game.uploadImage(gameObject.name, gameObject.texture)
        _game.context.fillStyle = gameObject.color;
        if (gameObject.texture === '') {
            _game.context.fillRect(gameObject.position.x, gameObject.position.y, gameObject.size.width, gameObject.size.height);
        } else if (gameObject.texture) {
            if (_game.imageList[gameObject.name]) {
                _game.context.drawImage(
                    _game.imageList[gameObject.name],
                    gameObject.position.x,
                    gameObject.position.y,
                    gameObject.size.width,
                    gameObject.size.height
                )
            }
        }
        _game.context.fillStyle = 'black';
    })
    _game.context.strokeText(`Очки: ${score}` , 40, 40)
    grounds.forEach((ground, index) => {
        if (player.isCollision(ground)) {
            gameOver = true
        }
        if (ground.position.x + ground.size.width > 0) {
            ground.position.x--;
        } else {
            grounds.splice(index, 1)
        }
    })

    tubes.forEach((tube, index) => {
        if (player.isCollision(tube)) {
            gameOver = true
        }

        if (tube.position.x + tube.size.width < 0) {
            game.destroyGameObject(tube)
            tubes.splice(index, 1)
        }
        tube.update();
    })

    if (!tubes.length) {
        tubes.push(...generateTubes())
    }

    if (!grounds.length) {
        grounds.push(generateGround());
    } else if (grounds.length < 3) {
        grounds.push(generateGround(grounds[grounds.length - 1].position.x + grounds[grounds.length - 1].size.width - 1));
    }

    player.update();
    if (!gameOver) {
        requestAnimationFrame(_game.update);
    }
    score++;
}

const player = new Bird({
    position: { x: 30, y: HEIGHT / 2 },
    size: { height: 23, width: 32 },
    color: 'red',
    name: 'bird',
    texture: 'bird.png',
    control: GameControl()
})

game.addedgameObject(player);
game.init();
game.update();
