var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, '', {
	preload : onPreload,
	create : onCreate,
	resize : onResize,
	update : onUpdate
});

function onPreload() {
	game.load.image('ship', 'assets/rocketship.png', 40, 60);
}

var ship;
var cursors;

function goFullScreen(){
	// setting a background color
	game.stage.backgroundColor = "#a6a6a6";
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	// using RESIZE scale mode
	game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	game.scale.setGameSize(true);
}

function onCreate() {
	ship = game.add.sprite(0,0,'ship');
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.enable(ship);
	cursors = game.input.keyboard.createCursorKeys();
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
}