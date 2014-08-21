var canvas = document.getElementById("monsterCanvas");
var stage;
var mouseTarget;
var dragStarted;
var offset;
var update = true;
var queue;

function init() {
  stage = new createjs.Stage(canvas);
  stage.update();
  // enable touch interactions if supported on the current device:
  createjs.Touch.enable(stage);
   //IS THERE A BETTER WAY TO DO THIS?!?!?
  index = 0;

  stage.enableMouseOver(10);
  stage.mouseMoveOutside = true;

  //Preload the images and sounds to avoid delays
  queue = new createjs.LoadQueue(false);
  queue.installPlugin(createjs.Sound);
  queue.addEventListener("complete", handleComplete);
  queue.loadManifest([
    {id:"part0", src:"https://s3.amazonaws.com/monstertoolbox/eye1.png"},
    {id:"part1", src:"https://s3.amazonaws.com/monstertoolbox/mouth.png"},
    {id:"sound", src:"/images/blip.mp3"},
    ]);
}

function stop() {
    createjs.Ticker.removeEventListener("tick", tick);
  }

// Add click handler to the monster part icons show by filters
function handleComplete(event) {
  // Create an array of all elements with class "part-button"
  var partButton = document.getElementsByClassName("part-button");
  // Get the length of the array
  var partTotal = partButton.length;
  // For each item in the array add an event listener that triggers
  // "handleclick" function when clicked
  for(var i = 0; i < partTotal ; i++){
    partButton[i].addEventListener('click', handleClick, false);
  }
}

function handleClick(event){

    var bitmap = new createjs.Bitmap(queue.getResult(this.id));
    var container = new createjs.Container();

    stage.addChild(container);
    container.addChild(bitmap);
    createjs.Sound.play("sound");
    stage.update();

    bitmap.x = canvas.width * Math.random()|0;
    bitmap.y = canvas.height * Math.random()|0;
    bitmap.rotation = 360 * Math.random()|0;
    bitmap.regX = bitmap.width/2|0;
    bitmap.regY = bitmap.height/2|0;
    bitmap.scaleX = bitmap.scaleY = bitmap.scale = Math.random()*0.4+0.6;
    bitmap.name = "bmp_"+(index = index+1);
    bitmap.cursor = "pointer";

    // using "on" binds the listener to the scope of the currentTarget by default
    // in this case that means it executes in the scope of the button.
    bitmap.on("mousedown", function(evt) {
      this.parent.addChild(this);
      this.offset = {x:this.x-evt.stageX, y:this.y-evt.stageY};
    });

    // the pressmove event is dispatched when the mouse moves after a
    // mousedown on the target until the mouse is released.
    bitmap.on("pressmove", function(evt) {
      this.x = evt.stageX+ this.offset.x;
      this.y = evt.stageY+ this.offset.y;
      // indicate that the stage should be updated on the next tick:
      update = true;
    });

    bitmap.on("rollover", function(evt) {
      this.scaleX = this.scaleY = this.scale*1.2;
      update = true;
    });

    bitmap.on("rollout", function(evt) {
      this.scaleX = this.scaleY = this.scale;
      update = true;
    });

    createjs.Ticker.addEventListener("tick", tick);
  }

  function tick(event) {
    // this set makes it so the stage only re-renders when an
    // event handler indicates a change has happened.
    if (update) {
      update = false; // only update once
      stage.update(event);
    }
  }



// function startDrag(eventObject) {
//   var instance = eventObject.target;
//   instance.addEventListener("pressmove", drag);
//   instance.addEventListener("pressup", stopDrag);
// }
// function drag(eventObject) {
//   var instance = eventObject.target;
//   instance.x = eventObject.stageX;
//   instance.y = eventObject.stageY;
//   stage.update();
// }
// function stopDrag(eventObject) {
//   var instance = eventObject.target;
//   instance.removeEventListener("pressmove", drag);
//   instance.removeEventListener("pressup", stopDrag);
// }
// function createShape(x, y) {
//   var instance = new createjs.Shape();
//   instance.x = x;
//   instance.y = y;
//   drawRectangle(instance.graphics);
//   return instance;
// }
// function drawRectangle(myGraphics) {
//   var randomNumber = Math.floor(Math.random() * 0xFFFFFF);
//   myGraphics.beginStroke("blue");
//   myGraphics.beginFill("cyan");
//   myGraphics.drawRect(-20, -20, 40, 40);
// }


