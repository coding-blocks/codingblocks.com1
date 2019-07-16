var mr_firstSectionHeight, mr_nav, mr_fixedAt, mr_navOuterHeight, mr_navScrolled = false, mr_navFixed = false,
    mr_outOfSight = false, mr_floatingProjectSections, mr_scrollTop = 0;
var getParameterByName = function (name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var save_data = function () {
    var form_obj = {
        "name" : document.getElementById("ca-form").elements["name"].value,
        "phone" : document.getElementById("ca-form").elements["phone"].value,
        "email" : document.getElementById("ca-form").elements["email"].value,
        "college" : document.getElementById("ca-form").elements["college"].value,
        "state" : document.getElementById("ca-form").elements["state"].value,
        "branch" : document.getElementById("ca-form").elements["branch"].value,
        "year" : document.getElementById("ca-form").elements["year"].value,
        "ex_cb" : document.getElementById("ca-form").elements["ex_cb"].value,
        "ex_vmc" : document.getElementById("ca-form").elements["ex_vmc"].value,
        "facebook_url" : document.getElementById("ca-form").elements["facebook_url"].value,
        "other_profiles" : document.getElementById("ca-form").elements["other_profiles"].value,
        "better_fit" : document.getElementById("ca-form").elements["better_fit"].value,
        "marketing_idea" : document.getElementById("ca-form").elements["marketing_idea"].value,
        "additional_info" : document.getElementById("ca-form").elements["additional_info"].value
    };
    localStorage.setItem("ca-form", JSON.stringify(form_obj));
};

var set_and_delete_data = function(flag) {
  var form_obj = JSON.parse(localStorage.getItem("ca-form"));
  if(flag) {
     document.getElementById("ca-form").elements["name"].value = form_obj.name;
     document.getElementById("ca-form").elements["phone"].value = form_obj.phone;
     document.getElementById("ca-form").elements["email"].value = form_obj.email;
     document.getElementById("ca-form").elements["college"].value = form_obj.college;
     document.getElementById("ca-form").elements["state"].value = form_obj.state;
     document.getElementById("ca-form").elements["branch"].value = form_obj.branch;
     document.getElementById("ca-form").elements["year"].value = form_obj.year;
     document.getElementById("ca-form").elements["facebook_url"].value = form_obj.facebook_url;
     document.getElementById("ca-form").elements["other_profiles"].value = form_obj.other_profiles;
     document.getElementById("ca-form").elements["better_fit"].value = form_obj.better_fit;
     document.getElementById("ca-form").elements["marketing_idea"].value = form_obj.marketing_idea;
     document.getElementById("ca-form").elements["additional_info"].value = form_obj.additional_info;
     document.getElementById("ca-form").elements["ex_vmc"].checked = form_obj.ex_vmc;
     document.getElementById("ca-form").elements["ex_cb"].checked = form_obj.ex_cb;
  }
  localStorage.removeItem("ca-form");
}

$(document).ready(function () {
    "use strict";
    var innerLinks = $("a.inner-link");
    var success = getParameterByName('success') == 1;
    var error = getParameterByName('error') == 1;
    var emailError = getParameterByName('error') == 2;

    if(success) {
        set_and_delete_data(!success);
        $('#success').removeClass("display-none");
        $('#success').addClass('color-primary');
    } else if(emailError) {
        set_and_delete_data(error);
        $('#emailError').removeClass("display-none");
        $('#emailError').addClass('color-primary');
    } else if(error) {
        set_and_delete_data(error);
        $('#error').removeClass("display-none");
        $('#error').addClass('color-primary');
    } 
    if (innerLinks.length) {
        innerLinks.each(function () {
            var link = $(this);
            var href = link.attr("href");
            if (href.charAt(0) !== "#") {
                link.removeClass("inner-link")
            }
        });
        var offset = 0;
        if ($("body[data-smooth-scroll-offset]").length) {
            offset = $("body").attr("data-smooth-scroll-offset");
            offset = offset * 1
        }
        smoothScroll.init({
            selector: ".inner-link",
            selectorHeader: null,
            speed: 750,
            easing: "easeInOutCubic",
            offset: offset
        })
    }
    addEventListener("scroll", function () {
        mr_scrollTop = window.pageYOffset
    }, false);
    $(".background-image-holder").each(function () {
        var imgSrc = $(this).children("img").attr("src");
        $(this).css("background", 'url("' + imgSrc + '")');
        $(this).children("img").hide();
        $(this).css("background-position", "initial")
    });
    setTimeout(function () {
        $(".background-image-holder").each(function () {
            $(this).addClass("fadeIn")
        })
    }, 200);
    $('[data-toggle="tooltip"]').tooltip();
    $("ul[data-bullet]").each(function () {
        var bullet = $(this).attr("data-bullet");
        $(this).find("li").prepend('<i class="' + bullet + '"></i>')
    });
    $(".progress-bar").each(function () {
        $(this).css("width", $(this).attr("data-progress") + "%")
    });
    if (!$("nav").hasClass("fixed") && !$("nav").hasClass("absolute")) {
        $(".nav-container").css("min-height", $("nav").outerHeight(true));
        $(window).resize(function () {
            $(".nav-container").css("min-height", $("nav").outerHeight(true))
        });
        if ($(window).width() > 768) {
            $(".parallax:nth-of-type(1) .background-image-holder").css("top", -$("nav").outerHeight(true))
        }
        if ($(window).width() > 768) {
            $("section.fullscreen:nth-of-type(1)").css("height", $(window).height() - $("nav").outerHeight(true))
        }
    } else {
        $("body").addClass("nav-is-overlay")
    }
    if ($("nav").hasClass("bg-dark")) {
        $(".nav-container").addClass("bg-dark")
    }
    mr_nav = $("body .nav-container nav:first");
    mr_navOuterHeight = $("body .nav-container nav:first").outerHeight();
    mr_fixedAt = typeof mr_nav.attr("data-fixed-at") !== typeof undefined ? parseInt(mr_nav.attr("data-fixed-at").replace("px", "")) : parseInt($("section:nth-of-type(1)").outerHeight());
    window.addEventListener("scroll", updateNav, false);
    $(".menu > li > ul").each(function () {
        var menu = $(this).offset();
        var farRight = menu.left + $(this).outerWidth(true);
        if (farRight > $(window).width() && !$(this).hasClass("mega-menu")) {
            $(this).addClass("make-right")
        } else if (farRight > $(window).width() && $(this).hasClass("mega-menu")) {
            var isOnScreen = $(window).width() - menu.left;
            var difference = $(this).outerWidth(true) - isOnScreen;
            $(this).css("margin-left", -difference)
        }
    });
    $(".mobile-toggle").click(function () {
        $(".nav-bar").toggleClass("nav-open");
        $(this).toggleClass("active")
    });
    $(".menu li").click(function (e) {
        if (!e) e = window.event;
        e.stopPropagation();
        if ($(this).find("ul").length) {
            $(this).toggleClass("toggle-sub")
        } else {
            $(this).parents(".toggle-sub").removeClass("toggle-sub")
        }
    });
    $(".menu li a").click(function () {
        if ($(this).hasClass("inner-link")) {
            $(this).closest(".nav-bar").removeClass("nav-open")
        }
    });
    $(".module.widget-handle").click(function () {
        $(this).toggleClass("toggle-widget-handle")
    });
    $(".search-widget-handle .search-form input").click(function (e) {
        if (!e) e = window.event;
        e.stopPropagation()
    });
    if ($(".offscreen-toggle").length) {
        $("body").addClass("has-offscreen-nav")
    } else {
        $("body").removeClass("has-offscreen-nav")
    }
    $(".offscreen-toggle").click(function () {
        $(".main-container").toggleClass("reveal-nav");
        $("nav").toggleClass("reveal-nav");
        $(".offscreen-container").toggleClass("reveal-nav")
    });
    $(".main-container").click(function () {
        if ($(this).hasClass("reveal-nav")) {
            $(this).removeClass("reveal-nav");
            $(".offscreen-container").removeClass("reveal-nav");
            $("nav").removeClass("reveal-nav")
        }
    });
    $(".offscreen-container a").click(function () {
        $(".offscreen-container").removeClass("reveal-nav");
        $(".main-container").removeClass("reveal-nav");
        $("nav").removeClass("reveal-nav")
    });
    $(".projects").each(function () {
        var filters = "";
        $(this).find(".project").each(function () {
            var filterTags = $(this).attr("data-filter").split(",");
            filterTags.forEach(function (tagName) {
                if (filters.indexOf(tagName) == -1) {
                    filters += '<li data-filter="' + tagName + '">' + capitaliseFirstLetter(tagName) + "</li>"
                }
            });
            $(this).closest(".projects").find("ul.filters").empty().append('<li data-filter="all" class="active">All</li>').append(filters)
        })
    });
    $(".filters li").click(function () {
        var filter = $(this).attr("data-filter");
        $(this).closest(".filters").find("li").removeClass("active");
        $(this).addClass("active");
        $(this).closest(".projects").find(".project").each(function () {
            var filters = $(this).attr("data-filter");
            if (filters.indexOf(filter) == -1) {
                $(this).addClass("inactive")
            } else {
                $(this).removeClass("inactive")
            }
        });
        if (filter == "all") {
            $(this).closest(".projects").find(".project").removeClass("inactive")
        }
    });
    if ($(".slider-all-controls, .slider-paging-controls, .slider-arrow-controls, .slider-thumb-controls, .logo-carousel").length) {
        $(".slider-all-controls").flexslider({
            start: function (slider) {
                if (slider.find(".slides li:first-child").find(".fs-vid-background video").length) {
                    slider.find(".slides li:first-child").find(".fs-vid-background video").get(0).play()
                }
            }, after: function (slider) {
                if (slider.find(".fs-vid-background video").length) {
                    if (slider.find("li:not(.flex-active-slide)").find(".fs-vid-background video").length) {
                        slider.find("li:not(.flex-active-slide)").find(".fs-vid-background video").get(0).pause()
                    }
                    if (slider.find(".flex-active-slide").find(".fs-vid-background video").length) {
                        slider.find(".flex-active-slide").find(".fs-vid-background video").get(0).play()
                    }
                }
            }
        });
        $(".slider-paging-controls").flexslider({animation: "slide", directionNav: false});
        $(".slider-arrow-controls").flexslider({controlNav: false});
        $(".slider-thumb-controls .slides li").each(function () {
            var imgSrc = $(this).find("img").attr("src");
            $(this).attr("data-thumb", imgSrc)
        });
        $(".slider-thumb-controls").flexslider({animation: "slide", controlNav: "thumbnails", directionNav: true});
        $(".logo-carousel").flexslider({
            minItems: 1,
            maxItems: 4,
            move: 1,
            itemWidth: 200,
            itemMargin: 0,
            animation: "slide",
            slideshow: true,
            slideshowSpeed: 3e3,
            directionNav: false,
            controlNav: false
        })
    }
    $(".lightbox-grid li a").each(function () {
        var galleryTitle = $(this).closest(".lightbox-grid").attr("data-gallery-title");
        $(this).attr("data-lightbox", galleryTitle)
    });
    $("iframe[data-provider]").each(function () {
        var provider = jQuery(this).attr("data-provider");
        var videoID = jQuery(this).attr("data-video-id");
        var autoplay = jQuery(this).attr("data-autoplay");
        var vidURL = "";
        if (provider == "vimeo") {
            vidURL = "http://player.vimeo.com/video/" + videoID + "?badge=0&title=0&byline=0&title=0&autoplay=" + autoplay;
            $(this).attr("data-src", vidURL)
        } else if (provider == "youtube") {
            vidURL = "https://www.youtube.com/embed/" + videoID + "?showinfo=0&autoplay=" + autoplay;
            $(this).attr("data-src", vidURL)
        } else {
            console.log("Only Vimeo and Youtube videos are supported at this time")
        }
    });
    jQuery(".foundry_modal[modal-link]").remove();
    if ($(".foundry_modal").length && !jQuery(".modal-screen").length) {
        var modalScreen = jQuery("<div />").addClass("modal-screen").appendTo("body")
    }
    jQuery(".foundry_modal").click(function () {
        jQuery(this).addClass("modal-acknowledged")
    });
    jQuery(document).on("wheel mousewheel scroll", ".foundry_modal, .modal-screen", function (evt) {
        $(this).get(0).scrollTop += evt.originalEvent.deltaY;
        return false
    });
    $(".modal-container:not([modal-link])").each(function (index) {
        if (jQuery(this).find("iframe[src]").length) {
            jQuery(this).find(".foundry_modal").addClass("iframe-modal");
            var iframe = jQuery(this).find("iframe");
            iframe.attr("data-src", iframe.attr("src"));
            iframe.attr("src", "")
        }
        jQuery(this).find(".btn-modal").attr("modal-link", index);
        if (!jQuery('.foundry_modal[modal-link="' + index + '"]').length) {
            jQuery(this).find(".foundry_modal").clone().appendTo("body").attr("modal-link", index).prepend(jQuery('<i class="ti-close close-modal">'))
        }
    });
    $(".btn-modal").unbind("click").click(function () {
        var linkedModal = jQuery('.foundry_modal[modal-link="' + jQuery(this).attr("modal-link") + '"]'),
            autoplayMsg = "";
        jQuery(".modal-screen").toggleClass("reveal-modal");
        if (linkedModal.find("iframe").length) {
            if (linkedModal.find("iframe").attr("data-autoplay") === "1") {
                var autoplayMsg = "&autoplay=1"
            }
            linkedModal.find("iframe").attr("src", linkedModal.find("iframe").attr("data-src") + autoplayMsg)
        }
        if (linkedModal.find("video").length) {
            linkedModal.find("video").get(0).play()
        }
        linkedModal.toggleClass("reveal-modal");
        return false
    });
    $(".foundry_modal[data-time-delay]").each(function () {
        var modal = $(this);
        var delay = modal.attr("data-time-delay");
        modal.prepend($('<i class="ti-close close-modal">'));
        if (typeof modal.attr("data-cookie") != "undefined") {
            if (!mr_cookies.hasItem(modal.attr("data-cookie"))) {
                setTimeout(function () {
                    modal.addClass("reveal-modal");
                    $(".modal-screen").addClass("reveal-modal")
                }, delay)
            }
        } else {
            setTimeout(function () {
                modal.addClass("reveal-modal");
                $(".modal-screen").addClass("reveal-modal")
            }, delay)
        }
    });
    $(".foundry_modal[data-show-on-exit]").each(function () {
        var modal = $(this);
        var exitSelector = $(modal.attr("data-show-on-exit"));
        if ($(exitSelector).length) {
            modal.prepend($('<i class="ti-close close-modal">'));
            $(document).on("mouseleave", exitSelector, function () {
                if (!$("body .reveal-modal").length) {
                    if (typeof modal.attr("data-cookie") !== typeof undefined) {
                        if (!mr_cookies.hasItem(modal.attr("data-cookie"))) {
                            modal.addClass("reveal-modal");
                            $(".modal-screen").addClass("reveal-modal")
                        }
                    } else {
                        modal.addClass("reveal-modal");
                        $(".modal-screen").addClass("reveal-modal")
                    }
                }
            })
        }
    });
    $(".foundry_modal[data-hide-after]").each(function () {
        var modal = $(this);
        var delay = modal.attr("data-hide-after");
        if (typeof modal.attr("data-cookie") != "undefined") {
            if (!mr_cookies.hasItem(modal.attr("data-cookie"))) {
                setTimeout(function () {
                    if (!modal.hasClass("modal-acknowledged")) {
                        modal.removeClass("reveal-modal");
                        $(".modal-screen").removeClass("reveal-modal")
                    }
                }, delay)
            }
        } else {
            setTimeout(function () {
                if (!modal.hasClass("modal-acknowledged")) {
                    modal.removeClass("reveal-modal");
                    $(".modal-screen").removeClass("reveal-modal")
                }
            }, delay)
        }
    });
    jQuery(".close-modal:not(.modal-strip .close-modal)").unbind("click").click(function () {
        var modal = jQuery(this).closest(".foundry_modal");
        modal.toggleClass("reveal-modal");
        if (typeof modal.attr("data-cookie") !== "undefined") {
            mr_cookies.setItem(modal.attr("data-cookie"), "true", Infinity)
        }
        if (modal.find("iframe").length) {
            modal.find("iframe").attr("src", "")
        }
        jQuery(".modal-screen").removeClass("reveal-modal")
    });
    jQuery(".modal-screen").unbind("click").click(function () {
        if (jQuery(".foundry_modal.reveal-modal").find("iframe").length) {
            jQuery(".foundry_modal.reveal-modal").find("iframe").attr("src", "")
        }
        jQuery(".foundry_modal.reveal-modal").toggleClass("reveal-modal");
        jQuery(this).toggleClass("reveal-modal")
    });
    jQuery(document).keyup(function (e) {
        if (e.keyCode == 27) {
            if (jQuery(".foundry_modal").find("iframe").length) {
                jQuery(".foundry_modal").find("iframe").attr("src", "")
            }
            jQuery(".foundry_modal").removeClass("reveal-modal");
            jQuery(".modal-screen").removeClass("reveal-modal")
        }
    });
    jQuery(".modal-strip").each(function () {
        if (!jQuery(this).find(".close-modal").length) {
            jQuery(this).append(jQuery('<i class="ti-close close-modal">'))
        }
        var modal = jQuery(this);
        if (typeof modal.attr("data-cookie") != "undefined") {
            if (!mr_cookies.hasItem(modal.attr("data-cookie"))) {
                setTimeout(function () {
                    modal.addClass("reveal-modal")
                }, 1e3)
            }
        } else {
            setTimeout(function () {
                modal.addClass("reveal-modal")
            }, 1e3)
        }
    });
    jQuery(".modal-strip .close-modal").click(function () {
        var modal = jQuery(this).closest(".modal-strip");
        if (typeof modal.attr("data-cookie") != "undefined") {
            mr_cookies.setItem(modal.attr("data-cookie"), "true", Infinity)
        }
        jQuery(this).closest(".modal-strip").removeClass("reveal-modal");
        return false
    });
    jQuery(".close-iframe").click(function () {
        jQuery(this).closest(".modal-video").removeClass("reveal-modal");
        jQuery(this).siblings("iframe").attr("src", "");
        jQuery(this).siblings("video").get(0).pause()
    });
    $(".checkbox-option").on("click", function () {
        $(this).toggleClass("checked");
        var checkbox = $(this).find("input");
        if (checkbox.prop("checked") === false) {
            checkbox.prop("checked", true)
        } else {
            checkbox.prop("checked", false)
        }
    });
    $(".radio-option").click(function () {
        var checked = $(this).hasClass("checked");
        var name = $(this).find("input").attr("name");
        if (!checked) {
            $('input[name="' + name + '"]').parent().removeClass("checked");
            $(this).addClass("checked");
            $(this).find("input").prop("checked", true)
        }
    });
    $(".accordion li").click(function () {
        if ($(this).closest(".accordion").hasClass("one-open")) {
            $(this).closest(".accordion").find("li").removeClass("active");
            $(this).addClass("active")
        } else {
            $(this).toggleClass("active")
        }
        if (typeof window.mr_parallax !== "undefined") {
            setTimeout(mr_parallax.windowLoad, 500)
        }
    });
    $(".tabbed-content").each(function () {
        $(this).append('<ul class="content"></ul>')
    });
    $(".tabs li").each(function () {
        var originalTab = $(this), activeClass = "";
        if (originalTab.is(".tabs>li:first-child")) {
            activeClass = ' class="active"'
        }
        var tabContent = originalTab.find(".tab-content").detach().wrap("<li" + activeClass + "></li>").parent();
        originalTab.closest(".tabbed-content").find(".content").append(tabContent)
    });
    $(".tabs li").click(function () {
        $(this).closest(".tabs").find("li").removeClass("active");
        $(this).addClass("active");
        var liIndex = $(this).index() + 1;
        $(this).closest(".tabbed-content").find(".content>li").removeClass("active");
        $(this).closest(".tabbed-content").find(".content>li:nth-of-type(" + liIndex + ")").addClass("active")
    });
    $("section").closest("body").find(".local-video-container .play-button").click(function () {
        $(this).siblings(".background-image-holder").removeClass("fadeIn");
        $(this).siblings(".background-image-holder").css("z-index", -1);
        $(this).css("opacity", 0);
        $(this).siblings("video").get(0).play()
    });
    $("section").closest("body").find(".player").each(function () {
        var section = $(this).closest("section");
        section.find(".container").addClass("fadeOut");
        var src = $(this).attr("data-video-id");
        var startat = $(this).attr("data-start-at");
        $(this).attr("data-property", "{videoURL:'http://youtu.be/" + src + "',containment:'self',autoPlay:true, mute:true, startAt:" + startat + ", opacity:1, showControls:false}")
    });
    if ($(".player").length) {
        $(".player").each(function () {
            var section = $(this).closest("section");
            var player = section.find(".player");
            player.YTPlayer();
            player.on("YTPStart", function (e) {
                section.find(".container").removeClass("fadeOut");
                section.find(".masonry-loader").addClass("fadeOut")
            })
        })
    }
    $(".map-holder").click(function () {
        $(this).addClass("interact")
    });
    if ($(".map-holder").length) {
        $(window).scroll(function () {
            if ($(".map-holder.interact").length) {
                $(".map-holder.interact").removeClass("interact")
            }
        })
    }
    if ($(".countdown").length) {
        $(".countdown").each(function () {
            var date = $(this).attr("data-date");
            $(this).countdown(date, function (event) {
                $(this).text(event.strftime("%D days %H:%M:%S"))
            })
        })
    }
    $("form.form-email, form.form-newsletter").submit(function (e) {
        if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
        var thisForm = $(this).closest("form.form-email, form.form-newsletter"),
            submitButton = thisForm.find('button[type="submit"]'), error = 0,
            originalError = thisForm.attr("original-error"), preparedForm, iFrame, userEmail, userFullName,
            userFirstName, userLastName, successRedirect, formError, formSuccess;
        iFrame = $(thisForm).find("iframe.mail-list-form");
        thisForm.find(".form-error, .form-success").remove();
        submitButton.attr("data-text", submitButton.text());
        thisForm.append('<div class="form-error" style="display: none;">' + thisForm.attr("data-error") + "</div>");
        thisForm.append('<div class="form-success" style="display: none;">' + thisForm.attr("data-success") + "</div>");
        formError = thisForm.find(".form-error");
        formSuccess = thisForm.find(".form-success");
        thisForm.addClass("attempted-submit");
        if (iFrame.length && typeof iFrame.attr("srcdoc") !== "undefined" && iFrame.attr("srcdoc") !== "") {
            console.log("Mail list form signup detected.");
            if (typeof originalError !== typeof undefined && originalError !== false) {
                formError.html(originalError)
            }
            userEmail = $(thisForm).find(".signup-email-field").val();
            userFullName = $(thisForm).find(".signup-name-field").val();
            if ($(thisForm).find("input.signup-first-name-field").length) {
                userFirstName = $(thisForm).find("input.signup-first-name-field").val()
            } else {
                userFirstName = $(thisForm).find(".signup-name-field").val()
            }
            userLastName = $(thisForm).find(".signup-last-name-field").val();
            if (validateFields(thisForm) !== 1) {
                preparedForm = prepareSignup(iFrame);
                preparedForm.find("#mce-EMAIL, #fieldEmail").val(userEmail);
                preparedForm.find("#mce-LNAME, #fieldLastName").val(userLastName);
                preparedForm.find("#mce-FNAME, #fieldFirstName").val(userFirstName);
                preparedForm.find("#mce-NAME, #fieldName").val(userFullName);
                thisForm.removeClass("attempted-submit");
                formError.fadeOut(200);
                submitButton.html(jQuery("<div />").addClass("form-loading")).attr("disabled", "disabled");
                try {
                    $.ajax({
                        url: preparedForm.attr("action"),
                        crossDomain: true,
                        data: preparedForm.serialize(),
                        method: "GET",
                        cache: false,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            if (data.result != "success" && data.Status != 200) {
                                formError.attr("original-error", formError.text());
                                formError.html(data.msg).fadeIn(1e3);
                                formSuccess.fadeOut(1e3);
                                submitButton.html(submitButton.attr("data-text")).removeAttr("disabled")
                            } else {
                                submitButton.html(submitButton.attr("data-text")).removeAttr("disabled");
                                successRedirect = thisForm.attr("success-redirect");
                                if (typeof successRedirect !== typeof undefined && successRedirect !== false && successRedirect !== "") {
                                    window.location = successRedirect
                                }
                                thisForm.find('input[type="text"]').val("");
                                thisForm.find("textarea").val("");
                                formSuccess.fadeIn(1e3);
                                formError.fadeOut(1e3);
                                setTimeout(function () {
                                    formSuccess.fadeOut(500)
                                }, 5e3)
                            }
                        }
                    })
                } catch (err) {
                    formError.attr("original-error", formError.text());
                    formError.html(err.message).fadeIn(1e3);
                    formSuccess.fadeOut(1e3);
                    setTimeout(function () {
                        formError.fadeOut(500)
                    }, 5e3);
                    submitButton.html(submitButton.attr("data-text")).removeAttr("disabled")
                }
            } else {
                formError.fadeIn(1e3);
                setTimeout(function () {
                    formError.fadeOut(500)
                }, 5e3)
            }
        } else {
            if (typeof originalError !== typeof undefined && originalError !== false) {
                formError.text(originalError)
            }
            error = validateFields(thisForm);
            if (error === 1) {
                formError.fadeIn(200);
                setTimeout(function () {
                    formError.fadeOut(500)
                }, 3e3)
            } else {
                thisForm.removeClass("attempted-submit");
                formError.fadeOut(200);
                submitButton.html(jQuery("<div />").addClass("form-loading")).attr("disabled", "disabled");
                var host;
                var url;
                switch (thisForm.attr("id")) {
                    case"message-form":
                        console.log("Send message form detected.");
                        url = "/mail/send";
                        break;
                    case"signup-form":
                        console.log("Send signup form detected.");
                        url = "/api/signup";
                        break;
                    case"signup-taarangana":
                        console.log("Send event form detected.");
                        url = "/api/event_signup";
                        break;
                    case"job_signup":
                        console.log("Send event form detected.");
                        url = "/api/job_signup";
                        break;
                    case"startup_signup":
                        console.log("Send event form detected.");
                        url = "/api/startup_signup";
                        break;
                    case"projects":
                        console.log("Send event form detected.");
                        url = "/api/projects";
                        break
                }
                if (true) {
                    host = "https://cbcom.codingblocks.com"
                } else {
                    host = "http://localhost:3000";
                    console.log("form data = " + thisForm.serialize())
                }
                console.log("url = " + url);
                jQuery.ajax({
                    type: "POST",
                    url: host + url,
                    data: thisForm.serialize() + "&url=" + window.location.href,
                    success: function (response) {
                        submitButton.html(submitButton.attr("data-text")).removeAttr("disabled");
                        console.log("response = " + response);
                        if (response == "OK") {
                            successRedirect = thisForm.attr("success-redirect");
                            if (typeof successRedirect !== typeof undefined && successRedirect !== false && successRedirect !== "") {
                                window.location = successRedirect
                            }
                            thisForm.find('input[type="text"]').val("");
                            thisForm.find("textarea").val("");
                            thisForm.find(".form-success").fadeIn(1e3);
                            formError.fadeOut(1e3);
                            setTimeout(function () {
                                formSuccess.fadeOut(500)
                            }, 5e3)
                        } else {
                            formError.attr("original-error", formError.text());
                            formError.text(response).fadeIn(1e3);
                            formSuccess.fadeOut(1e3)
                        }
                    },
                    error: function (errorObject, errorText, errorHTTP) {
                        formError.attr("original-error", formError.text());
                        formError.text(errorHTTP).fadeIn(1e3);
                        formSuccess.fadeOut(1e3);
                        submitButton.html(submitButton.attr("data-text")).removeAttr("disabled")
                    }
                })
            }
        }
        return false
    });
    $(".validate-required, .validate-email").on("blur change", function () {
        validateFields($(this).closest("form"))
    });
    $("form").each(function () {
        if ($(this).find(".form-error").length) {
            $(this).attr("original-error", $(this).find(".form-error").text())
        }
    });

    function validateFields(form) {
        var name, error, originalErrorMessage;
        $(form).find('.validate-required[type="checkbox"]').each(function () {
            if (!$('[name="' + $(this).attr("name") + '"]:checked').length) {
                error = 1;
                name = $(this).attr("name").replace("[]", "");
                form.find(".form-error").text("Please tick at least one " + name + " box.")
            }
        });
        $(form).find(".validate-required").each(function () {
            if ($(this).val() === "") {
                $(this).addClass("field-error");
                error = 1
            } else {
                $(this).removeClass("field-error")
            }
        });
        $(form).find(".validate-email").each(function () {
            if (!/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val())) {
                $(this).addClass("field-error");
                error = 1
            } else {
                $(this).removeClass("field-error")
            }
        });
        $(form).find(".validate-tel").each(function () {
            if (!/^([7-9])\d{9}$/.test($(this).val())) {
                $(this).addClass("field-error");
                form.find(".form-error").text("Enter a valid phone number without +91 or 0");
                error = 1
            } else {
                $(this).removeClass("field-error")
            }
        });
        $(form).find(".validate-text-only-letters").each(function () {
            if (!/^([A-Za-z ]+)$/.test($(this).val())) {
                $(this).addClass("field-error");
                error = 1
            } else {
                $(this).removeClass("field-error")
            }
        });
        if (!form.find(".field-error").length) {
            form.find(".form-error").fadeOut(1e3)
        }
        return error
    }

    if (getURLParameter("ref")) {
        $("form.form-email").append('<input type="text" name="referrer" class="hidden" value="' + getURLParameter("ref") + '"/>')
    }

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
    }

    if (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)) {
        $("section").removeClass("parallax")
    }
    if ($(".disqus-comments").length) {
        var disqus_shortname = $(".disqus-comments").attr("data-shortname");
        (function () {
            var dsq = document.createElement("script");
            dsq.type = "text/javascript";
            dsq.async = true;
            dsq.src = "//" + disqus_shortname + ".disqus.com/embed.js";
            (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(dsq)
        })()
    }
    if (document.querySelector("[data-maps-api-key]") && !document.querySelector(".gMapsAPI")) {
        if ($("[data-maps-api-key]").length) {
            var script = document.createElement("script");
            var apiKey = $("[data-maps-api-key]:first").attr("data-maps-api-key");
            script.type = "text/javascript";
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD9miWyXZzVoL5wLraLJPrQJICNKRAa6Vs&callback=initializeMaps";
            script.className = "gMapsAPI";
            document.body.appendChild(script)
        }
    }
    (function () {
        var widget_id = "mm3xh9v8wk";
        var d = document;
        var w = window;

        function l() {
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "//code.jivosite.com/script/widget/" + widget_id;
            var ss = document.getElementsByTagName("script")[0];
            ss.parentNode.insertBefore(s, ss)
        }

        if (d.readyState == "complete") {
            l()
        } else {
            if (w.attachEvent) {
                w.attachEvent("onload", l)
            } else {
                w.addEventListener("load", l, false)
            }
        }
    })()
});
$(window).load(function () {
    "use strict";
    setTimeout(initializeMasonry, 1e3);
    mr_firstSectionHeight = $(".main-container section:nth-of-type(1)").outerHeight(true)
});

