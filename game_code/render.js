function render(){
  // game.debug.cameraInfo(game.camera, 32, 32)
  // game.debug.body(alien);
  // game.debug.spriteInfo(human, 360, 60);
  // game.debug.text(human.hit_rotation, 30, 30)
  // game.debug.text('rotation: '+human.rotation, 30, 30)
  // game.debug.text('hit_rotation: '+human.hit_rotation, 30, 40)
  // game.debug.text( 'hit_rotation-rotation: '+(human.hit_rotation - human.rotation) , 30, 50)
}


var game = new Phaser.Game(w, h, Phaser.AUTO, '',
                          { preload: preload, 
                            create: create, 
                            update: update, 
                            render: render })


