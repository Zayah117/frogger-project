function updateScore(score) {
	document.getElementById("score-heading").innerHTML = "Score: " + score;
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 70;
    this.height = 20;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.checkCollision = function () {
	for (enemy = 0; enemy < allEnemies.length; enemy++) {
		current_enemy = allEnemies[enemy];
		if (player.x < current_enemy.x + current_enemy.width &&
   			player.x + player.width > current_enemy.x &&
   			player.y < current_enemy.y + current_enemy.height &&
   			player.height + player.y > current_enemy.y) {
			player.reset();
			player.score = 0;
			player.updateScore();
		}
	}
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If the bug went off the screen, move him back to the
    // left. Otherwise move normally.
    if (this.x >= 505) {
    	this.x = -83;
    }
    else {
    	this.x += (this.speed * dt);
    }
    Enemy.prototype.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
	this.score = 0;
	this.x = x;
	this.y = y;
	this.x_move = 101;
	this.y_move = 83;
	this.min_y = -35;
	this.max_y = 380;
	this.min_x = -2;
	this.max_x = 402;
	this.width = 40;
	this.height = 20;
	this.sprite = 'images/char-cat-girl.png'
};

Player.prototype.reset = function() {
	this.x = 200;
	this.y = 380;
};

Player.prototype.update = function() {
	// In case I need the player to collide with something
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
	if (key == 'up') {
		if (this.y <= this.min_y) {
			this.y += 0;
		}
		else {
			this.y -= this.y_move;
		};
	};
	if (key == 'down') {
		if (this.y >= this.max_y) {
			this.y += 0;
		}
		else {
			this.y += this.y_move;
		};
		
	};
	if (key == 'left') {
		if (this.x <= this.min_x) {
			this.x += 0;
		}
		else {
			this.x -= this.x_move;
		};
	};
	if (key == 'right') {
		if (this.x >= this.max_x) {
			this.x += 0;
		}
		else {
			this.x += this.x_move;
		};
	};
	if (this.y < 48) {
		this.reset();
		this.score += 1;
		this.updateScore();
	}
};

Player.prototype.updateScore = function() {
	document.getElementById("score-heading").innerHTML = "Score: " + this.score;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
player = new Player(200, 380);
enemy1 = new Enemy(0, 53, 300);
enemy2 = new Enemy(0, 136, 500);
enemy3 = new Enemy(0, 219, 200);
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

