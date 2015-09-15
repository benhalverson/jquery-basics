'use strict';
$(function (){

  let $orders = $('#orders');
  let $name = $('#name');
  let $drink = $('#drink');
  const url= 'http://rest.learncode.academy/api/codinghouse/students/';

  // mustache template
  let orderTemplate = $('#order-template').html();

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

  $orders.delegate('.editOrder', 'click', function(){
    var $li = $(this).closest('li');
    $li.find('input.name').val( $li.find('span.name').html() );
    $li.find('input.drink').val( $li.find('span.drink').html() );
    $li.addClass('edit');
  });

  $orders.delegate('.cancelEdit', 'click', function(){
    var $li = $(this).closest('li').removeClass('edit');

  });

  $orders.delegate('.saveEdit', 'click', function(){
    var $li = $(this).closest('li');
    var order = {
      name: $li.find('input.name').val(),
      drink: $li.find('input.drink').val()
    };
    $.ajax({
      type: 'PUT',
      url: url + $li.attr('data-id'),
      data: order,
      success: function(newOrder) {
        $li.find('span.name').html(order.name);
        $li.find('span.drink').html(order.drink);
        $li.removeClass('edit');
      },
      error: function(){
        console.error('error updating order');
      }
    });
  });

  });