function updateNav() {
    var scrollY = mr_scrollTop;
    if (scrollY <= 0) {
        if (mr_navFixed) {
            mr_navFixed = false;
            mr_nav.removeClass("fixed")
        }
        if (mr_outOfSight) {
            mr_outOfSight = false;
            mr_nav.removeClass("outOfSight")
        }
        if (mr_navScrolled) {
            mr_navScrolled = false;
            mr_nav.removeClass("scrolled")
        }
        return
    }
    if (scrollY > mr_navOuterHeight + mr_fixedAt) {
        if (!mr_navScrolled) {
            mr_nav.addClass("scrolled");
            mr_navScrolled = true;
            return
        }
    } else {
        if (scrollY > mr_navOuterHeight) {
            if (!mr_navFixed) {
                mr_nav.addClass("fixed");
                mr_navFixed = true
            }
            if (scrollY > mr_navOuterHeight + 10) {
                if (!mr_outOfSight) {
                    mr_nav.addClass("outOfSight");
                    mr_outOfSight = true
                }
            } else {
                if (mr_outOfSight) {
                    mr_outOfSight = false;
                    mr_nav.removeClass("outOfSight")
                }
            }
        } else {
            if (mr_navFixed) {
                mr_navFixed = false;
                mr_nav.removeClass("fixed")
            }
            if (mr_outOfSight) {
                mr_outOfSight = false;
                mr_nav.removeClass("outOfSight")
            }
        }
        if (mr_navScrolled) {
            mr_navScrolled = false;
            mr_nav.removeClass("scrolled")
        }
    }
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

function initializeMasonry() {
    $(".masonry").each(function () {
        var container = $(this).get(0);
        var msnry = new Masonry(container, {itemSelector: ".masonry-item"});
        msnry.on("layoutComplete", function () {
            mr_firstSectionHeight = $(".main-container section:nth-of-type(1)").outerHeight(true);
            if ($(".filters.floating").length) {
                setupFloatingProjectFilters();
                updateFloatingFilters();
                window.addEventListener("scroll", updateFloatingFilters, false)
            }
            $(".masonry").addClass("fadeIn");
            $(".masonry-loader").addClass("fadeOut");
            if ($(".masonryFlyIn").length) {
                masonryFlyIn()
            }
        });
        msnry.layout()
    })
}

function masonryFlyIn() {
    var $items = $(".masonryFlyIn .masonry-item");
    var time = 0;
    $items.each(function () {
        var item = $(this);
        setTimeout(function () {
            item.addClass("fadeIn")
        }, time);
        time += 170
    })
}

function setupFloatingProjectFilters() {
    mr_floatingProjectSections = [];
    $(".filters.floating").closest("section").each(function () {
        var section = $(this);
        mr_floatingProjectSections.push({
            section: section.get(0),
            outerHeight: section.outerHeight(),
            elemTop: section.offset().top,
            elemBottom: section.offset().top + section.outerHeight(),
            filters: section.find(".filters.floating"),
            filersHeight: section.find(".filters.floating").outerHeight(true)
        })
    })
}

function updateFloatingFilters() {
    var l = mr_floatingProjectSections.length;
    while (l--) {
        var section = mr_floatingProjectSections[l];
        if (section.elemTop < mr_scrollTop && typeof window.mr_variant == "undefined") {
            section.filters.css({position: "fixed", top: "16px", bottom: "auto"});
            if (mr_navScrolled) {
                section.filters.css({transform: "translate3d(-50%,48px,0)"})
            }
            if (mr_scrollTop > section.elemBottom - 70) {
                section.filters.css({position: "absolute", bottom: "16px", top: "auto"});
                section.filters.css({transform: "translate3d(-50%,0,0)"})
            }
        } else {
            section.filters.css({position: "absolute", transform: "translate3d(-50%,0,0)"})
        }
    }
}

window.initializeMaps = function () {
    if (typeof google !== "undefined") {
        if (typeof google.maps !== "undefined") {
            $(".map-canvas[data-maps-api-key]").each(function () {
                var mapInstance = this,
                    mapJSON = typeof $(this).attr("data-map-style") !== "undefined" ? $(this).attr("data-map-style") : false,
                    mapStyle = JSON.parse(mapJSON) || [{
                        featureType: "landscape",
                        stylers: [{saturation: -100}, {lightness: 65}, {visibility: "on"}]
                    }, {
                        featureType: "poi",
                        stylers: [{saturation: -100}, {lightness: 51}, {visibility: "simplified"}]
                    }, {
                        featureType: "road.highway",
                        stylers: [{saturation: -100}, {visibility: "simplified"}]
                    }, {
                        featureType: "road.arterial",
                        stylers: [{saturation: -100}, {lightness: 30}, {visibility: "on"}]
                    }, {
                        featureType: "road.local",
                        stylers: [{saturation: -100}, {lightness: 40}, {visibility: "on"}]
                    }, {
                        featureType: "transit",
                        stylers: [{saturation: -100}, {visibility: "simplified"}]
                    }, {featureType: "administrative.province", stylers: [{visibility: "off"}]}, {
                        featureType: "water",
                        elementType: "labels",
                        stylers: [{visibility: "on"}, {lightness: -25}, {saturation: -100}]
                    }, {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{hue: "#ffff00"}, {lightness: -25}, {saturation: -97}]
                    }],
                    zoomLevel = typeof $(this).attr("data-map-zoom") !== "undefined" && $(this).attr("data-map-zoom") !== "" ? $(this).attr("data-map-zoom") * (window.innerHeight < 768 ? 0.9 : 1) : 17,
                    latlong = typeof $(this).attr("data-latlong") != "undefined" ? $(this).attr("data-latlong").split(";") : [""],
                    latitude = [],
                    longitude = [],
                    geocoder = new google.maps.Geocoder,
                    address = typeof $(this).attr("data-address") !== "undefined" ? $(this).attr("data-address").split(";") : [""],
                    markerTitle = "We Are Here", isDraggable = $(document).width() > 766 ? true : false, map, marker,
                    markerImage, mapOptions = {
                        draggable: isDraggable,
                        scrollwheel: false,
                        zoom: zoomLevel,
                        disableDefaultUI: false,
                        styles: mapStyle
                    };
                latlong.forEach(function (currlatlong) {
                    latitude.push(currlatlong ? 1 * currlatlong.substr(0, currlatlong.indexOf(",")) : false)
                    longitude.push(currlatlong ? 1 * currlatlong.substr(currlatlong.indexOf(",") + 1) : false)
                })
                if ($(this).attr("data-marker-title") != undefined && $(this).attr("data-marker-title") != "") {
                    markerTitle = $(this).attr("data-marker-title")
                }
                if (address != undefined && address[0] != "") {
                    geocoder.geocode({address: address[0].replace("[nomarker]", "")}, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            var map = new google.maps.Map(mapInstance, mapOptions);
                            map.setCenter(results[0].geometry.location);
                            address.forEach(function (address) {
                                var markerGeoCoder;
                                markerImage = {
                                    url: "/assets/images/cb/cb_marker.png",
                                    scaledSize: new google.maps.Size(60, 100),
                                    origin: new google.maps.Point(0, 0)
                                };
                                if (/(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)/.test(address)) {
                                    var latlong = address.split(","), marker = new google.maps.Marker({
                                        position: {
                                            lat: 1 * latlong[0],
                                            lng: 1 * latlong[1]
                                        }, map: map, icon: markerImage, title: markerTitle, optimised: false
                                    })
                                } else if (address.indexOf("[nomarker]") < 0) {
                                    markerGeoCoder = new google.maps.Geocoder;
                                    markerGeoCoder.geocode({address: address.replace("[nomarker]", "")}, function (results, status) {
                                        if (status == google.maps.GeocoderStatus.OK) {
                                            marker = new google.maps.Marker({
                                                map: map,
                                                icon: markerImage,
                                                title: markerTitle,
                                                position: results[0].geometry.location,
                                                optimised: false
                                            })
                                        }
                                    })
                                }
                            })
                        } else {
                            console.log("There was a problem geocoding the address.")
                        }
                    })
                } else if (latitude.length > 0 && longitude.length > 0){
                    markerImage = {
                        url: "/assets/images/cb/cb_marker.png",
                        scaledSize: new google.maps.Size(60, 100),
                        origin: new google.maps.Point(0, 0)
                    };

                    map = new google.maps.Map(mapInstance, mapOptions);
                    var markedOnce = false;
                    for (var i = 0; i < latlong.length; i++) {
                        if (latitude[i] != undefined && latitude[i] != "" && latitude[i] != false && longitude[i] != undefined && longitude[i] != "" && longitude[i] != false) {
                            if(markedOnce === false) {
                                map.setCenter({lat: latitude[i], lng: longitude[i]});
                                markedOnce = true
                            }
                            marker = new google.maps.Marker({
                                position: {lat: latitude[i], lng: longitude[i]},
                                map: map,
                                icon: markerImage,
                                title: markerTitle
                            })
                        }
                    }
                }
            })
        }
    }
};
initializeMaps();

