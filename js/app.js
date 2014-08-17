var stage;
var queue;

function init() {
  stage = new createjs.Stage("monsterCanvas");
  // Loading manager
  queue = new createjs.LoadQueue(false);
  queue.installPlugin(createjs.Sound);
  queue.addEventListener("complete", handleComplete);
  queue.loadManifest([{id:"eye1", src:"/assets/eye1.png"}, {id:"sound", src:"/assets/zenbell.mp3"}]);

  }

  function handleComplete(event) {
    // Every display object in easeljs can listen for a click event
    var ball = new createjs.Shape();
    ball.addEventListener("click", handleClick);
    ball.graphics.beginFill("#000").drawCircle(0,0, 50);
    // Coordinates
    ball.x = 50;
    ball.y = 200;

    // Create an animation that runs continuously (loop) that moves from x coordinate 50 to 450 in 3 seconds (3000)
    createjs.Tween.get(ball, {loop:true}).to({x:450}, 3000).to({x:50}, 3000);
    createjs.Ticker.addEventListener("tick", tick);
    // add child grabs the shape and adds it to the stage display list
    stage.addChild(ball);
  }

  function handleClick(event){
    var bmp = new createjs.Bitmap(queue.getResult("eye1"));
    bmp.x = Math.random()*500;
    bmp.y = Math.random()*500;

    stage.addChild(bmp);

    createjs.Sound.play("sound");
  }

  function tick(event) {
  stage.update();
}
