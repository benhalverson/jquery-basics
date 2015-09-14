$(document).ready(init);

function init(){
  $('#clickme').click(doStuff);
}


function doStuff(){
  var generic = $('#generic').val();
  console.log('You just typed', generic);
  $('.delta').css('color', generic);
  $('h1').toggleClass('alert');
}
