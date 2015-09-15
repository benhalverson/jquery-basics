$(document).ready(init);

function init(){
$('#get-bear').click(getBear);
console.log('ready');
}

function getBear(){
  var bearName = $('#bearName').val();

  $.getJSON('http://localhost:3000/api/bears/' + bearName, function(response){
    console.log('type ', response.type);
    console.log('name ', response.name);
    console.log('location ', response.location);

    var bears = [];
    $.each(response, function(key, val){
      bears.push("<li id='" + key " '>" + val + "</li>");
    });

    // var $div = $('<div>');
    // var $high = $('<div>');
    // $div.addClass('quote');
    // $div.text('$' + response.LastPrice);
    // $('#quotes').append($div);
    // console.log('High Price ' + response.High);
  });
}
