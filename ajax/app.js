$(function (){

  var $orders = $('#orders');
  var $name = $('#name');
  var $drink = $('#drink');

  function addOrder(order){
    $orders.append('<li>name: ' + order.name + ', drink: '+ order.drink +' </li>');
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
    })
  });
});
