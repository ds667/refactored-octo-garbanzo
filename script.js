const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-button");

let playerX = 180;
let score = 0;
let gameRunning = false;

document.addEventListener("keydown", (event) => {
    if (!gameRunning) return;
    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= 20;
    } else if (event.key === "ArrowRight" && playerX < 360) {
        playerX += 20;
    }
    player.style.left = `${playerX}px`;
});

function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    score = 0;
    scoreDisplay.innerText = `Score: ${score}`;
    gameLoop();
}

function gameLoop() {
    if (!gameRunning) return;

    let block = document.createElement("div");
    block.classList.add("block");
    block.style.left = `${Math.random() * 360}px`;
    gameContainer.appendChild(block);

    let blockY = 0;
    let interval = setInterval(() => {
        if (!gameRunning) {
            clearInterval(interval);
            return;
        }
        blockY += 5;
        block.style.top = `${blockY}px`;

        if (blockY > 460 && parseInt(block.style.left) >= playerX && parseInt(block.style.left) <= playerX + 40) {
            alert(`Game Over! Your Score: ${score}`);
            gameRunning = false;
            gameContainer.innerHTML = "";
        }

        if (blockY > 500) {
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
            block.remove();
            clearInterval(interval);
        }
    }, 30);

    setTimeout(gameLoop, 1000 - score * 5);
}

startButton.addEventListener("click", startGame);
