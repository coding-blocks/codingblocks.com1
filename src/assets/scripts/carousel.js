$('.multi-item-carousel').carousel({
    interval: 1000 * 2
});

var MOBILE = 0;
var PC = 1;
var BREAKPOINT = 992;
var currentScreen = -1;
var wasOncePC = false;

function setCurrentSize() {
    if($(this).width() <= BREAKPOINT) {
        return currentScreen = MOBILE;
    } else {
        wasOncePC = true;
        return currentScreen = PC;
    }
}

function setCarousel() {

    if(currentScreen === setCurrentSize())return;

    if(currentScreen === MOBILE) {
        if (wasOncePC) {
            console.log('YOOOO');
            var arr = []
            $('.multi-item-carousel .item .card').each(function (index) {
                if (index % 3 !== 1) {
                    arr.push($(this))
                }
            })

            for (var i=0;i<arr.length;++i) {
                arr[i].remove();
            }
        }
    } else {
        wasOncePC = true
        $('.multi-item-carousel .item').each(function(){
            var next = $(this).next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));

            if (next.next().length > 0) {
                next.next().children(':first-child').clone().appendTo($(this));
            } else {
                $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
            }
        });
    }
}

$(window).resize(setCarousel)
$(document).ready(setCarousel)
