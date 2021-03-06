// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = 0;
    this.speed = 0;
    this.speed_arr = [160,200,240,280,320,380];
    this.row_arr = [61,144,227];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks;
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.x = -170;
        this.randomise();
    }
    this.x += (this.speed * dt);
    this.y;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomise = function() {
    var random_speed = Math.floor(Math.random() * 6);
    var random_y = Math.floor(Math.random() * 3);
    this.speed = this.speed_arr[random_speed];
    this.y = this.row_arr[random_y];
};

Enemy.prototype.reset = function() {
        this.x = 0;
        this.randomise();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 393;
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(ev) {
    switch(ev) {
        case 'left':
            if(this.x !== 0) { this.x -= 101; }
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'right':
            if(this.x !== 404) { this.x += 101; }
            break;
        case 'down':
            if(this.y !== 393) { this.y += 83; }
    }
};

Player.prototype.reset = function() {
    player.x = 202;
    player.y = 393;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
var level = 2;
function createEnemies() {
    allEnemies = [];
    for (i=1; i<=level; i++) {
        allEnemies.push(new Enemy());
    }
    allEnemies.forEach(function(enemy) {
        enemy.randomise();
    });
}

createEnemies();




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
