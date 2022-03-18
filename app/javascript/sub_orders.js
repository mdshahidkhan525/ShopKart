$(document).on('turbolinks:load', function () {
  $('.edit-sub-order-details').on('click', function() {
    var sub_order_id = $(this).data('sub-order-id');
    $.ajax({
      url: `/sub_orders/${sub_order_id}/edit`,
      method: 'GET',
      dataType: 'script',
    }).fail(function (data) {
      toastr.error(data.statusText);
    });
  });
});
