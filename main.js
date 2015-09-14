$(document).ready(init);

function init(){
  $('#clickme').click(doStuff);
  $('#mynums-button').click(createNumberBoxes);
  $('#number-parent').on('click', '.cube', getSquareRoot);
  $('#number-parent').on('dblclick', '.cube', removeCube);
  $('#get-quote').click(getQuote);
}

function getQuote(){
  var symbol = $('#symbol').val().toUpperCase();
  $.getJSON('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol + '&callback=?', function(response){
    console.log(response.LastPrice);
  });
}

function removeCube(){
  $(this).remove();
}

function getSquareRoot(){
  $(this).text(Math.sqrt($(this).text()).toFixed(2));
}

function createNumberBoxes(){

  var num = $('#mynums').val() * 1;
  var numbers = [];
  for(var i = 0; i < num; i++){
    numbers.push(i);
  }
  console.log(numbers);
  var odds = numbers.filter(function(n){
    return n%2;
    console.log(odds);
  });

  var cubed = odds.map(function(n){
      return Math.pow(n, 3)
  });

  console.log(cubed);

  cubed.forEach(function(n){
    var $div = $('<div>');
    $div.text(n);
    $div.addClass('cube');
    $('#number-parent').append($div);
  });
}

function doStuff(){
  var generic = $('#generic').val();
  console.log('You just typed', generic);
  $('.delta').css('color', generic);
  $('h1').toggleClass('alert');
}
