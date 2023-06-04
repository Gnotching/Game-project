

// board
var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;


// SNAKE HEAD
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

var velocityX = 0;
var velocityY = 0;

// FOOD SNAKE
var foodX; 
var foodY;

var snakeBody = [];



window.onload = function(){
	let id;
	board = document.getElementById("board");
	board.height = rows * blocksize;
	board.width = cols * blocksize;
	context = board.getContext("2d");
	placefood();
	document.addEventListener("keyup",changeDirection);
	
	// RUN GAME
	setInterval(update, 1000/10); 
	
}
function score(panjang){
	let score = document.querySelector('h2 span');
	
	score.innerHTML = panjang-1;
}

function update(){

	// TEMPLATE
	if ((snakeBody-1) <= 5) {
		context.fillStyle="black";
		context.fillRect(0,0, board.width, board.height);
		
	} 
	if ( (snakeBody-1) > 5){
		context.fillStyle="yellow";
		context.fillRect(0,0, board.width, board.height);
	}

	// GRAPHIC 

	context.fillStyle = "blue";
	snakeX += velocityX * blocksize;
	snakeY += velocityY * blocksize;
	context.fillRect(snakeX,snakeY,blocksize,blocksize);
	

	// FOOD
	if (snakeX == foodX && snakeY == foodY) {
		snakeBody.push([foodX,foodY]);
		placefood();
		score(snakeBody.length);
	}

	// SNAKE
	for(let i = snakeBody.length-1;i > 0;i--){
		snakeBody[i] = snakeBody[i-1];
	}
	if(snakeBody.length+1){
		snakeBody[0] = [snakeX,snakeY];
	}

	for(let i = 0;i < snakeBody.length;i++){
		context.fillRect(snakeBody[i][0],snakeBody[i][1],blocksize,blocksize);
	}

	context.fillStyle = "red";
	context.fillRect(foodX,foodY,blocksize,blocksize);
	
	// GAME SYSTEM
	if (snakeX < 0 || snakeX > cols*blocksize || snakeY < 0 || snakeY > rows*blocksize) {
		alert("gameOver");
	}

	// for(let i = 0;i <= snakeBody.length-1;i++){
	// 	if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
	// 		alert("gameOver");
	// 	}
	// }

	
}

function changeDirection(e){
	if (e.code == "ArrowUp" && velocityY != 1) {
		velocityX = 0;
		velocityY = -1;
	}
	else if(e.code == "ArrowDown" && velocityY != -1) {
		velocityX = 0;
		velocityY = 1;
	}
	else if(e.code == "ArrowLeft" && velocityX != 1) {
		velocityX = -1;
		velocityY = 0;
	}
	else if(e.code == "ArrowRight" && velocityX != -1) {
		velocityX = 1;
		velocityY = 0;
	}
}

function placefood(){
	
	foodX = Math.floor(Math.random() * cols) * blocksize;
	foodY = Math.floor(Math.random() * rows) * blocksize;
}