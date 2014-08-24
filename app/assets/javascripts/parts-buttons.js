$( "#eyecategory" ).click(function() {

  if ( $( "#eyes:first" ).is( ":hidden" ) ) {
    $( "#eyes" ).show( "slow" );
  } else {
    $( "#eyes" ).slideUp();
  }
});

$( "#mouthcategory" ).click(function() {

  if ( $( "#mouths:first" ).is( ":hidden" ) ) {
    $( "#mouths" ).show( "slow" );
  } else {
    $( "#mouths" ).slideUp();
  }
});
