var Player=function(game,sprite_name){
  var player=game.add.sprite(game.world.centerX, game.world.centerY, sprite_name); //the reference to the game player object
  
  //enable physics for the player
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  //camera follows the player
  game.camera.follow(player);

  this.timeouts={
    knife:{
      last_time_used: Date.now(),
      duration: 750 //duration of the timeout in milliseconds
    }
  };

  //player move animations
  player.animations.add('up', [104,105,106,107,108,109,110,111,112], 10, true);
  player.animations.add('left', [117,118,119,120,121,122,123,124,125], 10, true);
  player.animations.add('down', [130,131,132,133,134,135,136,137,138], 10, true);
  player.animations.add('right', [143,144,145,146,147,148,149,150,151], 10, true);
  
  //player knife animations
  var knife_up_anim=player.animations.add('knifeUpAttack', [156,157,158,159,160,161], 10, true);
  var knife_left_anim=player.animations.add('knifeLeftAttack', [169,170,171,172,173,174], 10, true);
  var knife_down_anim=player.animations.add('knifeDownAttack', [182,183,184,185,186,187], 10, true);
  var knife_right_anim=player.animations.add('knifeRightAttack', [195,196,197,198,199,200], 10, true);

  function disableAttackAnimation(){
    this.attack_animation_playing=false;
  }
  
  //allow movement animations to occur after attack animations complete
  knife_up_anim.onComplete.add(disableAttackAnimation,this);
  knife_left_anim.onComplete.add(disableAttackAnimation,this);
  knife_down_anim.onComplete.add(disableAttackAnimation,this);
  knife_right_anim.onComplete.add(disableAttackAnimation,this);

  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  //player states
  this.attack_animation_playing=false; //so that we dont play the attack/knife animations at the same time
  this.current_orientation='down';

  this.attackKnife=function(){
    if(!this.attack_animation_playing && Date.now()-this.timeouts.knife.last_time_used>this.timeouts.knife.duration){
      this.timeouts.knife.last_time_used=Date.now();//reset the timeout
      this.attack_animation_playing=true;
      player.animations.stop(null, true);

      if(this.current_orientation==='down'){
        player.animations.play('knifeDownAttack',25,false);
      }
      else if(this.current_orientation==='up'){
        player.animations.play('knifeUpAttack',25,false);
      }
      else if (this.current_orientation==='right'){
        player.animations.play('knifeRightAttack',25,false);
      }
      else if (this.current_orientation==='left'){
        player.animations.play('knifeLeftAttack',25,false);
      }
    }
  };
  
  //note: player will not move if he is performing an attack
  this.movePlayer=function(leftKey,upKey,downKey,rightKey){
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (leftKey.isDown && !this.attack_animation_playing){
      player.body.velocity.x = -150;
      player.animations.play('left');
      this.current_orientation='left'
    }
    else if (rightKey.isDown && !this.attack_animation_playing){
      player.body.velocity.x = 150;
      player.animations.play('right');
      this.current_orientation='right';
    }
    else if (upKey.isDown && !this.attack_animation_playing){
      player.body.velocity.y = -150;
      player.animations.play('up');
      this.current_orientation='up';
    }
    else if (downKey.isDown && !this.attack_animation_playing){
      player.body.velocity.y = 150;
      player.animations.play('down');
      this.current_orientation='down';
    }

    else if (!this.attack_animation_playing){
      player.animations.stop();

      //resets the frame of the animation to the standstill position
      this.current_orientation==='down' ? player.frame=130:false;
      this.current_orientation==='left' ? player.frame=117:false;
      this.current_orientation==='up' ? player.frame=104:false;
      this.current_orientation==='right' ? player.frame=143:false;
    }
  }
};