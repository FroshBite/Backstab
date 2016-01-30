var Player=function(game,sprite_name){
  this.player=game.add.sprite(32, game.world.height - 150, sprite_name); //the reference to the game player object
  
  //enable physics for the player
  game.physics.arcade.enable(this.player);
  this.player.body.collideWorldBounds = true;

  //player animations
  this.player.animations.add('up', [105,106,107,108,109,110,111,112], 10, true);
  this.player.animations.add('left', [118,119,120,121,122,123,124,125], 10, true);
  this.player.animations.add('down', [131,132,133,134,135,136,137,138], 10, true);
  this.player.animations.add('right', [144,145,146,147,148,149,150,151], 10, true);
  this.player.animations.add('knifeUpAttack', [157,158,159,160,161,162], 10, true);
  this.player.animations.add('knifeLeftAttack', [170,171,172,173,174,175], 10, true);
  this.player.animations.add('knifeDownAttack', [183,184,185,186,187,188], 10, true);
  this.player.animations.add('knifeRightAttack', [196,197,198,199,200,201], 10, true);

  this.player.body.velocity.x = 0;
  this.player.body.velocity.y = 0;

  //player states
  this.attack_animation_playing=false; //so that we dont play the attack/knife animations at the same time
  this.current_orientation='down';

  this.attackKnife=function(){
    console.log('attacked');
    console.log(this.current_orientation);
    //this.attack_animation_playing=true;
    if(this.current_orientation==='down'){
      this.player.animations.stop();
      this.player.animations.play('knifeDownAttack',6,true);
      // this.player.animation.onAnimationComplete(function(){
      //   console.log('animation complete');
      // });
    }
    else if(this.current_orientation==='up'){
      this.player.animations.stop();
      this.player.animations.play('knifeUpAttack',6,true);
      // this.player.animation.onAnimationComplete(function(){
      //   console.log('animation complete');
      // });
    }
    else if (this.current_orientation==='right'){
      this.player.animations.stop();
      this.player.animations.play('knifeRightAttack',6,true);
      // this.player.animation.onAnimationComplete(function(){
      //   console.log('animation complete');
      // });
    }
    else if (this.current_orientation==='left'){
      this.player.animations.stop();
      this.player.animations.play('knifeLeftAttack',6,true);
      // this.player.animation.onAnimationComplete(function(){
      //   console.log('animation complete');
      // });
    }

  };
  
  this.movePlayer=function(cursor){
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        this.player.body.velocity.x = -150;
        if(!this.attack_animation_playing){
          this.player.animations.play('left');
        }
        
        this.current_orientation='left';
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        this.player.body.velocity.x = 150;

        if(!this.attack_animation_playing){
          this.player.animations.play('right');
        }
        
        this.current_orientation='right';
    }
    else if (cursors.up.isDown)
    {
        //  Move to the right
        this.player.body.velocity.y = -150;

        if(!this.attack_animation_playing){
          this.player.animations.play('up');
        }
        this.current_orientation='up';
    }
    else if (cursors.down.isDown)
    {
        //  Move to the right
        this.player.body.velocity.y = 150;

        if(!this.attack_animation_playing){
          this.player.animations.play('down');
        }
      this.current_orientation='down';
    }

    else
    {
        //  Stand still
        this.player.animations.stop();

        //player.frame = 4;
    }
  }
};