function prepareSignup(iFrame) {
    var form = jQuery("<form />"), div = jQuery("<div />"), action;
    jQuery(div).html(iFrame.attr("srcdoc"));
    action = jQuery(div).find("form").attr("action");
    if (/list-manage\.com/.test(action)) {
        action = action.replace("/post?", "/post-json?") + "&c=?";
        if (action.substr(0, 2) == "//") {
            action = "http:" + action
        }
    }
    if (/createsend\.com/.test(action)) {
        action = action + "?callback=?"
    }
    form.attr("action", action);
    jQuery(div).find("input, select, textarea").not('input[type="submit"]').each(function () {
        jQuery(this).clone().appendTo(form)
    });
    return form
}

var mr_cookies = {
    getItem: function (sKey) {
        if (!sKey) {
            return null
        }
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
    }, setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false
        }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true
    }, removeItem: function (sKey, sPath, sDomain) {
        if (!this.hasItem(sKey)) {
            return false
        }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true
    }, hasItem: function (sKey) {
        if (!sKey) {
            return false
        }
        return new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
    }, keys: function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx])
        }
        return aKeys
    }
};
(function () {
    var h = this, n = function (a) {
        return "string" == typeof a
    };
    var u = function (a) {
        a = parseFloat(a);
        return isNaN(a) || 1 < a || 0 > a ? 0 : a
    };
    var aa = u("0.20"), ga = u("0.01");
    var ha = /^true$/.test("false") ? !0 : !1;
    var ia = Array.prototype.indexOf ? function (a, b, c) {
        return Array.prototype.indexOf.call(a, b, c)
    } : function (a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (n(a)) return n(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++) if (c in a && a[c] === b) return c;
        return -1
    }, ja = Array.prototype.filter ? function (a, b, c) {
        return Array.prototype.filter.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = [], f = 0, g = n(a) ? a.split("") : a, k = 0; k < d; k++) if (k in g) {
            var l = g[k];
            b.call(c, l, k, a) && (e[f++] = l)
        }
        return e
    }, ka = Array.prototype.map ? function (a, b, c) {
        return Array.prototype.map.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = Array(d), f = n(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
        return e
    }, la = function (a) {
        return Array.prototype.concat.apply([], arguments)
    };
    var v = function (a) {
        var b = [], c = 0, d;
        for (d in a) b[c++] = a[d];
        return b
    };
    var y = function (a) {
        y[" "](a);
        return a
    };
    y[" "] = function () {
    };
    var A = function (a, b) {
        for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.call(void 0, a[c], c, a)
    };
    (function () {
        var a = !1;
        try {
            var b = Object.defineProperty({}, "passive", {
                get: function () {
                    a = !0
                }
            });
            h.addEventListener("test", null, b)
        } catch (c) {
        }
        return a
    })();
    var B = function (a, b, c, d) {
        for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d;) {
            var f = a.charCodeAt(b - 1);
            if (38 == f || 63 == f) if (f = a.charCodeAt(b + e), !f || 61 == f || 38 == f || 35 == f) return b;
            b += e + 1
        }
        return -1
    }, F = /#|$/, G = function (a, b) {
        var c = a.search(F), d = B(a, 0, b, c);
        if (0 > d) return null;
        var e = a.indexOf("&", d);
        if (0 > e || e > c) e = c;
        d += b.length + 1;
        return decodeURIComponent(a.substr(d, e - d).replace(/\+/g, " "))
    }, ma = /[?&]($|#)/;
    var na = function () {
        this.h = {};
        this.a = {};
        for (var a = [2, 3], b = 0, c = a.length; b < c; ++b) this.a[a[b]] = ""
    }, H = function () {
        try {
            var a = h.top.location.hash;
            if (a) {
                var b = a.match(/\bdeid=([\d,]+)/);
                return b && b[1] || ""
            }
        } catch (c) {
        }
        return ""
    }, J = function (a, b, c) {
        var d = I;
        if (c ? d.a.hasOwnProperty(c) && "" == d.a[c] : 1) {
            var e;
            if (e = (e = H().match(new RegExp("\\b(" + a.join("|") + ")\\b"))) && e[0] || null) a = e; else a:{
                if (!(1e-4 > Math.random()) && (e = Math.random(), e < b)) {
                    try {
                        var f = new Uint32Array(1);
                        h.crypto.getRandomValues(f);
                        e = f[0] / 65536 / 65536
                    } catch (g) {
                        e = Math.random()
                    }
                    a = a[Math.floor(e * a.length)];
                    break a
                }
                a = null
            }
            a && "" != a && (c ? d.a.hasOwnProperty(c) && (d.a[c] = a) : d.h[a] = !0)
        }
    }, K = function (a) {
        var b = I;
        return b.a.hasOwnProperty(a) ? b.a[a] : ""
    }, oa = function () {
        var a = I, b = [];
        A(a.h, function (a, d) {
            b.push(d)
        });
        A(a.a, function (a) {
            "" != a && b.push(a)
        });
        return b
    };
    var L = null, Q = null;
    var R = "google_conversion_id google_conversion_format google_conversion_type google_conversion_order_id google_conversion_language google_conversion_value google_conversion_currency google_conversion_domain google_conversion_label google_conversion_color google_disable_viewthrough google_enable_display_cookie_match google_remarketing_only google_remarketing_for_search google_conversion_items google_conversion_merchant_id google_custom_params google_conversion_date google_conversion_time google_conversion_js_version onload_callback opt_image_generator google_conversion_page_url google_conversion_referrer_url".split(" "),
        S = function (a) {
            return null != a ? encodeURIComponent(a.toString()) : ""
        }, T = function (a) {
            return null != a ? a.toString().substring(0, 512) : ""
        }, U = function (a, b) {
            b = S(b);
            return "" != b && (a = S(a), "" != a) ? "&".concat(a, "=", b) : ""
        }, V = function (a) {
            var b = typeof a;
            return null == a || "object" == b || "function" == b ? null : String(a).replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/=/g, "\\=")
        }, pa = function (a) {
            var b;
            if ((a = a.google_custom_params) && "object" == typeof a && "function" != typeof a.join) {
                var c = [];
                for (b in a) if (Object.prototype.hasOwnProperty.call(a, b)) {
                    var d = a[b];
                    if (d && "function" == typeof d.join) {
                        for (var e = [], f = 0; f < d.length; ++f) {
                            var g = V(d[f]);
                            null != g && e.push(g)
                        }
                        d = e.length ? e.join(",") : null
                    } else d = V(d);
                    (e = V(b)) && null != d && c.push(e + "=" + d)
                }
                b = c.join(";")
            } else b = "";
            return "" == b ? "" : "&".concat("data=", encodeURIComponent(b))
        };

    function W(a) {
        return "number" != typeof a && "string" != typeof a ? "" : S(a.toString())
    }

    var qa = function (a) {
        if (!a) return "";
        a = a.google_conversion_items;
        if (!a) return "";
        for (var b = [], c = 0, d = a.length; c < d; c++) {
            var e = a[c], f = [];
            e && (f.push(W(e.value)), f.push(W(e.quantity)), f.push(W(e.item_id)), f.push(W(e.adwords_grouping)), f.push(W(e.sku)), b.push("(" + f.join("*") + ")"))
        }
        return 0 < b.length ? "&item=" + b.join("") : ""
    }, ra = function (a, b, c) {
        var d = [];
        if (a) {
            var e = a.screen;
            e && (d.push(U("u_h", e.height)), d.push(U("u_w", e.width)), d.push(U("u_ah", e.availHeight)), d.push(U("u_aw", e.availWidth)), d.push(U("u_cd", e.colorDepth)));
            a.history && d.push(U("u_his", a.history.length))
        }
        c && "function" == typeof c.getTimezoneOffset && d.push(U("u_tz", -c.getTimezoneOffset()));
        b && ("function" == typeof b.javaEnabled && d.push(U("u_java", b.javaEnabled())), b.plugins && d.push(U("u_nplug", b.plugins.length)), b.mimeTypes && d.push(U("u_nmime", b.mimeTypes.length)));
        return d.join("")
    };

    function sa(a) {
        a = a ? a.title : "";
        if (void 0 == a || "" == a) return "";
        var b = function (a) {
            try {
                return decodeURIComponent(a), !0
            } catch (e) {
                return !1
            }
        };
        a = encodeURIComponent(a);
        for (var c = 256; !b(a.substr(0, c));) c--;
        return "&tiba=" + a.substr(0, c)
    }

    var ta = function (a, b, c, d) {
        var e = "";
        if (b) {
            var f;
            if (a.top == a) f = 0; else {
                var g = a.location.ancestorOrigins;
                if (g) f = g[g.length - 1] == a.location.origin ? 1 : 2; else {
                    g = a.top;
                    try {
                        var k;
                        if (k = !!g && null != g.location.href) c:{
                            try {
                                y(g.foo);
                                k = !0;
                                break c
                            } catch (l) {
                            }
                            k = !1
                        }
                        f = k
                    } catch (l) {
                        f = !1
                    }
                    f = f ? 1 : 2
                }
            }
            a = c ? c : 1 == f ? a.top.location.href : a.location.href;
            e += U("frm", f);
            e += U("url", T(a));
            e += U("ref", T(d || b.referrer))
        }
        return e
    }, X = function (a, b) {
        return !(ha || b && ua.test(navigator.userAgent)) || a && a.location && a.location.protocol && "https:" == a.location.protocol.toString().toLowerCase() ? "https:" : "http:"
    }, Y = {g: {c: "27391101", b: "27391102"}, f: {c: "376635470", b: "376635471"}}, I = null, va = function () {
        var a = la.apply([], ka(v(Y), function (a) {
            return v(a)
        }, void 0)), b = ja(H().split(","), function (b) {
            return "" != b && !(0 <= ia(a, b))
        });
        return 0 < b.length ? "&debug_experiment_id=" + b.join(",") : ""
    }, ua = /Android ([01]\.|2\.[01])/i, Z = function (a, b) {
        var c = b.createElement("iframe");
        c.style.display = "none";
        c.src = X(a, !1) + "//bid.g.doubleclick.net/xbbe/pixel?d=KAE";
        b.body.appendChild(c)
    };

    function wa() {
        return new Image
    }

    function xa(a, b, c, d) {
        if ((I ? K(3) : "") == Y.g.b) try {
            var e;
            a:if (3 != G(c, "fmt")) e = !1; else {
                if (d) {
                    var f = G(c, "random"), g = G(c, "label");
                    if (!f || !g) {
                        e = !1;
                        break a
                    }
                    var k;
                    for (var l = decodeURIComponent(g.replace(/\+/g, " ")) + ":" + decodeURIComponent(f.replace(/\+/g, " ")), f = [], p = g = 0; p < l.length; p++) {
                        for (var m = l.charCodeAt(p); 255 < m;) f[g++] = m & 255, m >>= 8;
                        f[g++] = m
                    }
                    if (!L) for (L = {}, Q = {}, l = 0; 65 > l; l++) L[l] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(l), Q[l] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(l);
                    l = Q;
                    m = [];
                    for (g = 0; g < f.length; g += 3) {
                        var t = f[g], z = g + 1 < f.length, q = z ? f[g + 1] : 0, w = g + 2 < f.length,
                            C = w ? f[g + 2] : 0, p = t >> 2, ba = (t & 3) << 4 | q >> 4, ca = (q & 15) << 2 | C >> 6,
                            da = C & 63;
                        w || (da = 64, z || (ca = 64));
                        m.push(l[p], l[ba], l[ca], l[da])
                    }
                    var M = m.join("").replace(/[.]*$/, ""), D, E = a.GooglebQhCsO;
                    E || (E = {}, a.GooglebQhCsO = E);
                    D = E;
                    D[M] ? k = !1 : (D[M] = [], D[M][0] = d, k = !0);
                    if (!k) {
                        e = !1;
                        break a
                    }
                }
                var N = c.search(F);
                a = 0;
                var O;
                for (d = []; 0 <= (O = B(c, a, "fmt", N));) d.push(c.substring(a, O)), a = Math.min(c.indexOf("&", O) + 1 || N, N);
                d.push(c.substr(a));
                var r = [d.join("").replace(ma, "$1"), "&", "fmt"];
                r.push("=", encodeURIComponent("4"));
                if (r[1]) {
                    var x = r[0], P = x.indexOf("#");
                    0 <= P && (r.push(x.substr(P)), r[0] = x = x.substr(0, P));
                    var ea = x.indexOf("?");
                    0 > ea ? r[1] = "?" : ea == x.length - 1 && (r[1] = void 0)
                }
                var fa = b.createElement("script");
                fa.src = r.join("");
                b.getElementsByTagName("script")[0].parentElement.appendChild(fa);
                e = !0
            }
            return e
        } catch (Da) {
        }
        return !1
    }

    var ya = function (a, b, c, d, e, f) {
        var g = c.opt_image_generator && c.opt_image_generator.call, k;
        e && c.onload_callback && c.onload_callback.call ? k = c.onload_callback : k = function () {
        };
        d += U("async", "1");
        !g && f && xa(a, b, d, k) || (a = wa, g && (a = c.opt_image_generator), c = a(), c.src = d, c.onload = k)
    }, za = function (a, b) {
        for (var c = document.createElement("iframe"), d = [], e = [], f = 0; f < b.google_conversion_items.length; f++) {
            var g = b.google_conversion_items[f];
            g && g.quantity && g.sku && (d.push(g.sku), e.push(g.quantity))
        }
        a = X(a, !1) + "//www.google.com/ads/mrc";
        c.src = a + "?sku=" + d.join(",") + "&qty=" + e.join(",") + "&oid=" + b.google_conversion_order_id + "&mcid=" + b.google_conversion_merchant_id;
        c.style.width = "1px";
        c.style.height = "1px";
        c.style.display = "none";
        return c
    }, Aa = function (a, b, c) {
        var d = function () {
            c.documentElement.appendChild(za(a, b))
        };
        "complete" === c.readyState ? d() : a.addEventListener ? a.addEventListener("load", d) : a.attachEvent("onload", d)
    }, Ba = function (a, b) {
        (I ? K(2) : "") == Y.f.b && ("complete" === b.readyState ? Z(a, b) : a.addEventListener ? a.addEventListener("load", function () {
            Z(a, b)
        }) : a.attachEvent("onload", function () {
            Z(a, b)
        }))
    }, Ca = function (a, b) {
        for (var c = {}, d = function (d) {
            c[d] = b && null != b[d] ? b[d] : a[d]
        }, e = 0; e < R.length; e++) d(R[e]);
        d("onload_callback");
        return c
    };
    window.google_trackConversion = function (a) {
        var b = window, c = navigator, d = document;
        a = Ca(b, a);
        a.google_conversion_format = 3;
        var e = !1;
        if (a && 3 == a.google_conversion_format) {
            try {
                var f;
                "landing" == a.google_conversion_type || !a.google_conversion_id || a.google_remarketing_only && a.google_disable_viewthrough ? f = !1 : (a.google_conversion_date = new Date, a.google_conversion_time = a.google_conversion_date.getTime(), a.google_conversion_snippets = "number" == typeof a.google_conversion_snippets && 0 < a.google_conversion_snippets ? a.google_conversion_snippets + 1 : 1, "number" != typeof a.google_conversion_first_time && (a.google_conversion_first_time = a.google_conversion_time), a.google_conversion_js_version = "8", 0 != a.google_conversion_format && 1 != a.google_conversion_format && 2 != a.google_conversion_format && 3 != a.google_conversion_format && (a.google_conversion_format = 1), !1 !== a.google_enable_display_cookie_match && (a.google_enable_display_cookie_match = !0), I = new na, f = !0);
                if (f) {
                    a.google_remarketing_only && a.google_enable_display_cookie_match && I && J([Y.f.c, Y.f.b], aa, 2);
                    if (!a.google_remarketing_only && !a.google_conversion_domain) {
                        var g = Y.g;
                        I && J([g.c, g.b], ga, 3)
                    }
                    f = "/?";
                    "landing" == a.google_conversion_type && (f = "/extclk?");
                    var k,
                        l = [a.google_remarketing_only ? "viewthroughconversion/" : "conversion/", S(a.google_conversion_id), f, "random=", S(a.google_conversion_time)].join(""),
                        p = a.google_remarketing_only ? "googleads.g.doubleclick.net" : a.google_conversion_domain || "www.googleadservices.com";
                    k = X(b, /www[.]googleadservices[.]com/i.test(p)) + "//" + p + "/pagead/" + l;
                    var m, t;
                    b:{
                        var z = a.google_conversion_language;
                        if (null != z) {
                            var q = z.toString();
                            if (2 == q.length) {
                                t = U("hl", q);
                                break b
                            }
                            if (5 == q.length) {
                                t = U("hl", q.substring(0, 2)) + U("gl", q.substring(3, 5));
                                break b
                            }
                        }
                        t = ""
                    }
                    m = [U("cv", a.google_conversion_js_version), U("fst", a.google_conversion_first_time), U("num", a.google_conversion_snippets), U("fmt", a.google_conversion_format), U("value", a.google_conversion_value), U("currency_code", a.google_conversion_currency), U("label", a.google_conversion_label), U("oid", a.google_conversion_order_id), U("bg", a.google_conversion_color), t, U("guid", "ON"), U("disvt", a.google_disable_viewthrough), U("eid", oa().join()), qa(a), ra(b, c, a.google_conversion_date), pa(a), ta(b, d, a.google_conversion_page_url, a.google_conversion_referrer_url), a.google_remarketing_for_search && !a.google_conversion_domain ? "&srr=n" : "", sa(d)].join("") + va();
                    ya(b, d, a, k + m, !0, !0);
                    if (a.google_remarketing_for_search && !a.google_conversion_domain) {
                        var w, C = [S(a.google_conversion_id), "/?random=", Math.floor(1e9 * Math.random())].join("");
                        w = X(b, !1) + "//www.google.com/ads/user-lists/" + C;
                        w += [U("label", a.google_conversion_label), U("fmt", "3"), ta(b, d, a.google_conversion_page_url, a.google_conversion_referrer_url)].join("");
                        ya(b, d, a, w, !1, !1)
                    }
                    a.google_remarketing_only && a.google_enable_display_cookie_match && Ba(b, d);
                    e = !0
                }
                a.google_conversion_merchant_id && a.google_conversion_order_id && a.google_conversion_items && (Aa(b, a, d), e = !0)
            } catch (ba) {
            }
            b = e
        } else b = !1;
        return b
    }
}).call(this);
window.google_trackConversion({
    google_conversion_id: 858471704,
    google_custom_params: {page: window.location.pathname},
    google_remarketing_only: true
});
window.addEventListener("message", function (data) {
    switch (data.data.event) {
        case"register":
            console.log("LMS register");
            break;
        case"signup":
            console.log("LMS signup");
            fbq("track", "CompleteRegistration");
            break;
        case"submitted":
            console.log("LMS submitted");
            break;
        case"bought":
            console.log("LMS bought");
            fbq("track", "Purchase");
            break
    }
});
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        $("nav").addClass('navfx');
    } else {
        $("nav").removeClass('navfx');
        $(".nav-open").removeClass('nav-open');
    }
    prevScrollpos = currentScrollPos;
}