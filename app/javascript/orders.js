$(document).on('turbolinks:load', function () {
  $('.show-order-detail').on('click', function() {
    var order_id = $(this).data('order-id');
    $.ajax({
      url: `/orders/${order_id}`,
      method: 'GET',
      dataType: 'script',
    });
  });
});
