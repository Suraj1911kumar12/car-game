const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const carWidth = 50;
const carHeight = 100;
const roadWidth = canvas.width / 5;
let carX = canvas.width / 2 - carWidth / 2;
const carY = canvas.height - carHeight - 10;

let obstacles = [];
let obstacleSpeed = 5;
let gameOver = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && carX > roadWidth) {
        carX -= roadWidth;
    } else if (e.key === 'ArrowRight' && carX < roadWidth * 2) {
        carX += roadWidth;
    }
});

function drawCar() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(carX, carY, carWidth, carHeight);
}

function drawObstacle(x, y) {
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, carWidth, carHeight);
}

function generateObstacle() {
    const randomLane = Math.floor(Math.random() * 3);
    const obstacleX = randomLane * roadWidth + roadWidth / 2 - carWidth / 2;
    obstacles.push({ x: obstacleX, y: -carHeight });
}

function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += obstacleSpeed;
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            i--;
        }
    }
}

function checkCollision() {
    for (let obstacle of obstacles) {
        if (
            carX < obstacle.x + carWidth &&
            carX + carWidth > obstacle.x &&
            carY < obstacle.y + carHeight &&
            carY + carHeight > obstacle.y
        ) {
            gameOver = true;
        }
    }
}

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '48px sans-serif';
        ctx.fillText('Game Over', canvas.width / 2 - 120, canvas.height / 2);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCar();
    for (let obstacle of obstacles) {
        drawObstacle(obstacle.x, obstacle.y);
    }

    updateObstacles();
    checkCollision();

    requestAnimationFrame(gameLoop);
}

setInterval(generateObstacle, 2000);
gameLoop();
