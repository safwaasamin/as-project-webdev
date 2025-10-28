// Game variables
let stickman = document.getElementById("stickman");
let obstacle = document.getElementById("obstacle");
let startButton = document.getElementById("start-game");
let isJumping = false;
let isGameRunning = false;
let gravity = 0.9;
let jumpHeight = 15;
let speed = 5;
let obstacleSpeed = 4;
let gameInterval;
let obstacleInterval;

// Function to make the stickman jump
function jump() {
    if (isJumping) return; // Prevent multiple jumps
    isJumping = true;
    
    let jumpVelocity = jumpHeight;
    let jumpInterval = setInterval(() => {
        let stickmanY = parseInt(window.getComputedStyle(stickman).getPropertyValue("bottom"));

        if (stickmanY >= 150) {
            // Start falling down after reaching peak height
            clearInterval(jumpInterval);
            let fallInterval = setInterval(() => {
                stickmanY = parseInt(window.getComputedStyle(stickman).getPropertyValue("bottom"));
                if (stickmanY <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false; // Stickman is on the ground, allow jumping again
                } else {
                    stickman.style.bottom = (stickmanY - jumpVelocity) + "px";
                }
            }, 20);
        } else {
            stickman.style.bottom = (stickmanY + jumpVelocity) + "px"; // Jump up
        }
    }, 20);
}

// Move obstacle
function moveObstacle() {
    let obstacleX = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));
    
    if (obstacleX > 600) {
        obstacle.style.right = "0px"; // Reset to the left side
        obstacle.style.bottom = "0";  // Reset position to ground
    } else {
        obstacle.style.right = obstacleX + obstacleSpeed + "px"; // Move obstacle leftwards
    }
}

// Game loop
function gameLoop() {
    moveObstacle();
    checkCollision();
}

// Start the game
startButton.addEventListener("click", function() {
    if (!isGameRunning) {
        isGameRunning = true;
        startButton.disabled = true;
        gameInterval = setInterval(gameLoop, 20); // Run the game loop
    }
});

// Jump when the spacebar is pressed
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && isGameRunning) {
        jump();
    }
});

// Check for collision between stickman and obstacle
function checkCollision() {
    let stickmanRect = stickman.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    if (
        stickmanRect.x < obstacleRect.x + obstacleRect.width &&
        stickmanRect.x + stickmanRect.width > obstacleRect.x &&
        stickmanRect.y < obstacleRect.y + obstacleRect.height &&
        stickmanRect.height + stickmanRect.y > obstacleRect.y
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
    stickman.style.bottom = "0px";
    obstacle.style.right = "-20px";
}
