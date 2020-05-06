
var context;
var shape = new Object();
var monsters;
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var monsterInterval;
var gameTime;
var up_key;
var down_key;
var right_key;
var left_key;
var num_of_balls;
var ball_Color_5;
var ball_color15;
var ball_color25;
var num_of_monsters;
var lastKeyPressed;
var redMonster;
var hasPackman;
var coin;
var lastCoinMove;
var moved;
var watch;
var watchImage;
var watchTaken;
var packmanLives;


function Start() {
	context = canvas.getContext("2d");
	up_key = localStorage.getItem("up_key");
	down_key = localStorage.getItem("down_key");
	right_key = localStorage.getItem("right_key");
	left_key = localStorage.getItem("left_key");
	num_of_balls = sessionStorage.getItem("balls_num");
	ball_Color_5 = sessionStorage.getItem("pts5_color");
	ball_color15 = sessionStorage.getItem("pts15_color");
	ball_color25 = sessionStorage.getItem("pts25_color");
	gameTime = sessionStorage.getItem("game_time");
	num_of_monsters = sessionStorage.getItem("monster_num");
	monsters = new Array();
	watch = new Array();
	hasPackman = false;
	board = new Array();
	coin = new Object();
	watchImage = new Image();

	watchImage.src = "Resources\\watch.png"
	runningCoin = new Image();
	runningCoin.src = "Resources\\coin.png"
	redMonster = new Image();
	redMonster.src = "Resources\\redMonster.png"
	score = 0;
	moved = false;
	packmanLives = 5;
	lastCoinMove = 0;
	watchTaken = false;
	pac_color = "yellow";
	var cnt = 260;
	var food_remain = num_of_balls;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 20; i++) {
		board[i] = new Array();
		for (var j = 0; j < 12; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 16 && j == 1) ||
				(i == 16 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt && !isCorner(i, j)) {
					var randomFood = Math.random();
					food_remain--;
					if (randomFood < 0.6) {
						board[i][j] = 1;
					}
					else if (randomFood >= 0.9) {
						board[i][j] = 6;
					}
					else {
						board[i][j] = 5;
					}

				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	if (!hasPackman) {
		var emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		board[emptyCell[0]][emptyCell[1]] = 2;
		hasPackman = true;
		pacman_remain--;
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}

	while (num_of_monsters > 0) {
		var rndMonster = Math.floor(Math.random() * 4);
		if (rndMonster == 0 && board[0][0] == 0) {
			board[0][0] = 7;
			monsters[num_of_monsters] = new Object();
			monsters[num_of_monsters].i = 0;
			monsters[num_of_monsters].j = 0;
			monsters[num_of_monsters].last = 0;
			num_of_monsters--;
		}
		else if (rndMonster == 1 && board[0][11] == 0) {
			board[0][11] = 7;
			monsters[num_of_monsters] = new Object();
			monsters[num_of_monsters].i = 0;
			monsters[num_of_monsters].j = 11;
			monsters[num_of_monsters].last = 0;
			num_of_monsters--;
		}
		else if (rndMonster == 2 && board[19][0] == 0) {
			board[19][0] = 7;
			monsters[num_of_monsters] = new Object();
			monsters[num_of_monsters].i = 19;
			monsters[num_of_monsters].j = 0;
			monsters[num_of_monsters].last = 0;
			num_of_monsters--;
		}
		else if (rndMonster == 3 && board[19][11] == 0) {
			board[19][11] = 7;
			monsters[num_of_monsters] = new Object();
			monsters[num_of_monsters].i = 19;
			monsters[num_of_monsters].j = 11;
			monsters[num_of_monsters].last = 0;
			num_of_monsters--;
		}

	}

	var coinPlacing = Math.floor(Math.random() * 4);
	if (coinPlacing == 0) {
		board[0][0] = 9;
		coin.i = 0;
		coin.j = 0;
		coin.last = 0;
	}
	else if (coinPlacing == 1) {
		board[0][11] = 9;
		coin.i = 0;
		coin.j = 11;
		coin.last = 0;
	}
	else if (coinPlacing == 2) {
		board[19][0] = 9;
		coin.i = 19;
		coin.j = 0;
		coin.last = 0;
	}
	else if (coinPlacing == 3) {
		board[19][11] = 9;
		coin.i = 19;
		coin.j = 11;
		coin.last = 0;
	}

	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.code] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.code] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 100);
	monsterInterval = setInterval(UpdateMonsterPosition, 300);
	coinInterval = setInterval(UpdateCoinPosition, 100);
	watchInterval = setInterval(UpdateWatchPosition, 10000);
}



