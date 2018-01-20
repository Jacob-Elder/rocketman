var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, '', {
	preload : onPreload,
	create : onCreate,
	resize : onResize,
	update : onUpdate
});

function onPreload() {
	console.log("loading...")
	game.load.image('ship', 'assets/img/rocketship.png', 40, 60);
	game.load.image('laser', 'assets/img/laser.png')
}

console.log("hello");
var ship;
var cursors;
var lasers;
var laser;
var fireTime;
var spacebar;

function goFullScreen(){
	// setting a background color
	// game.stage.backgroundColor = "#a6a6a6";
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	// using RESIZE scale mode
	game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	game.scale.setGameSize(true);
}

function onCreate() {
	console.log('creating...')
	ship = game.add.sprite(0,0,'ship');
	lasers = game.add.group();
	lasers.enableBody = true;
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.enable(ship);
	lasers.physicsBodyType = Phaser.Physics.ARCADE;
	fireTime = 0;
	cursors = game.input.keyboard.createCursorKeys();
	spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	spacebar.onDown.add(function(){shoot()}, this);
	goFullScreen();
	onResize();
}

function onResize(){
	// this function is called each time the browser is resized, and re-positions
	// game elements to keep them in their right position according to game size
	ship.x = Math.round((game.width-ship.width)/2);
    ship.y = Math.round((game.height-ship.width));	
}

function onUpdate() {
	ship.body.velocity.x = 0;
	if (cursors.left.isDown) {
		ship.body.velocity.x = -150;
	}
	else if (cursors.right.isDown) {
		ship.body.velocity.x = 150;
	}
	if (spacebar.isDown) {
		shoot();
	}
}

function shoot() {
	if (game.time.now - fireTime > 500) {
		laser = lasers.create(ship.body.x + (ship.body.width/3), ship.body.y - (ship.body.height/2), 'laser');
		laser.body.velocity.y = -300;
		fireTime = game.time.now;
	}
}