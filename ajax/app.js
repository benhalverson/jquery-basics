$(function (){

  var $orders = $('#orders');
  var $name = $('#name');
  var $drink = $('#drink');

  // mustache template
  var orderTemplate = "" +
  "<li>" +
  "<p>Name: {{name}}</p>" +
  "<p>Drink: {{drink}}</p>" +
  "<button data-id='{{id}}' class='remove'>X</button>" +
  "</li>";
  function addOrder(order){
    $orders.append(Mustache.render(orderTemplate, order));
  }
  $.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/learncode/friends',
    success: function(orders) {

      $.each(orders, function(index, order){
        addOrder(order);
      });
    },
    error: function(){
      console.error('Error loading orders');
    }
  });

  $('#add-order').on('click', function(){
    var order = {
      name: $name.val(),
      drink: $drink.val()
    };
    $.ajax({
      type: 'POST',
      url: 'http://rest.learncode.academy/api/learncode/friends',
      data: order,
      // this way also works
      // data: {
      //   name: $name.val(),
      //   drink: $drink.val()
      // },
      success: function(newOrder) {
        addOrder(newOrder);
      },
      error: function(){
        console.error('error saving order');
      }
    });
  });
  $('.remove').on('click', function(){
    console.log('clicked');
    $.ajax({
      type: 'DELETE',
      url: 'http://rest.learncode.academy/api/learncode/friends' + $(this).attr('data-id'),
      success: function(){
        console.log('delete success');
      },
      error: function(){
        console.log('Error');
      }
    });
  });
});
