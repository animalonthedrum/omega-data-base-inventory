$(document).ready(function() {
  console.log('JQ');

  getCustomers();

  $('.display').on('click', '#orders', showOrders);

}); // end on ready
function getCustomers() {

  $.ajax({
    type: 'GET',
    url: '/customers',
    success: function(response) {
      console.log('back from get call with:', response);
      for (var i = 0; i < response.length; i++) {
        var $div = $('.display');
        $div.addClass('.customer');
        $div.append('<p>' + 'Customer Name: ' + response[i].first_name + ' ' + response[i].last_name + '</p>');
        $div.append('<button data-id =' + response[i].id + ' id="orders">Orders</button>');
        $div.data('id', response[i].id);

      } //end for loop
    } //end success
  }); //end ajax
} //end getCustomers
function showOrders() {
  console.log('button clicked');
  var id = $(this).data('id');
  console.log(id);
  $.ajax({
    type: 'GET',
    url: '/' + id,
    success: function(response) {
      console.log('back from get call with:', response);
      $('.orders').empty();
      for (var i = 0; i < response.length; i++) {
        var $div = $('.orders');
        $div.append('<p>' + 'Order ID: ' + response[i].order_id + '<br>' + 'Product ID: ' + response[i].product_id + '<br>' + 'Description: ' + response[i].description + '<br>' + 'Quantity: ' + response[i].quantity + '<br>' + 'Unit Price: ' + response[i].unit_price + '<br>' + '</p>');
        $div.data('id', response[i].id);
        $div.append("Thank you for your order");


      } //end for loop
    } //end success
  }); //end ajax


} //end showOrders
