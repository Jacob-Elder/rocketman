var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, '', {
	preload : onPreload,
	create : onCreate,
	resize : onResize,
	update : onUpdate
});

/**************************** Load All Assets **********************************/

function onPreload() {
	game.load.image('ship', 'assets/img/rocketship.png', 40, 60);
	game.load.image('laser', 'assets/img/laser.png');
	game.load.image('spacefield', 'assets/img/space.jpeg');
}

/**************************** Declare Variables ********************************/
// the players ship
var ship;
// arrow keys
var cursors;
// lasers group
var lasers;
// individual laser
var laser;
// last time you shot a laser
var fireTime = 0;
// the spacebar key
var spacebar;
// space background
var spacefield;

/******************** Set Screen Size and Resize Accordingly *****************/

function goFullScreen(){
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	// using RESIZE scale mode
	game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	game.scale.setGameSize(true);
}

function onResize(){
	// this function is called each time the browser is resized, and re-positions
	// game elements to keep them in their right position according to game size
	ship.x = Math.round((game.width-ship.width)/2);
    ship.y = Math.round((game.height-ship.width));	
}

/*********************** Create and Position Game Objects *************************/

function onCreate() {
	spacefield = game.add.tileSprite(0, 0, 800, 800, 'spacefield');
	// Select the Arcade style physics engine
	game.physics.startSystem(Phaser.Physics.ARCADE);
	// Create Ship and assign physics
	ship = game.add.sprite(0,0,'ship');
	game.physics.arcade.enable(ship);
	//create laser group and assign physics
	lasers = game.add.group();
	lasers.enableBody = true;
	lasers.physicsBodyType = Phaser.Physics.ARCADE;
	// create input controls and assign event handlers
	cursors = game.input.keyboard.createCursorKeys();
	spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	spacebar.onDown.add(function(){shoot()}, this);
	// Call funtions for scale and resizing
	goFullScreen();
	onResize();
}

/************************************ Game Loop *************************************/

function onUpdate() {
	// make the background scroll
	spacefield.tilePosition.y += 2;
	//stop the ships movement when the key is no longer pressed
	ship.body.velocity.x = 0;
	//left and right controls for the ship
	if (cursors.left.isDown) {
		ship.body.velocity.x = -150;
	}
	else if (cursors.right.isDown) {
		ship.body.velocity.x = 150;
	}
	// call the shoot function when the spacebar is pressed
	if (spacebar.isDown) {
		shoot();
	}
}

/******************************* Callback Functions *******************************/

function shoot() {
	// shoot a laser if it has been more than 500 ms since your last shot
	if (game.time.now - fireTime > 500) {
		laser = lasers.create(ship.body.x + (ship.body.width/3), ship.body.y - (ship.body.height/2), 'laser');
		laser.body.velocity.y = -300;
		fireTime = game.time.now;
	}
}