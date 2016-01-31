var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player1;
var player2;
var cursors;
var w_key,a_key, s_key, d_key;

function preload() {
  game.load.spritesheet('player', 'assets/sprites/characters/male_warrior.png',60, 60,-1,3,4);
}

function create() {
  //  We're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  
  player1=new Player(game, 'player');
  player2=new Player(game,'player');

  cursors = game.input.keyboard.createCursorKeys();
  var c_key=game.input.keyboard.addKey(Phaser.Keyboard.C); //the c key
  c_key.onDown.add(player1.attackKnife,player1,1);

  w_key=game.input.keyboard.addKey(Phaser.Keyboard.W);
  a_key=game.input.keyboard.addKey(Phaser.Keyboard.A);
  s_key=game.input.keyboard.addKey(Phaser.Keyboard.S);
  d_key=game.input.keyboard.addKey(Phaser.Keyboard.D);
}

function update() {
  player1.movePlayer(cursors.left,cursors.up,cursors.down,cursors.right);
  player2.movePlayer(a_key,w_key,s_key,d_key);
}