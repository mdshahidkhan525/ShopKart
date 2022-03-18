$(document).on('turbolinks:load', function () {
  $('.permission-check-box').on('change', function (e) {
    let id = this.value;
    let checked = this.checked;
    $('#role_permission_children_' + id + ' :checkbox:not([disabled])').prop('checked', checked);
  });

  $('.click-toggle').on('click', function () {
    let c = $(this).closest('li').find('.submenu_open').first();
    let isVisible = c.is(':visible');
    if (isVisible === true) {
      c.hide();
      c.parent().find('.submenu_open').hide();
      c.parent().find('.fa-minus-square').toggleClass('fa-plus-square')
    } else {
      $(this).find('.fa-plus-square').toggleClass('fa-minus-square')
      c.show();
    }
  });

  $('.role-data-model').on('change', function () {
    data_type_name = $(this).parents('td').next().find('select');
    data_type_name.empty();
    $.ajax({
      url: '/roles/data_conditions_data',
      type: 'POST',
      dataType: 'json',
      data: { data_model: $(this).val(), next_value: 'data_type_name' },
      success: function (data) {
        data_type_name.append('<option value="" label=""></option>');
        $.each(data, function (key, value) {
          option = '<option value="' + key + '">' + value + '</option>';
          data_type_name.append(option);
        });
      }
    });
  });

  $('.role-data-type-name').on('change', function () {
    data_model = $(this).parents('td').prev().find('select').val();
    data_type = $(this).parents('td').next().find('select');
    data_type.empty();
    $.ajax({
      url: '/roles/data_conditions_data',
      type: 'POST',
      dataType: 'json',
      data: { data_model: data_model, data_type_name: $(this).val(), next_value: 'data_type' },
      success: function (data) {
        data_type.append('<option value="" label=""></option>');
        $.each(data, function (key, value) {
          option = '<option value="' + key + '">' + value + '</option>';
          data_type.append(option);
        });
      }
    });
  });

  $('.role-data-type').on('change', function () {
    data_operator = $(this).parents('td').next().find('select');
    data_operator.empty();
    $.ajax({
      url: '/roles/data_conditions_data',
      type: 'POST',
      dataType: 'json',
      data: { data_type: $(this).val(), next_value: 'data_operator' },
      success: function (data) {
        data_operator.append('<option value="" label=""></option>');
        $.each(data, function (key, value) {
          option = '<option value="' + key + '">' + value + '</option>';
          data_operator.append(option);
        });
      }
    });
  });

  function toggle_required_attributes(row, value) {
    row.find('.role-data-model').attr('required', value);
    row.find('.role-data-type-name').attr('required', value);
    row.find('.role-data-type').attr('required', value);
    row.find('.role-data-operator').attr('required', value);
    row.find('.role-data-value').attr('required', value);
    return row;
  }

  $('#add-data-conditions').on('click', function () {
    new_row = $('#dummy-data-condition-row').clone(true).removeClass('d-none');
    new_row = toggle_required_attributes(new_row, true);
    $('#fields-for-data-conditions').append(new_row);
  });

  $('.role-data-condition-destroy').on('change', function () {
    checked = this.checked;
    row = $(this).parents('tr');
    row = toggle_required_attributes(row, !checked);
  });
});
