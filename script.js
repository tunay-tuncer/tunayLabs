const canvas = document.querySelector(".canvas");
const canvasContainer = document.querySelector(".canvasContainer");
const scoreText = document.querySelector(".scoreText");

let canvasWidth = 0;
let canvasHeight = 0;
const ctx = canvas.getContext("2d");

let runnig = false;
let hp = 15;
let score = 0;
const tickRate = 400;
const clickTimer = 400;
const targetSize = 25;
const backgroundColor = "#171717";
const targetColor = "red";

let targetArr = [];

function resizeCanvas() {
  canvas.width = canvasContainer.clientWidth;
  canvas.height = canvasContainer.clientHeight;

  canvasWidth = canvas.width;
  canvasHeight = canvas.height;
}

function clearBoard() {
  resizeCanvas();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function startGame() {
  resizeCanvas();
  clearBoard();
  runnig = true;
  nextTick();
}

function createTarget() {
  const targetX =
    Math.floor(Math.random() * (canvas.width - 2 * targetSize)) + targetSize;
  const targetY =
    Math.floor(Math.random() * (canvas.height - 2 * targetSize)) + targetSize;

  const newTarget = {
    x: targetX,
    y: targetY,
    clicked: false,
  };

  targetArr.push(newTarget);
}

function drawTarget() {
  targetArr.forEach((target) => {
    ctx.fillStyle = targetColor;
    ctx.beginPath();
    ctx.arc(target.x, target.y, targetSize, 0, 2 * Math.PI);
    ctx.fill();
  });
}

function updateScore() {
  scoreText.innerHTML = score;
}

function checkGameOver() {
  if (hp >= 0 && targetArr.length < hp) {
    runnig = true;
  } else {
    runnig = false;
  }
}

function displayGameOver() {
  console.log("Try Again");
}

function nextTick() {
  if (runnig == true) {
    setTimeout(() => {
      clearBoard();
      checkGameOver();
      createTarget();
      drawTarget();
      nextTick();
    }, tickRate);
  }
  if (runnig == false) {
    displayGameOver();
    clearBoard();
  }
}

function isClickInsideTarget(clickX, clickY, target) {
  const distance = Math.sqrt(
    (clickX - target.x) * (clickX - target.x) +
      (clickY - target.y) * (clickY - target.y)
  );
  return distance <= targetSize;
}

canvas.addEventListener("click", function ananas(event) {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  targetArr = targetArr.filter((target) => {
    if (isClickInsideTarget(clickX, clickY, target)) {
      score++; // Increment score when a target is clicked
      if (runnig == true) {
        updateScore();
      }
      return false; // Exclude this target from the array
    }
    return true; // Keep this target in the array
  });

  clearBoard();
  drawTarget();
});

startGame();

clearBoard();
createTarget();
window.addEventListener("resize", resizeCanvas);
