/**
 * Created by championswimmer on 23/01/17.
 */
$(function () {
    $('.nav-container').load('/includes/nav-container.html');
    $('.footer').load('/includes/footer.html', function () {

        // Twitter Feed
        $('.tweets-feed').each(function(index) {
            jQuery(this).attr('id', 'tweets-' + index);
        }).each(function(index) {
            var element = $('#tweets-' + index);
            var TweetConfig = {
                "domId": '',
                "maxTweets": element.attr('data-amount'),
                "enableLinks": true,
                "showUser": true,
                "showTime": true,
                "dateFunction": '',
                "showRetweet": false,
                "customCallback": handleTweets
            };

            if(typeof element.attr('data-widget-id') !== typeof undefined){
                TweetConfig.id = element.attr('data-widget-id');
            }else if(typeof element.attr('data-feed-name') !== typeof undefined && element.attr('data-feed-name') !== "" ){
                TweetConfig.profile = {"screenName": element.attr('data-feed-name').replace('@', '')};
            }else{
                TweetConfig.profile = {"screenName": 'twitter'};
            }

            function handleTweets(tweets) {
                var x = tweets.length;
                var n = 0;
                var element = document.getElementById('tweets-' + index);
                var html = '<ul class="slides">';
                while (n < x) {
                    html += '<li>' + tweets[n] + '</li>';
                    n++;
                }
                html += '</ul>';
                element.innerHTML = html;

                if ($('.tweets-slider').length) {
                    $('.tweets-slider').flexslider({
                        directionNav: false,
                        controlNav: false
                    });
                }
                return html;
            }
            console.log('www');
            twitterFetcher.fetch(TweetConfig);

        });
    });
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-83327907-1', 'auto');
ga('send', 'pageview');