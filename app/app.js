var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.spritesheet('character1', 'protected_assets/sprites/characters/characters.png', 34, 56,-1,0,-8);
}

function create() {
  //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = game.add.sprite(32, game.world.height - 150, 'character1');
game.physics.arcade.enable(player);
player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = game.input.keyboard.createCursorKeys();


}

function update() {
  //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        //player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        //player.animations.play('right');
    }
    else if (cursors.up.isDown)
    {
        //  Move to the right
        player.body.velocity.y = -150;

        //player.animations.play('right');
    }
    else if (cursors.down.isDown)
    {
        //  Move to the right
        player.body.velocity.y = 150;

       // player.animations.play('right');
    }
    else
    {
        //  Stand still
        //player.animations.stop();

        player.frame = 4;
    }
}