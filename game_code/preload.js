
function preload() {

    game.load.tilemap('map', 'assets/tilemaps/maps/map_a.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('breadinator_tileset', 'assets/tilemaps/tiles/breadinator_tileset.png');
    
    game.load.audio('explosion', 'assets/audio/explosion.mp3');
    game.load.audio('blaster', 'assets/audio/blaster.mp3')
    game.load.audio('shotgun', 'assets/audio/shotgun.wav')
    game.load.audio('step', 'assets/audio/steps2.mp3')
    game.load.audio('load', 'assets/audio/load_up.wav')
    game.load.audio('music', 'assets/audio/dark_horror_cave.mp3')
    game.load.audio('eek', 'assets/audio/eek.wav')
    game.load.audio('hamikazi1', 'assets/audio/hamikazi1.wav')

    game.load.audio('disintegrate', 'assets/audio/disintegrate.mp3')
    game.load.audio('materialize', 'assets/audio/SoundEffects/door_open.wav')
    game.load.audio('wall', 'assets/audio/wall.wav')
    
    game.load.audio('failed', 'assets/audio/SoundEffects/numkey_wrong.wav')
    game.load.audio('meow', 'assets/audio/SoundEffects/meow1.mp3')
    game.load.audio('ping', 'assets/audio/SoundEffects/p-ping.mp3')
    game.load.audio('pickup', 'assets/audio/SoundEffects/pickup.wav')
    game.load.audio('out', 'assets/audio/SoundEffects/menu_switch.mp3')
    game.load.audio('plup', 'assets/audio/SoundEffects/squit.mp3')

    game.load.spritesheet('human', 'assets/sprites/walking_man.png', 80,80, 6);
    game.load.spritesheet('kaboom', 'assets/sprites/explode.png', 128,128, 16);
    game.load.spritesheet('hamikazi', 'assets/sprites/humstar.png', 32,32, 6);

    game.load.image('bullet', 'assets/sprites/bullet.png');
}