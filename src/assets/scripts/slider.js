document.addEventListener("DOMContentLoaded", function(event) { 
  const sliderContainer = document.getElementById("slider-container");

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

  const prev = sliderContainer.getElementsByClassName("slideshow-container__prev")[0];
  const next = sliderContainer.getElementsByClassName("slideshow-container__next")[0];

  prev.addEventListener('click', () => {
    plusSlides(-1);
  });
  next.addEventListener('click', () => {
    plusSlides(1);
  });

  [...sliderContainer.getElementsByClassName("dot")].forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentSlide(i)
    });
  })
});