//Drawing

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.innerText = score;
	lblLives.innerText = packmanLives;
	lblTime.innerText = Math.floor(time_elapsed);
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 12; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				if (lastKeyPressed == 3) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if (lastKeyPressed == 2) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if (lastKeyPressed == 1) {
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x - 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else {
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = ball_Color_5; //color
				context.fill();
			} else if (board[i][j] == 4) {

				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();

			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = ball_color15; //color
				context.fill();
			}
			else if (board[i][j] == 6) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = ball_color25; //color
				context.fill();
			}
			else if (board[i][j] == 7) {
				context.drawImage(redMonster, center.x - 30, center.y - 30);
			}
			else if (board[i][j] == 9) {
				context.drawImage(runningCoin, center.x - 30, center.y - 30);
			}
			else if (board[i][j] == 10) {
				context.drawImage(watchImage, center.x - 30, center.y - 30);
			}
		}
	}
}

//Update Positons

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x != undefined) {
		lastKeyPressed = x;
	}
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 11 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 19 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}

	if (board[shape.i][shape.j] == 1) {
		score = score + 5;
	}
	else if (board[shape.i][shape.j] == 5) {
		score = score + 15;
	}
	else if (board[shape.i][shape.j] == 6) {
		score = score + 25;
	}
	else if (board[shape.i][shape.j] == 9) {
		window.clearInterval(coinInterval);
		showBonus();
		score = score + 50;
	}
	else if (board[shape.i][shape.j] == 10) {
		window.clearInterval(watchInterval);
		showTimeBonus();
		time_elapsed = time_elapsed + 50;
		watchTaken = true;
	}


	if (board[shape.i][shape.j] == 7 && packmanLives > 0) {
		board[shape.i][shape.j] = 0;
		resetPackman();
		showMinusLive();
	}
	else if (packmanLives == 0) {
		window.clearInterval(interval);
		window.clearInterval(monsterInterval);
		window.clearInterval(watchInterval);
		window.clearInterval(coinInterval);
		showLost();
	}
	else {
		board[shape.i][shape.j] = 2;
	}



	var currentTime = new Date();
	time_elapsed = gameTime - ((currentTime - start_time) / 1000);
	if (score < 100 && time_elapsed <= 10) {
		pac_color = "green";
	}

	if (time_elapsed <= 0) {
		window.clearInterval(interval);
		window.clearInterval(monsterInterval);
		window.clearInterval(watchInterval);
		window.clearInterval(coinInterval);
		if (score < 100) {
			showLoseByTime();
		}
		else {
			showWon();
		}
	} else {
		Draw();
	}
}

function UpdateMonsterPosition() {
	var rnd;
	monsters.forEach(monster => {
		if (monster.last == 7 || monster.last == 9 || monster.last == 2) {
			board[monster.i][monster.j] = 0
		}
		else{
			board[monster.i][monster.j] = monster.last;
		}
		if (shape.i >= monster.i && board[monster.i + 1][monster.j] != 4 && board[monster.i + 1][monster.j] != 7) {
			if (shape.j > monster.j && board[monster.i][monster.j + 1] != 4 && board[monster.i][monster.j + 1] != 7) {
				rnd = Math.random();
				if (rnd > 0.9) {
					monster.i++;
				}
				else {
					monster.j++;
				}
			}
			else {
				rnd = Math.random();
				if (rnd < 0.1 && monster.i > 0) {
					monster.i--;
				}
				else {
					monster.i++;
				}
			}
		}
		else if (shape.i < monster.i && board[monster.i - 1][monster.j] != 4 && board[monster.i - 1][monster.j] != 7) {
			if (shape.j < monster.j && board[monster.i][monster.j - 1] != 4 && board[monster.i][monster.j - 1] != 7) {
				rnd = Math.random();
				if (rnd > 0.9) {
					monster.i--;
				}
				else {
					monster.j--;
				}
			}
			else {
				monster.i--;
			}
		}
		else if (shape.j < monster.j && board[monster.i][monster.j - 1] != 4 && board[monster.i][monster.j - 1] != 7) {
			if (shape.i < monster.i && board[monster.i - 1][monster.j] != 4 && board[monster.i - 1][monster.j] != 7) {
				rnd = Math.random();
				if (rnd > 0.9) {
					monster.j--;
				}
				else {
					monster.i--;
				}
			}
			else {
				monster.j--;
			}
		}
		else if (shape.j >= monster.j && board[monster.i][monster.j + 1] != 4 && board[monster.i][monster.j + 1] != 7) {
			if (shape.i > monster.i && board[monster.i + 1][monster.j] != 4 && board[monster.i + 1][monster.j] != 7) {
				rnd = Math.random();
				if (rnd > 0.9) {
					monster.j++;
				}
				else {
					monster.i++;
				}
			}
			else {
				rnd = Math.random();
				if (rnd < 0.1 && monster.j > 0) {
					monster.j--;
				}
				else {
					monster.j++;
				}
			}
		}

		monster.last = board[monster.i][monster.j];
		board[monster.i][monster.j] = 7;

		

	});
	if (board[shape.i][shape.j] == 7) {
		board[shape.i][shape.j] = 0;
		resetPackman();
		showMinusLive();
	}
	Draw();
}


