
var mouseTarget;  // the display object currently under the mouse, or being dragged
var dragStarted;  // indicates whether we are currently in a drag operation
var offset;
var update = true;
var index = 0;
var currentBitmap;
var currentBorder;
var rotation;

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
  currentBitmap = bitmap;
  //Initial placement of monster part
  bitmap.x = (canvas.width - 100) * Math.random()|0;
  bitmap.y = (canvas.height - 100) * Math.random()|0;
  // Add the new bitmap to the container we created
  container.addChild(bitmap);
  update = true;

  bitmap.regX = bitmap.image.width/2|0;
  bitmap.regY = bitmap.image.height/2|0;
  //Set initial scale to 0.5 (half of total size of image)
  bitmap.scaleX = bitmap.scaleY = bitmap.scale = 0.5;
  rotation = 0;
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

  bitmap.on("dblclick", function(evt) {
    event.preventDefault();
    var border = new createjs.Shape();
    border.graphics.beginStroke("red");
    border.graphics.setStrokeStyle(0.5);
    border.snapToPixel = true;
    border.graphics.drawRect(0, 0, 100, 100);
    border.x = this.x - 30;
    border.y = this.y - 30;

    stage.addChild(border);
    stage.update();
    currentBorder = border;


    $('#transform').show( "slow");

      $("#remove-button").click(function(event){
        container.removeChildAt(0);
        stage.removeChild(currentBorder);
        update = true;
        $('#transform').hide( "slow" );
      });
    $("#rotate-left").click(function(event){
        currentBitmap.rotation(rotation + 45);
        update = true;

      });

    // $("#rotate-right").click(function(event){
    //   bitmap.rotation += 30;
    // }
    // $("#bigger").click(function(event){
    //   bitmap.scaleX = 2;
    // }

    // $("#smaller").click(function(event){
    //   bitmap.scaleX = 0.5;
  // }
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
  $("#data").val($("#monsterCanvas")[0].toDataURL());
  $("#frm").trigger("submit");
});

var myImage = new Image();
myImage.crossOrigin="anonymous";
// myImage.src = $('#themain').data('parent-url');

$(myImage).load(function() {
  e.drawImage(myImage, 0, 0);
});

function saveRestorePoint() {
  var oCanvas = document.getElementById("monsterCanvas");
  var imgSrc = oCanvas.toDataURL("artwork/png");
  restorePoints.push(imgSrc);
}




