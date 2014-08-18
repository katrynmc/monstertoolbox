var stage;
var queue;

function init() {
  stage = new createjs.Stage("monsterCanvas");
  // Loading manager
  // by default the loadqueue will try to load using xhr to have them load locally set false
  queue = new createjs.LoadQueue(false);
  queue.installPlugin(createjs.Sound);
  queue.addEventListener("complete", handleComplete);
  queue.loadManifest([{id:"eye1", src:"https://s3.amazonaws.com/monstertoolbox/eye1.png"}, {id:"sound", src:"/images/zenbell.mp3"}]);

  }

  function handleComplete(event) {
    // Every display object in easeljs can listen for a click event
    var ball = new createjs.Shape();
    ball.addEventListener("click", handleClick);
    ball.graphics.beginFill("#000").drawCircle(0,0, 50);
    // Coordinates
    ball.x = 50;
    ball.y = 200;

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
