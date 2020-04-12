$(function() {
  $('#student-lead-form').submit(function (e) {
    $('#otp-error').addClass('display-none')
    $('#invalid-otp-error').addClass('display-none')
    $('#invalid-mobile-error').addClass('display-none')
    e.preventDefault();

    var form = $(this)
    var url = "https://app.codingblocks.com/student_leads"

    var request = $.ajax({
      method: "POST",
      url: url,
      data: form.serialize()
    })
    
    request.done(function(response) { 
      $('#student-lead-form').addClass('display-none')
      $('#student-lead-form-success').removeClass('display-none')
    })
      
    request.fail(function (xhr, textStatus, errorThrown) {
      debugger
      console.log(xhr, textStatus, errorThrown)
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

  var request = $.ajax('https://app.codingblocks.com/student_leads/get_otp', {
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