function UpdateCoinPosition() {
	moved = false;

	var repeatMove = Math.random();
	if (repeatMove > 0.7 || lastCoinMove == 0) {
		lastCoinMove = Math.floor(Math.random() * 4) + 1;
	}

	if (lastCoinMove == 2 && coinCanMove(coin.i + 1, coin.j) && coin.i < 19) {
		if (coin.last == 7 || coin.last == 2 || coin.last == 9) {
			board[coin.i][coin.j] = 0
		}
		else {
			board[coin.i][coin.j] = coin.last;
		}
		coin.i++;
		lastCoinMove = 2;
		moved = true;
	}
	else if (lastCoinMove == 1 && coinCanMove(coin.i - 1, coin.j) && coin.i > 0) {
		if (coin.last == 7 || coin.last == 2 || coin.last == 9) {
			board[coin.i][coin.j] = 0
		}
		else {
			board[coin.i][coin.j] = coin.last;
		}
		coin.i--;
		lastCoinMove = 1;
		moved = true;
	}
	else if (lastCoinMove == 3 && coinCanMove(coin.i, coin.j - 1) && coin.j > 0) {
		if (coin.last == 7 || coin.last == 2 || coin.last == 9) {
			board[coin.i][coin.j] = 0
		}
		else {
			board[coin.i][coin.j] = coin.last;
		}
		coin.j--;
		lastCoinMove = 3;
		moved = true;
	}
	else if (lastCoinMove == 4 && coinCanMove(coin.i, coin.j + 1) && coin.j < 11) {
		if (coin.last == 7 || coin.last == 2 || coin.last == 9) {
			board[coin.i][coin.j] = 0
		}
		else {
			board[coin.i][coin.j] = coin.last;
		}
		coin.j++;
		lastCoinMove = 4;
		moved = true;
	}
	if (board[coin.i][coin.j] == 2) {
		window.clearInterval(coinInterval);
		showBonus();
		score = score + 50;
	}
	if (moved) {
		coin.last = board[coin.i][coin.j];
		board[coin.i][coin.j] = 9;
	}
	Draw();
}

function UpdateWatchPosition() {
	if (!watchTaken) {
		var emptyCell = findRandomEmptyCell(board);
		var i = emptyCell[0];
		var j = emptyCell[1];
		board[i][j] = 10;
		setTimeout(() => { board[i][j] = 0; }, 5000);
	}
}



//Other Helping Functions

function resetPackman() {
	var emptyCell = findRandomEmptyCell(board);
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];
	board[emptyCell[0]][emptyCell[1]] = 2;
	packmanLives--;
	died = false;
}


function coinCanMove(i, j) {
	if (board[i][j] != 4 && board[i][j] != 7 && board[i][j] != 2) {
		return true;
	}
	return false;
}

function isCorner(i, j) {
	if ((i == 0 || i == 19) && (j == 0 || j == 11)) {
		return true;
	}
	else {
		return false;
	}
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 19 + 1);
	var j = Math.floor(Math.random() * 11 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 19 + 1);
		j = Math.floor(Math.random() * 11 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[up_key]) {
		return 1;
	}
	if (keysDown[down_key]) {
		return 2;
	}
	if (keysDown[left_key]) {
		return 3;
	}
	if (keysDown[right_key]) {
		return 4;
	}

}

//Animation

