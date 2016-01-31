var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player1;
var player2;
var cursors;
var w_key,a_key, s_key, d_key;

function preload() {
  game.load.spritesheet('player', 'assets/sprites/characters/male_warrior.png',60, 60,-1,3,4);
  game.load.tilemap('test', 'assets/maps/test.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles1', 'assets/maps/protected_assets/sprites/map/dungeon.png');
  game.load.image('tiles2', 'assets/maps/protected_assets/sprites/blocks/dungeon_blocks2.png');
}

function create() {
  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // phaser-illuminated interface library
  game.plugins.add(Phaser.Plugin.PhaserIlluminated);

  //map stuff
  game.map = game.add.tilemap('test');
  console.log("attempting first sheet");
  game.map.addTilesetImage('tiles', 'tiles1');
  console.log("attempting second sheet");
  game.map.addTilesetImage('dungeon', 'tiles2');
  game.backgroundlayer = game.map.createLayer('backgroundLayer');
  game.blockedlayer = game.map.createLayer('blockedLayer');
  game.map.setCollisionBetween(1, 2000, true, 'blockedLayer');
  game.backgroundlayer.resizeWorld();

  game.physics.startSystem(Phaser.Physics.ARCADE);
  player1=new Player(game, 'player');
  player2=new Player(game,'player');


	// phaser-illuminated interface library
	game.plugins.add(Phaser.Plugin.PhaserIlluminated);

	cursors = game.input.keyboard.createCursorKeys();
	var c_key=game.input.keyboard.addKey(Phaser.Keyboard.C); //the c key
	c_key.onDown.add(player1.attackKnife,player1,1);
	
	w_key=game.input.keyboard.addKey(Phaser.Keyboard.W);
	a_key=game.input.keyboard.addKey(Phaser.Keyboard.A);
	s_key=game.input.keyboard.addKey(Phaser.Keyboard.S);
	d_key=game.input.keyboard.addKey(Phaser.Keyboard.D);
}
function collideCallback(){
  console.log('collsiion');
}
function update() {
  player1.movePlayer(cursors.left,cursors.up,cursors.down,cursors.right);
  player2.movePlayer(a_key,w_key,s_key,d_key);
  
  game.physics.arcade.collide(player2.player, player1.player,collideCallback,null,this);
}