/**
* @Author: ananayarora
* @Date:   2017-07-07T03:20:46+05:30
* @Last modified by:   ananayarora
* @Last modified time: 2017-07-08T18:33:28+05:30
*/



$(document).ready(function(){
    $(".floorbottom").animate({
        'opacity': 1,
    }, function() {
        $(".floor").animate({
            'opacity': 1
        }, function() {
            $(".text").animate({
                'opacity': 1,
                'marginTop': '0px'
            }, function() {
                $("#robot").show();
            });
        });
    });
});
