export interface GameControlInterface {
    jump: boolean;
}

export function GameControl(): GameControlInterface {
    const control = { jump: false };

    document.addEventListener('keydown', event => {
        if (event.keyCode === 32) {
            control.jump = true;
        }

        document.addEventListener('keyup', event => {
            if (event.keyCode === 32) {
                control.jump = false;
            }
        })
    })

    return control;
}