function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/" + "; domain=.codingblocks.com; SameSite=Lax";
}
function saveUtmParamsToCookie() {
    if (window.location.search) {
        var params = new URLSearchParams(window.location.search);
        var cbutm = {};
        [
            "utm_campaign",
            "utm_source",
            "utm_medium",
            "utm_keyword",
            "utm_content",
            "utm_coupon",
        ].forEach(function (key) {
            if (params.get(key)) {
                cbutm[key] = params.get(key);
            }
        });
        var cookieValue = btoa(JSON.stringify(cbutm));
        setCookie('_cbutm', cookieValue, 7)
    }
}
window.addEventListener("DOMContentLoaded", saveUtmParamsToCookie);
