//  global game vars

var w = 500
var h = 500
var world_radius = Math.sqrt(h*h+w*w)/1000

var sprite_size = 60
var pointer_distance_threshold = sprite_size

var camera_pan_speed = 15
var wall_stickiness = 0.1

var next_fire = 0
var fire_rate = 300

var next_wall_hitting = 0
var next_step = 0
var next_hamikazi = 0

var wall_hitting_interval = 1000
var hamikazi_rate = fire_rate

var map_name = 'map'
var tileset_name = 'breadinator_tileset'




//---------------------------------------------------------------
// var normalize = Phaser.Point.normalize;
// var zero      = new Phaser.Point(0, 0);

// class Joystick extends Phaser.Sprite {
//   constructor({x, y, holder, pin}) {
    
//     super(game, 0, 0, holder);
//     this.anchor.setTo(0.5, 0.5);
//     this.fixedToCamera = true;
//     this.cameraOffset.setTo(x, y);

//     this.direction      = new Phaser.Point(0, 0);
//     this.distance       = 0;
//     this.pinAngle       = 0;
//     this.disabled       = false;
//     this.isBeingDragged = false;

//     this.events.onDown = new Phaser.Signal();
//     this.events.onUp   = new Phaser.Signal();
//     this.events.onMove = new Phaser.Signal();
    
//     /* Pin indicator - what players think they drag */
//     this.pin = game.add.sprite(0, 0, pin);
//     this.pin.anchor.setTo(0.5, 0.5);
//     this.addChild(this.pin);
//     /* Invisible sprite that players actually drag */
//     var dragger = this.dragger = game.add.sprite(0, 0, null);
//       dragger.anchor.setTo(0.5, 0.5);
//       dragger.width = dragger.height = 181;
//       dragger.inputEnabled = true;
//       dragger.input.enableDrag(true);
//       /* Set flags on drag */
//       dragger.events.onDragStart.add(this.onDragStart, this);
//       dragger.events.onDragStop.add(this.onDragStop, this);
//     this.addChild(dragger);
//     }
//     enable() {
//       this.disabled = false;
//     }
//     disable() {
//       this.disabled = true;
//     }
//   onDragStart(){
//     this.isBeingDragged = true;
//     if (this.disabled) return;
//     this.events.onDown.dispatch();
//   }
//   onDragStop(){
//     this.isBeingDragged = false;
//     /* Reset pin and dragger position */
//     this.dragger.position.setTo(0, 0);
//     this.pin.position.setTo(0, 0);
//     if (this.disabled) return;
//     this.events.onUp.dispatch(this.direction, this.distance, this.angle);
//   }
//   update(){
//     if (this.isBeingDragged) {
//       var dragger   = this.dragger.position;
//       var pin       = this.pin.position;
//       var angle     = this.pinAngle = zero.angle(dragger);
//       var distance  = this.distance = dragger.getMagnitude();
//       var direction = normalize(dragger, this.direction);
//       pin.copyFrom(dragger);
//       if (distance > 90) pin.setMagnitude(90);
//       if (this.disabled) return;
//       this.events.onMove.dispatch(direction, distance, angle);
//     }
//   }
// }


