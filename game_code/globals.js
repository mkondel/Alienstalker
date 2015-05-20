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