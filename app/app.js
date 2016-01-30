var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var player1;
var cursors;

function preload() {
  game.load.spritesheet('player', 'protected_assets/sprites/characters/male_warrior.png',60, 60,-1,4,4);
}

function create() {
  //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    player=new Player(game, 'player');

    cursors = game.input.keyboard.createCursorKeys();
    var c_key=game.input.keyboard.addKey(Phaser.Keyboard.C); //the c key
    c_key.onUp.add(player.attackKnife,player,1);
}

function update() {
  player.movePlayer(cursors);
}