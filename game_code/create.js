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
  fx = game.add.audio('sfx')
  fx.allowMultiple = true
  fx.addMarker('wall', 1, .05, .3)
  fx.addMarker('failed', 3, .5)
  fx.addMarker('materialize', 4, 3, .1)
  fx.addMarker('meow', 8, .5)
  fx.addMarker('ping', 9, .1)
  fx.addMarker('pickup', 10, 1)
  fx.addMarker('dematerialize', 12, 3)
  fx.addMarker('shot', 17, 1)
  fx.addMarker('out', 19, .3, .3)

  explosion = game.add.audio('explosion');
  blaster = game.add.audio('blaster')
  shotgun = game.add.audio('shotgun')
  footstep = game.add.audio('step')
  // load = game.add.audio('load')

  music = game.add.audio('music')
  music.loop = true

  music.volume = 1
  shotgun.volume = .4
  blaster.volume = .3
  explosion.volume = .5
  footstep.volume = .4
  
  music.play()
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
    bullet.fireball_scale = .5
  }

  //  explosion pool
  explosions = game.add.group()
  for (var i = 0; i < 5; i++){
    var fireball = explosions.create(0, 0, 'kaboom', [0], false)
    fireball.anchor.set(.5)
    fireball.scale.set(.5)
    fireball.animations.add('kaboom')
  }

  //  humstar one and only
  humstars = game.add.group()
  humstars.enableBody = true
  for (var i = 0; i < 1; i++){
    var humstar = humstars.create(0, 0, 'humstar', [0], false)
    humstar.anchor.setTo(.5)
    humstar.body.setSize(64,64,0,0)
    humstar.scale.set(2.5)
    humstar.animations.add('bounce')
    humstar.fireball_scale = 2
  }
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
  humstar_button = game.input.keyboard.addKey(Phaser.Keyboard.X)
}


function set_player_collisions(map_layer, solids){
  for(tile_id=0; tile_id<solids.length; tile_id++){
    map.setCollisionBetween(solids[tile_id], solids[tile_id], true, map_layer);
  }
}





