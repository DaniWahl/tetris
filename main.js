
const canvas = document.getElementById('tetris');

const tetris = new Tetris(canvas);

document.addEventListener('keydown', event => {
    const player = tetris.player;
    if(event.key === 'ArrowLeft') {
        player.move(-1);
    } else if(event.key === 'ArrowRight') {
        player.move(1);
    } else if (event.key === 'ArrowDown') {
        player.drop();
    } else if (event.key === ' ') {
        player.rotate(1);
    } 
});

function updateScore() {
    document.getElementById('score').innerText = tetris.player.score;
}
updateScore();


