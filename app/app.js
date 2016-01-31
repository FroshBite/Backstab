var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update,render:render });
var player1;
var player2;
var cursors;
var w_key,a_key, s_key, d_key;
var blocked_layer;

function preload() {
  game.load.spritesheet('player', 'assets/sprites/characters/male_warrior.png',60, 60,-1,3,4);
  game.load.tilemap('test', 'assets/maps/test.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles1', 'assets/maps/protected_assets/sprites/map/dungeon.png');
  game.load.image('tiles2', 'assets/maps/protected_assets/sprites/blocks/dungeon_blocks2.png');
  game.load.image('tiles3', 'assets/maps/protected_assets/sprites/blocks/dungeon_blocks1.png');
}

function create() {
  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // phaser-illuminated interface library
  game.plugins.add(Phaser.Plugin.PhaserIlluminated);

    //map stuff
    game.map = game.add.tilemap('test');
    game.map.addTilesetImage('tiles', 'tiles1');
    game.map.addTilesetImage('dungeon', 'tiles2');
    game.map.addTilesetImage('dungeon2', 'tiles3');
    game.backgroundlayer = game.map.createLayer('backgroundLayer');
    game.rituallayer = game.map.createLayer('ritualLayer');
    game.blockedlayer = game.map.createLayer('blockedLayer');
    game.map.setCollisionBetween(1, 2000, true, 'blockedLayer');
    game.decorationlayer = game.map.createLayer('decorationLayer');
    game.backgroundlayer.resizeWorld();

    // player stuff
    var result = findObjectsByType('playerStart', game.map, 'objectLayer');
    var spawnNum = Math.round(Math.random()*3);
    console.log("Spawn Num: " + spawnNum);

	game.physics.startSystem(Phaser.Physics.ARCADE);
	player2=new Player(game,'player', result[spawnNum].x, result[spawnNum].y);
	player1=new Player(game, 'player', result[spawnNum].x, result[spawnNum].y);

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
   game.physics.arcade.collide(player2.player,game.blockedlayer);
   game.physics.arcade.collide(player1.player,game.blockedlayer);
}

function findObjectsByType(type, map, layer) {
	var result = new Array();
	map.objects[layer].forEach(function(element){
		if(element.type === type) {
			element.y -= map.tileHeight;
			result.push(element);
		}      
	});
	return result;
}

function render(){
  // game.debug.bodyInfo(player2.player, 32, 32);

  // game.debug.body(player1.player);
  // game.debug.body(player2.player);
  // game.debug.body(game.blockedlayer);
}