'use strict';
$(function (){

  let $orders = $('#orders');
  let $name = $('#name');
  let $drink = $('#drink');
  const url= 'http://rest.learncode.academy/api/codinghouse/students/';

  // mustache template
  let orderTemplate = "" +
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
    url: url,
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
      url: url,
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




  $orders.delegate('.remove', 'click', function(){
    var $li = $(this).closest('li');
    $.ajax({
      type: 'DELETE',
      url: url + $(this).attr('data-id'),
      success: function(){
        $li.fadeOut(300, function(){
          $(this).remove();
        });
        console.log('delete success');
      },
      error: function(){
        console.log('Error');
      }
    });
  });
});
