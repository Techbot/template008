// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
var dir = 1;

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";



// Bullet image
var bulletReady = false;
var bulletImage = new Image();
bulletImage.onload = function () {
	heroReady = true;
};
bulletImage.src = "images/bullet.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};


var bullet = {
	speed: 256 // movement in pixels per second
};



var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
		dir=1;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
	    dir=2;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	    dir=3;	
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
		dir=4;
	}
	
	if (39 in keysDown) { // Player holding space
		shoot();
	}
	
	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// shoot addition
var shoot = function(){

    bullet.x = hero.x;
    bullet.y = hero.y;


    if (dir=1){

        bullet.y -= bullet.speed * modifier * 4;


    }
    if (dir=2){

        bullet.y -= bullet.speed * modifier * 4;

    }

    if (dir=3){

        bullet.y -= bullet.speed * modifier * 4;

    }
    if (dir=4){

    bullet.y -= bullet.speed * modifier * 4;


    }
    
    
    	// Are they touching2?
	if (
		bullet.x <= (monster.x + 32)
		&& monster.x <= (bullet.x + 32)
		&& hero.y <= (bullet.y + 32)
		&& monster.y <= (bullet.y + 32)
	) {
		++monstersShot;
		reset();
	}
    

    
}


// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	    
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	
	if (bulletReady) {
		
	    ctx.drawImage(bulletImage, bullet.x, bullet.y);
	}


	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};










// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible
