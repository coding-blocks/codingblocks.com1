$(function() {
  var $regexname = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/g;
  $('#phoneNumber').on('keypress keydown keyup', function () {
    if (!$(this).val().match($regexname)) {
      $('#otp-error').addClass('display-none')
      $('#invalid-otp-error').addClass('display-none')
      $('#invalid-mobile-error').addClass('display-none')
      $('#invalid-phone-number-error').removeClass('display-none');
      $('#invalid-phone-number-error').show();
      $('#otp-btn').prop('disabled', true)
    }
    else {
      $('#invalid-phone-number-error').addClass('display-none');
      $('#otp-btn').prop('disabled', false)
    }
  });

  $('#student-lead-form').submit(function (e) {
    $('#otp-error').addClass('display-none')
    $('#invalid-otp-error').addClass('display-none')
    $('#invalid-mobile-error').addClass('display-none')
    e.preventDefault();

    var form = $(this)
    var url = form.attr('action')

    var request = $.ajax({
      method: "POST",
      url: url,
      data: form.serialize(),
      json: true
    })
    
    request.done(function(response) { 
      $('#lead-form').addClass('display-none')
      $('#student-lead-form-success').removeClass('display-none')
    })
      
    request.fail(function (xhr, textStatus, errorThrown) {
        if (xhr.status == 403) {
          $('#invalid-otp-error').removeClass('display-none')
        } else if (xhr.responseJSON.name == "SequelizeUniqueConstraintError") {
          $('#invalid-mobile-error').removeClass('display-none')
        }
      })
  })
})

function requestOtp() {
  $('#otp-error').addClass('display-none')
  $('#invalid-otp-error').addClass('display-none')
  $('#invalid-mobile-error').addClass('display-none')

  var $regexname = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/g;
  if (!$('#phoneNumber')[0].value.match($regexname)) {
    return
  }

  var request = $.ajax('http://localhost:3000/student_leads/get_otp', {
    method: "POST",
    data: {
      mobile: $('#phoneNumber')[0].value
    },
    json: true
  })
  
  request.done(function (response) {
    $('#otp-and-submit').removeClass('display-none')
    $('#otpId')[0].value = response.id
  })
  
  request.fail(function(err) {
    $('#otp-error').removeClass('display-none')
  })
}