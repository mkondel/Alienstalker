//  creation methods

function create() {
  start_engine()
  make_sounds()
  build_level()
  create_human()
  load_weapons()
  roll_camera()
  control_player()
}

function start_engine(){
  game.physics.startSystem(Phaser.Physics.ARCADE)
}

function make_sounds(){  
  meow =          game.add.audio('meow')
  ping =          game.add.audio('ping')
  plup =          game.add.audio('plup')
  failed =        game.add.audio('failed')
  pickup =        game.add.audio('pickup')

  out =           game.add.audio('out')
  wall =          game.add.audio('wall')
  disintegrate =  game.add.audio('materialize')
  footstep =      game.add.audio('step')
  blaster =       game.add.audio('blaster')
  shotgun =       game.add.audio('shotgun')
  explosion =     game.add.audio('explosion');

  blaster.allowMultiple = true
  shotgun.allowMultiple = true
  explosion.allowMultiple = true

  music = game.add.audio('music')
  music.loop = true
  music.volume = .5
  music.play()
}

function build_level(){
  map = game.add.tilemap(map_name)
  map.addTilesetImage(tileset_name)
  floor = map.createLayer('floor')
  walls = map.createLayer('walls')
  floor.resizeWorld()
}

function create_human(){
  human = game.add.sprite(500,500, 'human')
  human.animations.add('walk')
  game.physics.enable(human)
  human.anchor.set(.5)
  human.scale.set(.5)
  human.body.setSize(32,32,0,0)
  set_player_collisions([ [walls, [121, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 234]], [floor, [90]] ])
  human.rotation_speed = .1
  human.wall_collision_volume = .8
  human.step_sounds = footstep
  human.casting = false
  human.run_velocity = 200
}

function load_weapons(){
  //  bullet pool
  bullets = game.add.group()
  bullets.enableBody = true
  for (var i = 0; i < 2; i++){
    var bullet = bullets.create(0,0, 'bullet', [0], false)
    bullet.anchor.set(.5)
    bullet.body.setSize(8,8,0,0)
    bullet.scale.set(.5)
    bullet.explosion_scale = .3
    bullet.explosion_volume = .2
    bullet.events.onKilled.add(blow_up, bullet)
  }

  //  explosion pool
  explosions = game.add.group()
  for (var i = 0; i < 5; i++){
    var fireball = explosions.create(0, 0, 'kaboom', [0], false)
    fireball.animations.add('kaboom')
    fireball.anchor.set(.5)
    fireball.scale.set(.5)
  }

  //  hamikazi one and only
  hamikazis = game.add.group()
  hamikazis.enableBody = true
  hamikazis.outOfBoundsKill = true
  for (var i = 0; i < 3; i++){
    var hamikazi = hamikazis.create(0, 0, 'hamikazi', [0], false)
    hamikazi.animations.add('bounce')
    hamikazi.eeker = eeker
    reset_hamikazi(hamikazi)
    hamikazi.events.onKilled.add(reset_hamikazi, hamikazi)
    hamikazi.events.onKilled.add(blow_up, hamikazi)
    hamikazi.anchor.setTo(.5)
    hamikazi.explosion_scale = 1
    hamikazi.explosion_volume = 1
    hamikazi.sound_effect = game.add.audio('hamikazi1')
  }
}

function eeker(){ 
  this.animations.stop('bounce')
  this.play('bounce',15,true)
  game.physics.arcade.velocityFromRotation(human.rotation, 20, this.body.velocity)
  this.fade_in.start()
  this.scale_in.start()

  this.sound_effect.onPlay.add(function(){
    human.casting = true
  },this)

  this.sound_effect.onStop.add(function(){
    human.casting = false
    this.animations.stop('bounce')
    this.play('bounce',30,true)
    this.lifespan = 3000
    game.physics.arcade.velocityFromRotation(human.rotation, 50, this.body.velocity)
  },this)

  this.sound_effect.play('', 0, .5, false)
}

function reset_hamikazi(self){
  self.alpha = 0
  self.scale = {x:.1, y:.1}
  self.body.setSize(16,16,0,0)

  self.fade_in = game.add.tween(self)
  self.scale_in = game.add.tween(self.scale)
  self.fade_in.to( { alpha: 1 }, 2900)
  self.scale_in.to({x:4, y:4}, 2900)
}

function roll_camera(){
  game.camera.follow(human)//, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT)
  // game.camera.deadzone = new Phaser.Rectangle(w/8,h/8,w/1.3,h/1.3)
  // game.camera.deadzone = new Phaser.Rectangle(w/4,h/4,w/2,h/2)
  game.camera.focusOn(human)
}

function control_player(){
  // cursors = game.input.keyboard.createCursorKeys()
  // fire_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  // hamikazi_button = game.input.keyboard.addKey(Phaser.Keyboard.X)

  // game.input.onDown.add(walk)
  // game.input.addMoveCallback(moved_pointer, this)
  // game.input.onUp.add(stop_moving)

  joy = new Joystick(125,480, 'holder','pin')
  joy.events.onMove.add(joystick_handler)
  joy.events.onUp.add(stop_walking)

  fire_button = game.add.button(680, 680, 'a_out', gun_fire);
  hamikazi_button = game.add.button(780, 600, 'b_out', hamikazi_fire);
}

function stop_walking(){
  human.animations.stop('walk',true)
  human.step_sounds.stop()
  human.body.velocity.setTo(0, 0)
}

function joystick_handler(dir, dist, ang){
  human.rotation = ang
  human.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(human.angle, dist))
  human.animations.play('walk', dist, true)
  human.step_sounds.play('', 0, .1, true, false)
}

//-------------------------------------------------------------------------
function moved_pointer(pointer) {
  if(pointer.isDown)
    walk()
  human.rotation = game.physics.arcade.angleToPointer(human, pointer)
}

function walk() {
  // var velocity = game.physics.arcade.distanceToPointer(human)/world_radius
  // if(velocity != human.body.velocity)
  //   human.animations.stop('walk')
  human.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(human.angle, human.run_velocity))
  human.animations.play('walk', human.run_velocity/20, true)
  human.step_sounds.play('', 0, .2, true, false)
}
// function stop_moving(){
//   human.animations.stop('walk',true)
//   human.step_sounds.stop()
//   human.body.velocity.setTo(0, 0)
// }

function set_player_collisions(collidescope){
  for(var s=0;s<collidescope.length;s++){
    var map_layer = collidescope[s][0]
    var solids = collidescope[s][1]
    for(var tile_id=0; tile_id<solids.length; tile_id++){
      map.setCollisionBetween(solids[tile_id], solids[tile_id], true, map_layer)
    }
  }
}





