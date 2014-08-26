var monster = monster || {};

monster.initialize = function() {
  $(document).foundation();

  canvas = document.getElementById("monsterCanvas");
  stage = new createjs.Stage(canvas);

  // enable touch interactions if supported on the current device:
  createjs.Touch.enable(stage);

  // enabled mouse over / out events
  stage.enableMouseOver(10);
  stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
  //Preloading images and sounds
  queue = new createjs.LoadQueue(false);
  queue.installPlugin(createjs.Sound);
  // queue.addEventListener("complete", handleComplete);
  queue.loadManifest([
    {id:"part0", src:"https://s3.amazonaws.com/monstertoolbox/eye1.png"},
    {id:"part1", src:"https://s3.amazonaws.com/monstertoolbox/mouth.png"},
    {id:"sound", src:"/assets/blip.mp3"},
    ]);

  $('#eyes').hide();
  $('#mouths').hide();
  $('#noses').hide();
  $('#ears').hide();
  $('#horns').hide();
  $('#arms').hide();
  $('#legs').hide();
  $('#tails').hide();
  $('#hair').hide();
  $('#monster-details').hide();
  $('#transform').hide();

  //Find all the elements with class "part-button"
  var partButton = document.getElementsByClassName("part-button");
  // Get the length of the array
  var partTotal = partButton.length;
  // For each item in the array add an event listener that triggers
  // "handleclick" function when clicked
  for(var i = 0; i < partTotal ; i++){
    partButton[i].addEventListener('click', handleClick);
  }
  document.getElementById('clear').addEventListener('click', function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    }, false);



};
