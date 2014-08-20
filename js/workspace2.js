var stage;
var queue;
var canvasElement = document.getElementById("monsterCanvas");
var instance = createShape(canvasElement.width / 2, canvasElement.height / 2);

function init() {
  stage = new createjs.Stage(canvasElement);
  stage.addChild(instance);
  stage.update();
  instance.addEventListener("mousedown", startDrag);
  // by default the loadqueue will try to load using xhr to have them load locally set false
  queue = new createjs.LoadQueue(false);
  queue.installPlugin(createjs.Sound);
  queue.addEventListener("complete", handleComplete);
  queue.loadManifest([{id:"eye1", src:"https://s3.amazonaws.com/monstertoolbox/eye1.png"}, {id:"sound", src:"/images/blip.mp3"}]);
}
function handleComplete(event) {
  stage.addChild(instance);
  stage.update();
  instance.addEventListener("mousedown", startDrag);
  var ball = document.getElementById("part0");
  ball.addEventListener("click", handleClick);


}
function handleClick(event){
    var bmp = new createjs.Bitmap(queue.getResult("eye1"));
    bmp.x = Math.random()*500;
    bmp.y = Math.random()*500;

    stage.addChild(bmp);
    createjs.Sound.play("sound");
    stage.update();

  }

function startDrag(eventObject) {
  var instance = eventObject.target;
  instance.addEventListener("pressmove", drag);
  instance.addEventListener("pressup", stopDrag);
}
function drag(eventObject) {
  var instance = eventObject.target;
  instance.x = eventObject.stageX;
  instance.y = eventObject.stageY;
  stage.update();
}
function stopDrag(eventObject) {
  var instance = eventObject.target;
  instance.removeEventListener("pressmove", drag);
  instance.removeEventListener("pressup", stopDrag);
}
function createShape(x, y) {
  var instance = new createjs.Shape();
  instance.x = x;
  instance.y = y;
  drawRectangle(instance.graphics);
  return instance;
}
function drawRectangle(myGraphics) {
  var randomNumber = Math.floor(Math.random() * 0xFFFFFF);
  myGraphics.beginStroke("blue");
  myGraphics.beginFill("cyan");
  myGraphics.drawRect(-20, -20, 40, 40);
}
function tick(event) {
  stage.update();
}

