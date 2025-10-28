// Game variables
let player = document.getElementById("player");
let obstacle = document.getElementById("obstacle");
let gameContainer = document.getElementById("game-container");
let startButton = document.getElementById("start-game");
let playerPosition = { x: 180, y: 550 };
let obstacleSpeed = 3;
let gameInterval;
let isGameRunning = false;

// Move player based on keyboard input
document.addEventListener("keydown", function(event) {
    if (!isGameRunning) return;

    if (event.key === "ArrowLeft" && playerPosition.x > 0) {
        playerPosition.x -= 10;
    } else if (event.key === "ArrowRight" && playerPosition.x < 360) {
        playerPosition.x += 10;
    } else if (event.key === "ArrowUp" && playerPosition.y > 0) {
        playerPosition.y -= 10;
    } else if (event.key === "ArrowDown" && playerPosition.y < 560) {
        playerPosition.y += 10;
    }
    updatePlayerPosition();
});

// Update player position in the game container
function updatePlayerPosition() {
    player.style.left = playerPosition.x + "px";
    player.style.top = playerPosition.y + "px";
}

// Start the game
startButton.addEventListener("click", function() {
    if (!isGameRunning) {
        isGameRunning = true;
        obstacleSpeed = 3;
        startButton.disabled = true;
        gameInterval = setInterval(gameLoop, 20);
    }
});

// Game loop
function gameLoop() {
    moveObstacle();
    checkCollision();
}

// Move obstacle downwards
function moveObstacle() {
    let obstacleY = parseInt(window.getComputedStyle(obstacle).getPropertyValue("top"));
    if (obstacleY >= 600) {
        // Reset obstacle to the top with a random horizontal position
        obstacle.style.left = Math.random() * 340 + "px";
        obstacle.style.top = "-20px";
    } else {
        obstacle.style.top = obstacleY + obstacleSpeed + "px";
    }
}

// Check for collisions between the player and obstacle
function checkCollision() {
    let playerRect = player.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    if (
        playerRect.x < obstacleRect.x + obstacleRect.width &&
        playerRect.x + playerRect.width > obstacleRect.x &&
        playerRect.y < obstacleRect.y + obstacleRect.height &&
        playerRect.height + playerRect.y > obstacleRect.y
    ) {
        // Collision detected, stop the game
        gameOver();
    }
}

// End the game
function gameOver() {
    clearInterval(gameInterval);
    alert("Game Over!");
    isGameRunning = false;
    startButton.disabled = false;
    resetGame();
}

// Reset the game to the initial state
function resetGame() {
    playerPosition = { x: 180, y: 550 };
    updatePlayerPosition();
    obstacle.style.top = "-20px";
    obstacleSpeed = 3;
}
