
function preload() {

    game.load.tilemap('map', 'assets/tilemaps/maps/map_a.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('breadinator_tileset', 'assets/tilemaps/tiles/breadinator_tileset.png');
    
    game.load.audio('sfx', 'assets/audio/fx_mixdown.mp3')
    game.load.audio('explosion', 'assets/audio/explosion.mp3');
    game.load.audio('blaster', 'assets/audio/blaster.mp3')
    game.load.audio('shotgun', 'assets/audio/shotgun.wav')
    game.load.audio('step', 'assets/audio/steps2.mp3')
    game.load.audio('load', 'assets/audio/load_up.wav')
    game.load.audio('music', 'assets/audio/dark_horror_cave.mp3')

    game.load.spritesheet('human', 'assets/sprites/walking_man.png', 80,80, 6);
    game.load.spritesheet('kaboom', 'assets/sprites/explode.png', 128,128, 16);
    game.load.spritesheet('humstar', 'assets/sprites/humstar.png', 32,32, 6);

    game.load.image('bullet', 'assets/sprites/bullet.png');
    // game.load.image('bullet', 'assets/sprites/bullet-blue.png');
}