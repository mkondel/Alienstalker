
var w = 1000
var h = 500
var camera_pan_speed = 15
var sprite_size = 60

var cursors
var map
var fx
var bullets

var next_fire = 0
var fire_futton
var fire_rate = 300

var wall_stickiness = 0.1
var next_wall_hitting = 0
var wall_hitting_interval = 1000

var explosions

var next_step = 0

var next_hamikazi = 0
var hamikazi_rate = fire_rate
var mumbling