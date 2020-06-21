$(function(){
  var code = getUrlParameter('c')
  var eventId = code.split('-')[0]
  var slug = code.split('-')[1]

  var event = $.ajax('https://app.codingblocks.com/events/' + eventId, { 
    method: 'GET',
    contentType: 'application/json; charset=UTF-8',
    dataType: "json"
  })

  event.done(function (response) {
    var event = response.event
    if(!event) {
      $('#not-found').removeClass('display-none')
      return 
    }
    if(event.is_registration_closed || event.status === 'unpublished') {
      $('#registrations-closed').removeClass('display-none')
    } else {
      $('.event-registration').removeClass('display-none')
    }
    $('.event-registration .event-banner').attr('src', event.banner)
    $('.event-registration > form').attr('action', 'https://app.codingblocks.com/events/' + code + '/register')
    $('.event-registration > .title').html(event.title)
    $('.event-registration > .about').html(event.about)
    $('.event-registration > .description').html(event.description)
    if(event.is_certificate_event) {
      $('.certificate-note').removeClass('display-none')
    } else {      
      $('.certificate-note').addClass('display-none')
    }    
  })

  event.fail(function (xhr, textStatus, errorThrown) {
    if (xhr.status == 500) {
      $('#not-found').removeClass('display-none')
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