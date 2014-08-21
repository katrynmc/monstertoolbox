var canvas, stage;

  var mouseTarget;  // the display object currently under the mouse, or being dragged
  var dragStarted;  // indicates whether we are currently in a drag operation
  var offset;
  var update = true;
  var index = 0;

  function init() {

    // create stage and point it to the canvas:
    canvas = document.getElementById("monsterCanvas");
    stage = new createjs.Stage(canvas);

    // enable touch interactions if supported on the current device:
    createjs.Touch.enable(stage);

    // enabled mouse over / out events
    stage.enableMouseOver(10);
    stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.addEventListener("complete", handleComplete);
    queue.loadManifest([
      {id:"part0", src:"https://s3.amazonaws.com/monstertoolbox/eye1.png"},
      {id:"part1", src:"https://s3.amazonaws.com/monstertoolbox/mouth.png"},
      {id:"sound", src:"/images/blip.mp3"},
      ]);
    // load the source image:




  }

  function stop() {
    createjs.Ticker.removeEventListener("tick", tick);
  }

  function handleComplete(event) {
    // Create an array of all elements with class "part-button"
    var partButton = document.getElementsByClassName("part-button");
    // Get the length of the array
    var partTotal = partButton.length;
    // For each item in the array add an event listener that triggers
    // "handleclick" function when clicked
    for(var i = 0; i < partTotal ; i++){
      partButton[i].addEventListener('click', handleClick);
    }
  }
  function handleClick(event) {
    var image = event.target;
    var bitmap;
    var container = new createjs.Container();
    stage.addChild(container);



      bitmap = new createjs.Bitmap(image);
      container.addChild(bitmap);
      bitmap.x = canvas.width * Math.random()|0;
      bitmap.y = canvas.height * Math.random()|0;

      bitmap.regX = bitmap.image.width/2|0;
      bitmap.regY = bitmap.image.height/2|0;

      bitmap.name = "bmp_"+index;
      bitmap.cursor = "pointer";
      index += 1;

      // using "on" binds the listener to the scope of the currentTarget by default
      // in this case that means it executes in the scope of the button.
      bitmap.on("mousedown", function(evt) {
        this.parent.addChild(this);
        this.offset = {x:this.x-evt.stageX, y:this.y-evt.stageY};
      });

      // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
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
    // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
    if (update) {
      update = false; // only update once
      stage.update(event);
    }
  }