function showTimeBonus() {
	var ml4 = {};
	ml4.opacityIn = [0, 1];
	ml4.scaleIn = [0.2, 1];
	ml4.scaleOut = 3;
	ml4.durationIn = 800;
	ml4.durationOut = 600;
	ml4.delay = 500;

	anime.timeline({ loop: false })
		.add({
			targets: '.ml4 .letters-4',
			opacity: ml4.opacityIn,
			scale: ml4.scaleIn,
			duration: ml4.durationIn
		}).add({
			targets: '.ml4 .letters-4',
			opacity: 0,
			scale: ml4.scaleOut,
			duration: ml4.durationOut,
			easing: "easeInExpo",
			delay: ml4.delay
		
		});
}

function showWon() {
	var ml4 = {};
	ml4.opacityIn = [0, 1];
	ml4.scaleIn = [0.2, 1];
	ml4.scaleOut = 3;
	ml4.durationIn = 800;
	ml4.durationOut = 600;
	ml4.delay = 500;

	anime.timeline({ loop: 3 })
		.add({
			targets: '.ml4 .letters-2',
			opacity: ml4.opacityIn,
			scale: ml4.scaleIn,
			duration: ml4.durationIn
		}).add({
			targets: '.ml4 .letters-2',
			opacity: 0,
			scale: ml4.scaleOut,
			duration: ml4.durationOut,
			easing: "easeInExpo",
			delay: ml4.delay
		
		});
}

function showLost() {
	var ml4 = {};
	ml4.opacityIn = [0, 1];
	ml4.scaleIn = [0.2, 1];
	ml4.scaleOut = 3;
	ml4.durationIn = 800;
	ml4.durationOut = 600;
	ml4.delay = 500;

	anime.timeline({ loop: 3 })
		.add({
			targets: '.ml4 .letters-3',
			opacity: ml4.opacityIn,
			scale: ml4.scaleIn,
			duration: ml4.durationIn
		}).add({
			targets: '.ml4 .letters-3',
			opacity: 0,
			scale: ml4.scaleOut,
			duration: ml4.durationOut,
			easing: "easeInExpo",
			delay: ml4.delay
		
		});
}


function showBonus() {
	var ml4 = {};
	ml4.opacityIn = [0, 1];
	ml4.scaleIn = [0.2, 1];
	ml4.scaleOut = 3;
	ml4.durationIn = 800;
	ml4.durationOut = 600;
	ml4.delay = 500;

	anime.timeline({ loop: false })
		.add({
			targets: '.ml4 .letters-1',
			opacity: ml4.opacityIn,
			scale: ml4.scaleIn,
			duration: ml4.durationIn
		}).add({
			targets: '.ml4 .letters-1',
			opacity: 0,
			scale: ml4.scaleOut,
			duration: ml4.durationOut,
			easing: "easeInExpo",
			delay: ml4.delay
		
		});
}

function showLoseByTime() {
	document.getElementById("pop5").innerText = "You are better than " + score + " points!";
	var ml4 = {};
	ml4.opacityIn = [0, 1];
	ml4.scaleIn = [0.2, 1];
	ml4.scaleOut = 3;
	ml4.durationIn = 800;
	ml4.durationOut = 600;
	ml4.delay = 500;

	anime.timeline({ loop: 3 })
		.add({
			targets: '.ml4 .letters-5',
			opacity: ml4.opacityIn,
			scale: ml4.scaleIn,
			duration: ml4.durationIn
		}).add({
			targets: '.ml4 .letters-5',
			opacity: 0,
			scale: ml4.scaleOut,
			duration: ml4.durationOut,
			easing: "easeInExpo",
			delay: ml4.delay
		
		});
}

function showMinusLive() {
	document.getElementById("pop6").innerText = "Ouchhh!! Only " + packmanLives + " Lives Remains";
	var ml4 = {};
	ml4.opacityIn = [0, 1];
	ml4.scaleIn = [0.2, 1];
	ml4.scaleOut = 3;
	ml4.durationIn = 800;
	ml4.durationOut = 600;
	ml4.delay = 500;

	anime.timeline({ loop: 1 })
		.add({
			targets: '.ml4 .letters-6',
			opacity: ml4.opacityIn,
			scale: ml4.scaleIn,
			duration: ml4.durationIn
		}).add({
			targets: '.ml4 .letters-6',
			opacity: 0,
			scale: ml4.scaleOut,
			duration: ml4.durationOut,
			easing: "easeInExpo",
			delay: ml4.delay
		
		});
}
