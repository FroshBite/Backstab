var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update,render:render });
var player1;
var player2;
var enemies;
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

  enemies = game.add.group();

	player2=new Player(game,'player', result[spawnNum].x, result[spawnNum].y,enemies);
	player1=new Player(game, 'player', result[spawnNum].x, result[spawnNum].y);
	
	cursors = game.input.keyboard.createCursorKeys();
	var c_key=game.input.keyboard.addKey(Phaser.Keyboard.C); //the c key
	c_key.onDown.add(player1.attackKnife,player1,1);

	w_key=game.input.keyboard.addKey(Phaser.Keyboard.W);
	a_key=game.input.keyboard.addKey(Phaser.Keyboard.A);
	s_key=game.input.keyboard.addKey(Phaser.Keyboard.S);
	d_key=game.input.keyboard.addKey(Phaser.Keyboard.D);

	// lighting stuff
	
	zoneLamp = game.add.illuminated.lamp(game.world.centerX, game.world.centerY + 20, {
		distance: 100,
		color: 'rgba(255, 0, 0, 1)',
		samples: 0
	});
	spawnLamp1 = game.add.illuminated.lamp(result[0].x, result[0].y, {
		distance: 80,
		color: 'rgba(255, 255, 255, 0.8)',
		samples: 0
	});
	spawnLamp2 = game.add.illuminated.lamp(result[1].x, result[1].y, {
		distance: 80,
		color: 'rgba(255, 255, 255, 0.8)',
		samples: 0
	});
	spawnLamp3 = game.add.illuminated.lamp(result[2].x, result[2].y, {
		distance: 80,
		color: 'rgba(255, 255, 255, 0.8)',
		samples: 0
	});
	spawnLamp4 = game.add.illuminated.lamp(result[3].x, result[3].y, {
		distance: 80,
		color: 'rgba(255, 255, 255, 0.8)',
		samples: 0
	});
	
	dMask = game.add.illuminated.darkMask('rgba(0,0,0,0.92');
}

function update() {
  player1.movePlayer(cursors.left,cursors.up,cursors.down,cursors.right);
  player2.movePlayer(a_key,w_key,s_key,d_key);

   
   game.physics.arcade.overlap(enemies, player1.player,player1.collideCallback,null,player1);
   game.physics.arcade.collide(enemies, player1.player,player1.collideCallback,null,player1);

   game.physics.arcade.collide(enemies,game.blockedlayer);
   game.physics.arcade.collide(player1.player,game.blockedlayer);

   // lighting stuff
   dMask.refresh();
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