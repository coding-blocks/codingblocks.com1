$(function(){
  triggerTextCollapser()  
})

function triggerTextCollapser() {
  var elements = $(".collapsable-text")

  elements.each(function () {
    var element = $(this)

    if(element.attr('data-triggered') === "true") {
      return
    }

    var wordLimit = null
    element.attr('class').split(" ").forEach(function (className) {
      var match = className.match(/max-words-(\d+)$/)
      if (match) {
        wordLimit = +match[1]
      }
    })

    if (!wordLimit) {
      return
    }

    var words = element.html().trim().split(" ")
    if(words.length <= wordLimit) {
      element.attr('data-triggered', "true")
      return
    }
    var wordsToShow = words.slice(0, wordLimit)
    var wordsToHide = words.slice(wordLimit)

    var html = wordsToShow.join(" ") + " " + '<span class="collapsed-text">' + wordsToHide.join(" ") + '</span>' + '<button class="text-collapser orange" onclick="toggleTextCollapser(this)">&nbsp; View More</button>'
    element.html(html)
    element.find('.collapsed-text').hide()
    element.attr('data-triggered', "true")
  })
}

function toggleTextCollapser(el) {
  var collapser = $(el)

  if (collapser.html() == '&nbsp; View More') {
    collapser.siblings('.collapsed-text').show()
    collapser.html('&nbsp; Hide') 
  } else {
    collapser.siblings('.collapsed-text').hide()
    collapser.html('&nbsp; View More') 
  }
}