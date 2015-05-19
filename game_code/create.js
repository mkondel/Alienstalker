function create() {

  start_engine()

  sound_init()

  build_level()

  generate_human()

  load_weapons()

  roll_camera()

  implement_controls()
}


function start_engine(){
  game.renderer.clearBeforeRender = false;
  game.renderer.roundPixels = true;
  game.physics.startSystem(Phaser.Physics.ARCADE)
}


function sound_init(){
  
  wall = game.add.audio('wall')
  failed = game.add.audio('failed')
  disintegrate = game.add.audio('materialize')
  meow = game.add.audio('meow')
  ping = game.add.audio('ping')
  pickup = game.add.audio('pickup')
  out = game.add.audio('out')
  plup = game.add.audio('plup')

  explosion = game.add.audio('explosion');
  blaster = game.add.audio('blaster')
  shotgun = game.add.audio('shotgun')
  footstep = game.add.audio('step')
  mumbling = game.add.audio('mumbling')

  explosion.allowMultiple = true
  blaster.allowMultiple = true
  shotgun.allowMultiple = true
  footstep.allowMultiple = true
  mumbling.allowMultiple = true

  shotgun.volume = .4
  blaster.volume = .3
  footstep.volume = .4

  // music = game.add.audio('music')
  // music.loop = true
  // music.volume = 1
  // music.play()
}


function build_level(){
  map = game.add.tilemap('map')
  map.addTilesetImage('breadinator_tileset');
  floor = map.createLayer('floor');
  walls = map.createLayer('walls');
  floor.resizeWorld()
}


function generate_human(){
  human = game.add.sprite( 500,500, 'human')
  human.animations.add('run');
  game.physics.enable(human);
  human.anchor.set(.5)
  human.scale.set(.5)
  human.body.setSize(64,64,0,0)
  set_player_collisions(walls, [121, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 234])
  set_player_collisions(floor, [90] )
  human.rotation_speed = .1
  human.hit_volume = .5
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
    bullet.explosion_scale = .5
    bullet.explosion_volume = .3
    bullet.events.onKilled.add(blow_up, bullet)
  }

  //  explosion pool
  explosions = game.add.group()
  for (var i = 0; i < 5; i++){
    var fireball = explosions.create(0, 0, 'kaboom', [0], false)
    fireball.anchor.set(.5)
    fireball.scale.set(.5)
    fireball.animations.add('kaboom')
  }

  //  hamikazi one and only
  hamikazis = game.add.group()
  hamikazis.enableBody = true
  hamikazis.outOfBoundsKill = true
  for (var i = 0; i < 1; i++){
    var hamikazi = hamikazis.create(0, 0, 'hamikazi', [0], false)
    hamikazi.anchor.setTo(.5)
    hamikazi.animations.add('bounce')
    hamikazi.sound_effect = blaster
    
    hamikazi.explosion_scale = 2
    hamikazi.explosion_volume = 1

    reset_hamikazi(hamikazi)
    hamikazi.events.onKilled.add(reset_hamikazi, hamikazi)
    hamikazi.events.onKilled.add(blow_up, hamikazi)
    hamikazi.events.onKilled.add(shutup)

    hamikazi.mumble = function(){ 
      disintegrate.play('', 0, .5)
      disintegrate.onStop.add(function(){ 
        mumbling.play('', 0, .15, true)
      })
    }
    function shutup(){ mumbling.stop() }


    function reset_hamikazi(self){
      shutup()
      self.alpha = 0
      self.scale = {x:.1, y:.1}
      self.body.setSize(16,16,0,0)

      self.fade_in = game.add.tween(self)
      self.scale_in = game.add.tween(self.scale)
      self.fade_in.to( { alpha: 1 }, 1000)
      self.scale_in.to({x:3, y:3}, 2000)
    }
  }
}


function blow_up(self){
  var fireball = explosions.getFirstExists(false)
  if(fireball){
    fireball.reset(self.x, self.y)
    fireball.play('kaboom', 40, false, true)
    fireball.scale.set(self.explosion_scale)
  }
  explosion.play('', 0, self.explosion_volume, false, true)
}


function roll_camera(){
  game.camera.follow(human, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT)
  game.camera.deadzone = new Phaser.Rectangle(w/8,h/8,w/1.3,h/1.3)
  game.camera.focusOn(human)
  // game.camera.deadzone = new Phaser.Rectangle(w/4,h/4,w/2,h/2)
}


function implement_controls(){
  cursors = game.input.keyboard.createCursorKeys()
  fire_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  hamikazi_button = game.input.keyboard.addKey(Phaser.Keyboard.X)
}


function set_player_collisions(map_layer, solids){
  for(tile_id=0; tile_id<solids.length; tile_id++){
    map.setCollisionBetween(solids[tile_id], solids[tile_id], true, map_layer);
  }
}





