// Array of all possible enemy sprites
spriteArray = [ 'images/red-car.png',
				'images/black-car.png',
				'images/blue-car.png',
				'images/blue-truck.png',
				'images/food-truck.png',
				'images/ghost-car.png',
				'images/gray-car.png',
				'images/green-car.png',
				'images/green-truck.png',
				'images/purple-car.png',
				'images/red-truck.png',
				'images/yellow-car.png',
				'images/yellow-truck.png',
				'images/police-car.png',
				'images/fight-truck.png'];

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.width = 90;
	this.height = 20;
	this.sprite = Enemy.prototype.changeColor();
};

// Checks if enemy collides with player
// If so, reset player positon and score
Enemy.prototype.checkCollision = function () {
	for (enemy = 0; enemy < allEnemies.length; enemy++) {
		currentEnemy = allEnemies[enemy];

		if (player.x < currentEnemy.x + currentEnemy.width && 
			player.x + player.width > currentEnemy.x && 
			player.y < currentEnemy.y + currentEnemy.height &&
			player.height + player.y > currentEnemy.y) {

			player.reset();
			player.score = 0;
			player.updateScore();
		}
	}
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// If the bug went off the screen, move him back to the
	// left. Otherwise move normally.
	if (this.x >= 505) {
		// Move car to random position to left of screen
		this.x = Math.floor(Math.random() * 200) - 300;
		// Randomly change car speed and color
		this.speed = this.changeSpeed();
		this.sprite = this.changeColor();
	}
	else {
		this.x += (this.speed * dt);
	}

	// Check player collision
	Enemy.prototype.checkCollision();
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Changes car speed to random number
Enemy.prototype.changeSpeed = function() {
	return Math.floor(Math.random() * 300) + 200;
};

// Changes car sprite to random sprite
Enemy.prototype.changeColor = function() {
	return spriteArray[Math.floor(Math.random()*spriteArray.length)];
};

// The class for the player character
var Player = function(x, y) {
	this.score = 0;
	this.highScore = 0;
	this.x = x;
	this.y = y;
	this.xMove = 101;
	this.yMove = 83;
	this.minY = -35;
	this.maxY = 380;
	this.minX = -2;
	this.maxX = 402;
	this.width = 40;
	this.height = 20;
	this.sprite = 'images/char-frog.png'
};

// Resets player position to the starting point
Player.prototype.reset = function() {
	this.x = 200;
	this.y = 390;
};

// Keeping this incase needed
Player.prototype.update = function() {
	// TODO
};

// Draw player to screen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Checks if movement is valid and
// moves player character
Player.prototype.handleInput = function(key) {
	if (key == 'up') {
		if (this.validMove(key)) {
			this.y -= this.yMove;
		}
	}
	if (key == 'down') {
		if (this.validMove(key)) {
			this.y += this.yMove;
		}
		
	}
	if (key == 'left') {
		if (this.validMove(key)) {
			this.x -= this.xMove;
		}
	}
	if (key == 'right') {
		if (this.validMove(key)) {
			this.x += this.xMove;
		}
	}

	// Checks if player reaches finish line
	// and updates score
	if (this.y < 48) {
		this.reset();
		this.score += 1;
		if (this.score > this.highScore) {
			this.highScore = this.score;
		}
		this.updateScore();
	}
};

// Checks to make sure player does not move off screen
Player.prototype.validMove = function(key) {
	if (key == 'up') {
		if (this.y <= this.minY) {
			return false;
		}
		else {
			return true;
		}
	}
	if (key == 'down') {
		if (this.y >= this.maxY) {
			return false;
		}
		else {
			return true;
		}
		
	}
	if (key == 'left') {
		if (this.x <= this.minX) {
			return false;
		}
		else {
			return true;
		}
	}
	if (key == 'right') {
		if (this.x >= this.maxX) {
			return false;
		}
		else {
			return true;
		}
	}
};

// Updates the score heading
Player.prototype.updateScore = function() {
	document.getElementById("score-heading").innerHTML = "Score: " + this.score;
	document.getElementById("high-score-heading").innerHTML = "Highscore: " + this.highScore;
};


// Instantiating objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
player = new Player(200, 390);
enemy1 = new Enemy(-90, 53, Enemy.prototype.changeSpeed());
enemy2 = new Enemy(-90, 136, Enemy.prototype.changeSpeed());
enemy3 = new Enemy(-90, 219, Enemy.prototype.changeSpeed());
allEnemies = [enemy1, enemy2, enemy3];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

