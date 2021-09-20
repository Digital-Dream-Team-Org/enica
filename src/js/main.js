(function ($) {
  jQuery(function () {
    // Close menu on outside click
    $(".main-container").on("click", function () {
      $(".navbar-collapse").removeClass("show");
    });

    // Crew members alt images preload (to prevent flashes on load)
    let crewImageSrc = [];
    $(".team-crew__member-image-alt").each(function () {
      const url = $(this).attr("src");
      crewImageSrc.push(url);
    });
    $(".team-crew-mobile__member-image-alt").each(function () {
      const url = $(this).attr("src");
      crewImageSrc.push(url);
    });
    preload(crewImageSrc);
    function preload(images) {
      if (document.images) {
        var i = 0;
        var imageObj = new Image();
        for (i = 0; i <= images.length - 1; i++) {
          //document.write('<img src="' + imageArray[i] + '" />');// Write to page (uncomment to check images)
          imageObj.src = images[i];
        }
      }
    }

    // Animations helper
    //Obtaining the default helper
    var animationHelper = AniJS.getHelper();

    //Defining addDelayFunction
    animationHelper.addDelayFunction = function (e, animationContext) {
      setTimeout(function () {
        animationContext.run();
      }, 20000);
    };

    // Popups
    $(".open-vacancy-popup").on("click", function (e) {
      e.preventDefault();
      $("body").addClass("overflow-hidden");
      $("#vacancyFormPopup").addClass("active");

      const vacancy = $(this).data("vacancy");

      if (vacancy) {
        $("#vacancyFormPopup").find("#vacancyFormVacancyInput").val(vacancy);

        $("#vacancyFormPopup").find(".vacancy-type-text").html(vacancy);
      }
    });
    $(".open-contact-popup").on("click", function (e) {
      e.preventDefault();
      $("body").addClass("overflow-hidden");
      $("#contactFormPopup").addClass("active");
    });
    $(".open-map-popup").on("click", function (e) {
      e.preventDefault();
      $("body").addClass("overflow-hidden");
      $("#mapPopup").addClass("active");

      const mapIframe = $(this).data("map");
      if (mapIframe) {
        $("#mapContainer").html(mapIframe);
      }
    });

    // Close overlay on outside click
    $(".overlay-cdk").on("click", function (e) {
      if (e.target !== e.currentTarget) return;

      if ($("#mapPopup").hasClass("active")) {
        $("#mapContainer").html("");
      }
      if ($("#vacancyFormPopup").hasClass("active")) {
        $("#vacancyFormPopup")
          .find("form")
          .find("input")
          .each(function () {
            $(this).val("");
          });
        $("#vacancySectionFormFileInputName").html("");
      }

      $(this).removeClass("active");
      $("body").removeClass("overflow-hidden");
    });

    // Close overlay on button click
    $(".overlay-cdk__close-btn").on("click", function (e) {
      if ($("#mapPopup").hasClass("active")) {
        $("#mapContainer").html("");
      }
      if ($("#vacancyFormPopup").hasClass("active")) {
        $("#vacancyFormPopup")
          .find("form")
          .find("input")
          .each(function () {
            $(this).val("");
          });
        $("#vacancySectionFormFileInputName").html("");
      }

      $(".overlay-cdk").removeClass("active");
      $("body").removeClass("overflow-hidden");
    });

    // Open file inputs
    $(".open-vacancy-form-file-input").on("click", function (e) {
      e.preventDefault();

      $("#vacancyFormFileInput").trigger("click");
    });

    $("#vacancyFormFileInput").on("change", function (e) {
      let name = null;
      if (this.files.length) {
        if (this.files[0].size > 10485760) {
          alert("Максимальный размер файла: 10 МБ");
          $(this).val("");
          $("#vacancyFormFileInputName").html("");
        }

        name = this.files[0].name;
      }
      if (name) {
        $("#vacancyFormFileInputName").html("Файл: " + name);
      } else {
        $("#vacancyFormFileInputName").html("");
      }
    });

    $(".open-vacancy-section-form-file-input").on("click", function (e) {
      e.preventDefault();

      $("#vacancySectionFormFileInput").trigger("click");
    });

    $("#vacancySectionFormFileInput").on("change", function (e) {
      let name = null;
      if (this.files.length) {
        if (this.files[0].size > 10485760) {
          alert("Максимальный размер файла: 10 МБ");
          $(this).val("");
          $("#vacancySectionFormFileInputName").html("");
        }

        name = this.files[0].name;
      }
      if (name) {
        $("#vacancySectionFormFileInputName").html("Файл: " + name);
      } else {
        $("#vacancySectionFormFileInputName").html("");
      }
    });

    // Init posts swiper
    new Swiper(".posts-swiper", {
      freeMode: true,
      slidesPerView: "auto",
      loop: false,
      spaceBetween: 20,
      // Navigation arrows.
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    // Init gallery swiper
    if ($(".gallery-swiper").length) {
      $(".gallery-swiper").each(function () {
        let navigation = false;

        const arrowPrev = $(this)
          .closest(".gallery-swiper")
          .find(".swiper-button-prev")[0];

        const arrowNext = $(this)
          .closest(".gallery-swiper")
          .find(".swiper-button-next")[0];

        if (arrowPrev && arrowNext) {
          navigation = {
            nextEl: arrowNext,
            prevEl: arrowPrev,
          };
        }

        new Swiper($(this)[0], {
          freeMode: true,
          slidesPerView: "auto",
          loop: false,
          spaceBetween: 20,
          // Navigation arrows.
          navigation,
        });
      });
    }

    // Excerpt titles
    $(".post-card__title").each(function () {
      $clamp($(this)[0], { clamp: 2 });
    });
    $(".post-card.post-card--big .post-card__title").each(function () {
      $clamp($(this)[0], { clamp: 3 });
    });

    // Toggle crew member state
    $(".team-crew__member-card-wrap").on("click", function () {
      const $item = $(this);
      const $member = $($(".team-crew__member").get($item.index()));

      if ($item.hasClass("active")) {
        $(".team-crew__member-card-wrap").removeClass("active");
        $(".team-crew__member").removeClass("active");
        return;
      }
      $(".team-crew__member-card-wrap").removeClass("active");
      $(".team-crew__member").removeClass("active");
      $item.addClass("active");
      $member.addClass("active");
    });
    $(".team-crew-mobile__member").on("click", function (e) {
      e.preventDefault();
      const $item = $(this);

      if ($item.hasClass("active")) {
        $(".team-crew-mobile__member").removeClass("active");
        return;
      }
      $(".team-crew-mobile__member").removeClass("active");
      $item.addClass("active");
    });

    // Toggle docs
    $(".docs__item a").on("click", function (e) {
      e.preventDefault();
      const $item = $(this).parent();
      if ($item.hasClass("active")) {
        $(".docs__item").removeClass("active");
        return;
      }
      $(".docs__item").removeClass("active");
      $item.addClass("active");
    });

    // Toggle map
    $(".contact-map__map-wrap a").on("click", function (e) {
      e.preventDefault();
      const $item = $(this).parent();
      $item.css("transition", "400ms");
      if ($item.hasClass("active")) {
        $(".contact-map__map-wrap").removeClass("active");
      } else {
        $(".contact-map__map-wrap").removeClass("active");
        $item.addClass("active");
      }

      if ($(".contact-map__map-wrap.active").length === 0) {
        $(".section--map-title").css("z-index", "12");
      } else {
        $(".section--map-title").css("z-index", "1");
      }

      setTimeout(() => {
        $item.css("transition", "");
      }, 400);

      if ($(".contact-map-container--timeline").length) {
        $(".contact-map__timeline-item").removeClass("active last-active");
        let timelineDots = $(".contact-map__timeline-item-inner");
        timelineDots.each(function () {
          let targetClass = $(this).data("target");
          if ($item.hasClass(targetClass) && $item.hasClass("active")) {
            const parent = $(".contact-map__timeline");
            parent
              .find(".contact-map__timeline-item")
              .removeClass("active last-active");

            $(this).parent().addClass("active last-active");
            $(this).parent().prevAll().addClass("active");
          }
        });
      }
    });
    $(".contact-map__link").on("click", function (e) {
      e.preventDefault();
      const targetClass = $(this).data("target");
      const $target = $(`.${targetClass}`);
      $target.css("transition", "400ms");
      if ($target.hasClass("active")) {
        $(".contact-map__map-wrap").removeClass("active");
      } else {
        $(".contact-map__map-wrap").removeClass("active");
        $(`.${targetClass}`).addClass("active");
      }

      if ($(".contact-map__map-wrap.active").length === 0) {
        $(".section--map-title").css("z-index", "12");
      } else {
        $(".section--map-title").css("z-index", "1");
      }

      setTimeout(() => {
        $target.css("transition", "");
      }, 400);
    });

    // Toggle timeline
    $(".contact-map__timeline-item-inner").on("click", function (e) {
      e.preventDefault();

      const parent = $(".contact-map__timeline");

      parent
        .find(".contact-map__timeline-item")
        .removeClass("active last-active");

      $(this).parent().addClass("active last-active");
      $(this).parent().prevAll().addClass("active");

      const targetClass = $(this).data("target");
      const $target = $(`.${targetClass}`);

      $target.css("transition", "400ms");
      $(".contact-map__map-wrap").removeClass("active");
      $target.addClass("active");

      setTimeout(() => {
        $target.css("transition", "");
      }, 400);

      if ($(".contact-map__map-wrap.active").length === 0) {
        $(".section--map-title").css("z-index", "12");
      } else {
        $(".section--map-title").css("z-index", "1");
      }
    });

    $(".contact-map-container").on("mousemove", function (e) {
      const russia = $(this).find(".contact-map__russia-wrap");
      const kazakhstan = $(this).find(".contact-map__kazakhstan-wrap");
      const kyrgyzstan = $(this).find(".contact-map__kyrgyzstan-wrap");
      const tajikistan = $(this).find(".contact-map__tajikistan-wrap");
      const uzbekistan = $(this).find(".contact-map__uzbekistan-wrap");

      // e = Mouse click event.
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.originalEvent.clientX - rect.left; //x position within the element.
      const y = e.originalEvent.clientY - rect.top; //y position within the element.
      const w = $(this).outerWidth();
      const h = $(this).outerHeight();

      // if (w <= 690) {
      //   return;
      // }

      const xPercent = Math.floor((x / w) * 100) + 1; // add + 1 to read of 0 and get to 100
      const yPercent = Math.floor((y / h) * 100) + 1; // add + 1 to read of 0 and get to 100

      // Centric ratio
      const xRatio = xPercent <= 50 ? xPercent / 100 : (100 - xPercent) / 100;
      const yRatio = yPercent <= 50 ? yPercent / 100 : (100 - yPercent) / 100;

      // const xValue = xPercent <= 50 ? (1 - xRatio) * -1 : 1 - xRatio;
      // const yValue = yPercent >= 50 ? (1 - yRatio) * -1 : 1 - yRatio;

      const xValue =
        xPercent <= 50 ? (xRatio - 0.5) * -1 * 100 : (xRatio - 0.5) * 100;
      const yValue =
        yPercent <= 50 ? (yRatio - 0.5) * -1 * 100 : (yRatio - 0.5) * 100;

      // console.log({ xValue, yValue });
      // setTimeout(() => {
      //   $(this).find(".contact-map__map-wrap").css("transition", `100ms`);
      // }, 400);
      // console.log({ xValue, yValue });

      if (xValue >= 48 || xValue <= -48 || yValue <= -48 || yValue >= 48) {
        $(this).find(".contact-map__map-wrap").css("transition", `1400ms`);
      } else {
        $(this).find(".contact-map__map-wrap").css("transition", "");
      }

      russia.css(
        "transform",
        `translate(${xValue * 0.15}px, ${yValue * 0.15}px)`,
      );
      kazakhstan.css(
        "transform",
        `translate(${xValue * 0.27}px, ${yValue * 0.27}px)`,
      );
      kyrgyzstan.css(
        "transform",
        `translate(${xValue * 0.35}px, ${yValue * 0.35}px)`,
      );
      tajikistan.css(
        "transform",
        `translate(${xValue * 0.55}px, ${yValue * 0.55}px)`,
      );
      uzbekistan.css(
        "transform",
        `translate(${xValue * 0.65}px, ${yValue * 0.65}px)`,
      );
    });
    // mouse leaves element
    $(".contact-map-container").on("mouseleave", function () {
      const russia = $(this).find(".contact-map__russia-wrap");
      const kazakhstan = $(this).find(".contact-map__kazakhstan-wrap");
      const kyrgyzstan = $(this).find(".contact-map__kyrgyzstan-wrap");
      const tajikistan = $(this).find(".contact-map__tajikistan-wrap");
      const uzbekistan = $(this).find(".contact-map__uzbekistan-wrap");
      russia.css("transform", "");
      kazakhstan.css("transform", "");
      kyrgyzstan.css("transform", "");
      tajikistan.css("transform", "");
      uzbekistan.css("transform", "");

      // $(this).find(".contact-map__map-wrap").css("transition", "");
      setTimeout(() => {
        $(this).find(".contact-map__map-wrap").css("transition", "");
      }, 500);
    });

    // Toggle contact tabs
    $(".contact-tab-btn a").on("click", function (e) {
      e.preventDefault();
      const $item = $(this);

      $(".contact-tab-btn a").removeClass("active");
      $item.addClass("active");

      $(".contact-tabs__item").removeClass("active");

      const index = $item.data("index");

      $(".contact-tabs__item").each(function () {
        if ($(this).data("index") === index) {
          $(this).addClass("active");
        }
      });
    });

    // Toggle contact info
    $(".toggle-contact-info").on("click", function (e) {
      e.preventDefault();

      const index = $(this).data("index");
      const city = $(this).data("city");
      const country = $(this).data("country");

      $(".contact-info").removeClass("active");
      $('.contact-info[data-index="' + index + '"]').addClass("active");

      if (country) {
        $(".contact-info__country").html(country);
      }
      if (city) {
        $(".contact-info__city span").html(city);
      }
    });

    // On scroll events
    $(document).on("scroll", function () {
      // Animate hand with phone on scroll
      if ($(".composite-hand").length) {
        // $(".composite-hand").each(function () {
        if ($(".composite-hand-trigger").isInViewport()) {
          $(".composite-hand").each(function () {
            let self = $(this);
            setTimeout(function () {
              self.addClass("active");
            }, 200);
          });
        }
      }

      // Animate graph on scroll
      if ($(".animated-graphs-wrap").length) {
        $(".animated-graphs-wrap").each(function () {
          let self = $(this);
          if ($(this).isInViewport()) {
            self.find(".animated-graphs").addClass("animated");
          }
        });
      }

      // // Update ultra text parallax on scroll
      // if ($(".text-ultra-parallax").length) {
      //   $(".text-ultra-parallax").each(function () {
      //     let self = $(this);
      //     if ($(this).isInViewport()) {
      //       ultraTextParallax(self);
      //     }
      //   });
      // }
      if ($(".text-ultra-parallax-img").length) {
        $(".text-ultra-parallax-img").each(function () {
          let self = $(this);
          if ($(this).isInViewport()) {
            ultraTextParallax(self);
          }
        });
      }

      // Sticky header
      if ($(".main-header").length) {
        let sticky = $(".main-header").height();

        if (window.pageYOffset > sticky) {
          $(".main-header").addClass("sticky");
          $(".main-header")
            .find(".navbar")
            .removeClass("navbar-dark")
            .addClass("navbar-light");
        } else {
          $(".main-header").removeClass("sticky");
          $(".main-header")
            .find(".navbar")
            .removeClass("navbar-light")
            .addClass("navbar-dark");
        }
      }
    });

    // Trigger on scroll events here on page load
    // Animate hand with phone on scroll
    if ($(".composite-hand").length) {
      $(".composite-hand").each(function () {
        let self = $(this);
        if ($(this).isInViewport()) {
          setTimeout(function () {
            self.addClass("active");
          }, 0);
        }
      });
    }

    // Animate graph on scroll
    if ($(".animated-graphs-wrap").length) {
      $(".animated-graphs-wrap").each(function () {
        let self = $(this);
        if ($(this).isInViewport()) {
          self.find(".animated-graphs").addClass("animated");
        }
      });
    }

    // Update ultra text parallax on scroll
    if ($(".text-ultra-parallax-img").length) {
      $(".text-ultra-parallax-img").each(function () {
        let self = $(this);
        if ($(this).isInViewport()) {
          ultraTextParallax(self);
        }
      });
    }

    // if ($(".text-ultra-parallax").length) {
    //   $(".text-ultra-parallax").each(function () {
    //     let self = $(this);
    //     if ($(this).isInViewport()) {
    //       ultraTextParallax(self);
    //     }
    //   });
    // }

    // Sticky header
    if ($(".main-header").length) {
      let sticky = $(".main-header").height();

      if (window.pageYOffset > sticky) {
        $(".main-header").addClass("sticky");
        $(".main-header")
          .find(".navbar")
          .removeClass("navbar-dark")
          .addClass("navbar-light");
      } else {
        $(".main-header").removeClass("sticky");
        $(".main-header")
          .find(".navbar")
          .removeClass("navbar-light")
          .addClass("navbar-dark");
      }
    }

    // Forms query handlers

    if ($("form").length) {
      let query_formatError = getParameterByName("form_fileFormatError");
      if (query_formatError) {
        alert(
          "Ошибка. Неверный формат файла, пожалуйста выбирете один из следующих форматов: doc, docx, pdf.",
        );

        let url = window.location.href;
        url = url.split("?")[0];

        window.history.replaceState({}, document.title, url);
      }

      let query_fileSizeError = getParameterByName("form_fileSizeError");
      if (query_fileSizeError) {
        alert("Ошибка. Максимальный размер файла: 10 МБ.");

        let url = window.location.href;
        url = url.split("?")[0];

        window.history.replaceState({}, document.title, url);
      }

      let query_sendError = getParameterByName("form_sendError");
      if (query_sendError) {
        alert("Произошла ошибка. Пожалуйста, повторите попытку позже.");

        let url = window.location.href;
        url = url.split("?")[0];

        window.history.replaceState({}, document.title, url);
      }
    }

    // Ultra text parallax effect
    function ultraTextParallax($el) {
      let elementTop = $el.offset().top;
      let elementBottom = elementTop + $el.outerHeight();

      let viewportTop = $(window).scrollTop();
      let viewportBottom = viewportTop + $(window).height();

      let percOffset =
        (Math.round(viewportTop) / Math.round(elementBottom)) * 100;

      // const defaultOffset = 240;
      const defaultOffset = 180;
      let newOffset = defaultOffset + -percOffset * 3.25;

      // $el.css("background-position", `15px ${newOffset}px`);
      $el.css("background-position", `0px ${newOffset}px`);
    }
  });

  // Check if element is in a viewport
  $.fn.isInViewport = function (sFix = false) {
    let elementTop = $(this).offset().top;
    let elementBottom = elementTop + $(this).outerHeight();

    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();

    // don't remember what was the problem, but this one fixed it, sFix implemented only for this reason
    if (elementTop === 0 && sFix) {
      return false;
    }

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };

  // Анимация маршрута
  $(window).on("scroll", function () {
    if (!$("#route").length) {
      return;
    }
    var s1 = parseInt($(".section--home-hero").height());
    var s2 = parseInt($(".mbp-100").height());
    var s3 = parseInt($(".section--stats").height());
    var s4 = parseInt($(".section--docs").height());
    var lHeight = s1 + s2 + s3 + (s4 / 2 + 80);
    $("#route").css({ height: lHeight }).css({ opacity: "1" });
    drawLine($("#bx_a"), document.getElementById("path"));
    positionCar();
  });

  if ($("#route").length) {
    drawLine($("#bx_a"), document.getElementById("path"));
  }

  function drawLine(container, line) {
    var s1 = parseInt($(".section--home-hero").height());
    var s2 = parseInt($(".mbp-100").height());
    var s3 = parseInt($(".section--stats").height());
    var s4 = parseInt($(".section--docs").height());
    var lHeight = s1 + s2 + s3 + (s4 / 2 + 80);
    var pathLength = line.getTotalLength(),
      maxScrollTop = lHeight,
      percentDone = $(window).scrollTop() / maxScrollTop,
      length = percentDone * (pathLength * 1.1);
    line.style.strokeDasharray = [length, pathLength].join(" ");
  }
  function positionCar() {
    var s1 = parseInt($(".section--home-hero").height());
    var s2 = parseInt($(".section--our-services").height());
    var s3 = parseInt($(".section--stats").height());
    var s4 = parseInt($(".section--docs").height());
    var lHeight = s1 + s2 + s3 + (s4 / 2 + 80);
    var scrollY = window.scrollY || window.pageYOffset;
    var maxScrollY = lHeight;
    var path = document.getElementById("path");
    // Calculate distance along the path the car should be for the current scroll amount
    var pathLen = path.getTotalLength();
    var dist = (pathLen * (scrollY * 1.1)) / maxScrollY;
    var pos = path.getPointAtLength(dist - 1);
    // Calculate position a little ahead of the car (or behind if we are at the end), so we can calculate car angle
    if (dist + 0.1 <= pathLen) {
      var posAhead = path.getPointAtLength(dist + 1);
      var angle = Math.atan2(posAhead.y - pos.y, posAhead.x - pos.x);
    } else {
      var posBehind = path.getPointAtLength(dist - 1);
      var angle = Math.atan2(pos.y - posBehind.y, pos.x - posBehind.x);
    }
    // Position the car at "pos" totated by "angle"
    var car = document.getElementById("car");
    // car.setAttribute("transform", "translate(" + (pos.x) + "," + (pos.y) + ") rotate(" + (rad2deg(angle)) + ")");
    var rotate = rad2deg(angle);
    car.style.transform =
      "translate(" + pos.x + "px," + pos.y + "px)rotate(" + rotate + "deg)";
    // car.style.WebkitTransition = 'transform 0.1s linear ';
  }

  function rad2deg(rad) {
    return (180 * rad) / Math.PI;
  }
  // Конец анимации маршрута
})(jQuery);

// Get query string support function
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
