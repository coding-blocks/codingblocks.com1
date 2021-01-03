document.addEventListener("DOMContentLoaded", function(event) { 
  var sliderContainer = document.getElementById("slider-container");
  var slideIndex = 1;

  showSlides(slideIndex);
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n + 1);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slideshow-container__slide");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
  }

  var prev = sliderContainer.getElementsByClassName("slideshow-container__prev")[0];
  var next = sliderContainer.getElementsByClassName("slideshow-container__next")[0];

  prev.addEventListener('click', function () {
    plusSlides(-1);
  });
  next.addEventListener('click', function () {
    plusSlides(1);
  });

  new Array(sliderContainer.getElementsByClassName("dot")).forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      currentSlide(i)
    });
  })
});
