$(function(){
  var id = getUrlParameter('id')

  var event = $.ajax('https://app.codingblocks.com/events/' + id, { 
    method: 'GET',
    contentType: 'application/json; charset=UTF-8',
    dataType: "json"
  })

  event.done(function (response) {
    $('.event-registration > img').attr('src', response.event.banner)
    $('.event-registration > form').attr('action', 'https://app.codingblocks.com/events/' + response.event.id + '/register')
    $('.event-registration > .about').html(response.event.about)
    $('.event-registration > .description').html(response.event.description)
    if(response.event.is_certificate_event) {
      $('event-registration > .certificate-note').show()      
    } else {      
      $('event-registration > .certificate-note').hide()
    }    
  })

  $('#event-registration-form').submit(function (e) {
    $('#registration-error').addClass('display-none')

    e.preventDefault()

    var form = $(this)
    var url = form.attr('action')

    var request = $.ajax({
      method: "POST",
      url: url,
      data: form.serialize(),
      json: true,
      xhrFields: {
        withCredentials: true
      }
    })

    request.done(function (response) {
      $('#event-registration-form').addClass('display-none')
      $('#event-registration-form-success').removeClass('display-none')
    })

    request.fail(function (xhr, textStatus, errorThrown) {
      if (xhr.status == 500) {
        $('#registration-error').removeClass('display-none')
      }
    })
  })
})