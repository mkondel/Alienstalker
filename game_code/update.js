//  game methods

function update(){
//  follow mouse
  // follow_mouse(human)
  // moveSprite()


//  collisions
  great_collider()

//  actions
  if (fire_button.isDown)
    gun_fire()
  if (hamikazi_button.isDown)
    hamikazi_fire()

//  TANK controls
  // tank_it()

//  WASD for camera
  // cam_wasd()
}

function follow_mouse(sprite){
//  only move when you click
  if (game.input.activePointer.isDown)
    game.physics.arcade.moveToPointer(sprite, 100)
  else
    sprite.body.velocity.setTo(0, 0)
}

function great_collider(){
  game.physics.arcade.collide(human, walls, hit_the_wall, null, this)
  game.physics.arcade.collide(human, floor, hit_the_wall, null, this)
  game.physics.arcade.collide(bullets, walls, explode, null, this)
  game.physics.arcade.collide(bullets, floor, explode, null, this)
}

function tank_it(){
  if( Math.abs(human.hit_rotation - human.rotation) > wall_stickiness )
    human.is_stuck = false
  //  cursor player tank-style movement
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
    human.animations.play('run', 60, false)
    human.animations.stop()
  }
}

function cam_wasd(){
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
      blaster.play('', 0, .1, false)
      next_fire = game.time.now + fire_rate;
    }
  }
}

function hamikazi_fire() {
  if (hamikazis.countDead() > 0 && !human.casting){
    var hamikazi = hamikazis.getFirstExists(false)
    if(hamikazi){
      hamikazi.reset(human.x, human.y)
      hamikazi.eeker()
    }
  }else{
    out.play('',0,1,false,false)
  }
}

function hit_the_wall (a, b) {
  if (game.time.now > next_wall_hitting){
    a.hit_rotation = a.rotation
    a.is_stuck = true
    // fx.play('wall', 0, a.wall_collision_volume, false, false)
    wall.play('', 0, a.wall_collision_volume, false, false)
    next_wall_hitting = game.time.now + wall_hitting_interval;
  }
}

function explode (a, b) { a.kill() }

function blow_up(self){
  var fireball = explosions.getFirstExists(false)
  if(fireball){
    fireball.reset(self.x, self.y)
    fireball.play('kaboom', 40, false, true)
    fireball.scale.set(self.explosion_scale)
  }
  explosion.play('', 0, self.explosion_volume, false, true)
}




