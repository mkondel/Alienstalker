
function update(){
//  humans!
  human.body.velocity.x = 0
  human.body.velocity.y = 0

//  collisions
  game.physics.arcade.collide(human, walls, hit_the_wall, null, this)
  game.physics.arcade.collide(human, floor, hit_the_wall, null, this)
  game.physics.arcade.collide(bullets, walls, explode, null, this)
  game.physics.arcade.collide(bullets, floor, explode, null, this)

//  actions
  if (fire_button.isDown)
    gun_fire()
  if (hamikazi_button.isDown)
    hamikazi_fire()

//  TANK controls
  if( Math.abs(human.hit_rotation - human.rotation) > wall_stickiness )
    human.is_stuck = false

  if (cursors.left.isDown)
    human.rotation -= human.rotation_speed
  else if (cursors.right.isDown)
    human.rotation += human.rotation_speed

  if (cursors.up.isDown && !human.is_stuck)
    walk(20, 10, sprite_size*4)
  else if (cursors.down.isDown && !human.is_stuck)
    walk(10, 30, -sprite_size*3)
  else if( !cursors.up.isDown && !cursors.down.isDown && human.is_stuck )
    human.is_stuck = false
  else{
    human.animations.play('run', 24, false)
    human.animations.stop()
  }


//  WASD for camera
  if (game.input.keyboard.isDown(Phaser.Keyboard.W))
    game.camera.y -= camera_pan_speed;
  else if (game.input.keyboard.isDown(Phaser.Keyboard.S))
    game.camera.y += camera_pan_speed;
  if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    game.camera.x -= camera_pan_speed;
  else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    game.camera.x += camera_pan_speed;
}


function gun_fire () {
  if (game.time.now > next_fire && bullets.countDead() > 0){
    var bullet = bullets.getFirstExists(false)
    if(bullet){
      bullet.rotation = human.rotation
      bullet.reset(human.x, human.y)
      game.physics.arcade.velocityFromRotation(human.rotation, 500, bullet.body.velocity)
      blaster.play('', 0, .25, false)
      next_fire = game.time.now + fire_rate;
    }
  }
}
function hamikazi_fire() {
  var hamikazi = hamikazis.getFirstExists(false)
  if(hamikazi){
    hamikazi.reset(human.x, human.y)
    hamikazi.mumble()
    hamikazi.play('bounce',30,true)
    hamikazi.lifespan = 5000
    game.physics.arcade.velocityFromRotation(human.rotation, 50, hamikazi.body.velocity)
    hamikazi.fade_in.start()
    hamikazi.scale_in.start()
    next_hamikazi = game.time.now + 1500;
  }else{
    if (game.time.now > next_hamikazi){
        // fx.play('out', 0, .2, false, false)
        out.play('',0,.2,false,false)
        next_hamikazi = game.time.now + hamikazi_rate;
      }
  }
}


function walk(step_rate, stepping_mult, moving_mult){
  human.animations.play('run', step_rate, true)
  human.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(human.angle, moving_mult))
  if (game.time.now > next_step){
    footstep.play()
    next_step = game.time.now + step_rate*stepping_mult
  }
}


function hit_the_wall (a, b) {
  if (game.time.now > next_wall_hitting){
    a.hit_rotation = a.rotation
    a.is_stuck = true
    // fx.play('wall', 0, a.hit_volume, false, false)
    wall.play('', 0, a.hit_volume, false, false)
    next_wall_hitting = game.time.now + wall_hitting_interval;
  }
}


function explode (a, b) { a.kill() }




