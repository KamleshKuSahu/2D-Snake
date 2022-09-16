var foodm = new Audio("music/food.mp3");
var gameoverm = new Audio("music/gameover.mp3");
var movem = new Audio("music/move.mp3");
var s = new Array(10),
  ch = new Array(10);
for (var i = 0; i < 10; i++) {
  s[i] = new Array(10);
  ch[i] = new Array(10);
}
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    var ele = document.createElement("div");
    if ((i + j) % 2 == 0) ele.style.backgroundColor = "#74e274";
    else ele.style.backgroundColor = "#ffffff";
    ele.className = "box f" + getS(i) + "" + getS(j);
    s[i][j] = ele;
    document.querySelector(".board").appendChild(ele);
  }
}
function getS(no) {
  var s = "" + no;
  if (no < 10) s = "0" + s;
  return s;
}
function snakecolr(i) {
  s[i[0]][i[1]].style.backgroundColor = "blue";
}
function snakecolr1(i) {
  s[i[0]][i[1]].style.backgroundColor = "#00eaff";
}
function foodcolr(i) {
  s[i[0]][i[1]].style.backgroundColor = "red";
}
function gridcolr(i, j) {
  if ((i[0] + i[1]) % 2 == 0) s[i[0]][i[1]].style.backgroundColor = "#74e274";
  else s[i[0]][i[1]].style.backgroundColor = "#ffffff";
}

var score = 0,
  maxscore = 0;
var dir = 1;
var newgame = true,
  gamestart = false;
var snake = [[3, 4]];
snakecolr(snake[0]);
var food = [6, 5];
foodcolr(food);
document.addEventListener("keydown", function (event) {
  setdir(event.key);
});
var sx, sy, ex, ey;
var board = document.querySelector(".board");
document.addEventListener("touchstart", function (event) {
  event.preventDefault();
});
board.addEventListener("touchstart", function (event) {
  event.preventDefault();
  sx = event.touches[0].clientX;
  sy = event.touches[0].clientY;
  console.log(sx + " " + sy + " " + ex + " " + ey);
});
board.addEventListener("touchmove", function (event) {
  ex = event.touches[0].clientX;
  ey = event.touches[0].clientY;
  console.log(sx + " " + sy + " " + ex + " " + ey);
});
board.addEventListener("touchend", function (event) {
  var mov = "";
  if (Math.sqrt(sx * sx + sy * sy) < 50) return;
  if (Math.abs(ex - sx) > Math.abs(ey - sy)) {
    if (ex > sx) mov = "ArrowRight";
    else mov = "ArrowLeft";
  } else {
    if (ey > sy) mov = "ArrowDown";
    else mov = "ArrowUp";
  }
  setdir(mov);
});
function setdir(xyz) {
  if (newgame) {
    if (xyz == "ArrowUp" && dir != 2) dir = 0;
    else if (xyz == "ArrowRight" && dir != 3) dir = 1;
    else if (xyz == "ArrowDown" && dir != 0) dir = 2;
    else if (xyz == "ArrowLeft" && dir != 1) dir = 3;
    gamestart = true;
    movem.play();
  }
}

window.requestAnimationFrame(main);
var speed = 5,
  lastTime = 0;

function main(currenttime) {
  window.requestAnimationFrame(main);
  var sp = (currenttime - lastTime) / 1000;
  if (sp < 1 / speed) return;
  lastTime = currenttime;
  if (newgame && gamestart) update();
}
function update() {
  var k = new Array(2),
    check = true;
  k[0] = snake[snake.length - 1][0];
  k[1] = snake[snake.length - 1][1];
  if (dir == 0) k[0] = k[0] - 1;
  else if (dir == 1) k[1] = k[1] + 1;
  else if (dir == 2) k[0] = k[0] + 1;
  else k[1] = k[1] - 1;
  if (checkgameover(k)) {
    gameoverm.play();
    return;
  }
  snake.push(k);
  snakecolr(k);
  if (k[0] == food[0] && k[1] == food[1]) {
    snakecolr1(snake[snake.length - 2]);
    check = false;
    newfood();
  }
  if (check) {
    gridcolr(snake[0]);
    snake.shift();
  }
  colorsnake();
}
function colorsnake() {
  for (var i = 0; i < snake.length - 1; i++) {
    snakecolr1(snake[i]);
  }
}
function newfood() {
  foodm.play();
  score++;
  document.querySelector(".sc").innerHTML = "Score : " + score;
  var k = [];
  for (var i = 0; i < 10; i++)
    for (var j = 0; j < 10; j++)
      if (
        s[i][j].style.backgroundColor != "blue" &&
        s[i][j].style.backgroundColor != "rgb(0, 234, 255)"
      )
        k.push([i, j]);
  var ind = Math.floor(Math.random() * k.length);
  food = new Array(2);
  food[0] = k[ind][0];
  food[1] = k[ind][1];
  foodcolr(food);
}
function checkgameover(k) {
  if (k[0] < 0 || k[0] > 9 || k[1] < 0 || k[1] > 9) {
    newgame = false;
    return true;
  }
  if (s[k[0]][k[1]].style.backgroundColor == "rgb(0, 234, 255)") {
    newgame = false;
    return true;
  }
}
document.querySelector("button").addEventListener("click", startnewgame);
function defaultgrid() {
  for (var i = 0; i < 10; i++)
    for (var j = 0; j < 10; j++) {
      gridcolr([i, j]);
    }
}
function startnewgame() {
  defaultgrid();
  maxscore = Math.max(score, maxscore);
  score = 0;
  dir = 1;
  newgame = true;
  gamestart = false;
  snake = [[3, 4]];
  snakecolr(snake[0]);
  food = [6, 5];
  foodcolr(food);
  document.querySelector(".sc").innerHTML = "Score : " + score;
  document.querySelector(".msc").innerHTML = "MaxScore : " + maxscore;
}
document.addEventListener("keydown", function (event) {
  if (event.key == "Enter") startnewgame();
});
