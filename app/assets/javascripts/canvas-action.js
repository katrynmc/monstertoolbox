
var mouseTarget;  // the display object currently under the mouse, or being dragged
var dragStarted;  // indicates whether we are currently in a drag operation
var offset;
var update = true;
var index = 0;

function stop() {
  createjs.Ticker.removeEventListener("tick", tick);
}

function handleClick(event) {
  var image = event.target;
  var bitmap;
  var container = new createjs.Container();
  stage.addChild(container);

  //Convert the image to a bitmap
  bitmap = new createjs.Bitmap(image);
  //Initial placement of monster part
  bitmap.x = (canvas.width - 100) * Math.random()|0;
  bitmap.y = (canvas.height - 100) * Math.random()|0;
  // Add the new bitmap to the container we created
  container.addChild(bitmap);
  update = true;

  bitmap.regX = bitmap.image.width/2|0;
  bitmap.regY = bitmap.image.height/2|0;
  //Set initial scale to 1
  bitmap.scaleX = bitmap.scaleY = bitmap.scale = 1;
  // name the bitmap
  bitmap.name = "bmp_"+index;
  // Convert cursor to pointer when you hover over the object
  bitmap.cursor = "pointer";
  // increment the index
  index += 1;

  //Preparation for future events

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

$('#save').click(function(event){
    event.preventDefault();
    $('#monster-details').show( "slow");
  });

  $("#submit").click(function(event){
    event.preventDefault();
    $("#data").val(d.toDataURL());
    $("#frm").trigger("submit");
  });

  // var myImage = new Image();
  // myImage.crossOrigin="anonymous";
  // myImage.src = $('#themain').data('parent-url');

  $(myImage).load(function() {
    e.drawImage(myImage, 0, 0);
  });

function saveRestorePoint() {
  var oCanvas = document.getElementById("monsterCanvas");
  var imgSrc = oCanvas.toDataURL("artwork/png");
  restorePoints.push(imgSrc);
}




