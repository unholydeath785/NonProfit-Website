var Carousel = function () {
  this.currentSlide = 1;
  this.slideClass = ".slide"
  this.slideCount = $('.slide').length;
  this.slideId = "#slide-";
  this.nextSlide = function () {
    if (this.currentSlide >= this.slideCount) {
      this.currentSlide = 0;
    }
    this.currentSlide++;
    $(this.slideClass).fadeOut(0);
    $(this.slideId + this.currentSlide).fadeIn();
  }
  this.prevSlide = function () {
    if (this.currentSlide <= 1) {
      this.currentSlide = this.slideCount + 1;
    }
    this.currentSlide--;
    $(this.slideClass).fadeOut(0);
    var currentSlie = this.currentSlide;
    $(this.slideId + this.currentSlide).fadeIn();
  }
  this.displaySlide = function (slide) {
    $(this.slideId + slide).fadeIn(0);
  }
}

var app = (function ($) {
  //variables
  var timer;
  var titleWordsArray = ['Community','Love','Inspiration'];
  var titleSizes = [400,200,452];
  var totalDonations = 0;
  var modalTexts = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in lectus luctus, consequat lorem eget, egestas mi. Donec sollicitudin ultrices quam, nec porttitor ex pretium et. Curabitur elementum faucibus ante non commodo. Morbi sagittis magna nec neque ornare, eget pulvinar lorem dictum. Suspendisse non consequat erat. Etiam congue dolor a eros commodo pellentesque. Quisque elit risus, placerat nec tortor sodales, ullamcorper tincidunt justo. In eget mi a enim eleifend pellentesque. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur rhoncus ullamcorper justo quis tempor. Pellentesque finibus sem mollis, commodo magna quis, ultricies sem. Praesent efficitur tincidunt justo, ut iaculis nunc facilisis a.','In hac habitasse platea dictumst. Quisque convallis lectus eget metus ullamcorper efficitur. Ut in risus eu metus euismod aliquam. Nulla at ligula ac nibh tincidunt efficitur. Duis fringilla lectus eu cursus tempus. Phasellus finibus risus at imperdiet molestie. Nunc semper ex id tincidunt accumsan. Etiam sodales, ipsum eu euismod facilisis, est lacus convallis enim, nec facilisis leo nisl ut velit. Sed vitae magna commodo, pharetra massa et, rutrum odio. Nullam sollicitudin metus leo, eget tristique magna tincidunt nec. Donec quis eros ut odio venenatis accumsan in nec risus. Vestibulum eget neque non libero ornare ullamcorper nec nec ipsum. Nullam aliquet a augue eget iaculis. Proin in varius nisi.','Nunc finibus sodales dolor sed sagittis. Praesent bibendum lorem non tristique placerat. Phasellus nec orci at turpis ullamcorper tincidunt. Nullam iaculis blandit lectus, vitae iaculis elit interdum suscipit. Donec a ante non magna tempor commodo eget quis eros. Sed tincidunt facilisis metus, nec malesuada ipsum commodo id. Quisque sapien nisi, ultrices eu varius vel, ultricies non magna. Integer in sapien lacinia, blandit augue at, dignissim neque. Maecenas eget diam felis. Suspendisse nisi sapien, mollis at elit vitae, feugiat ultricies turpis. Pellentesque mollis at odio ac iaculis. Maecenas finibus lectus sit amet mi semper aliquet. Vestibulum tincidunt lorem sed neque convallis hendrerit. Maecenas commodo tellus non vestibulum sagittis.'];
  var slider = new Carousel();
  var aboutSlider = new Carousel();
  //events
  $('.menu-icon').click(function () {
    $('.menu-overlay').slideToggle(500,function () {
      $('.menu-container').addClass("animation-target-scale-up");
      $('.menu-container').removeClass("animation-target-scale-down");
    });
  })

  $('.menu-close').click(function () {
    $('.menu-container').addClass("animation-target-scale-down");
    $('.menu-container').removeClass("animation-target-scale-up");
    setTimeout(function () {
      $('.menu-overlay').slideToggle(500);
    }, 100);
  })

  $('.event-cover').mouseenter(function () {
    doRotate(2160);
    setTimeout(function () {
      $('.expand').css({
            'transition':'none',
            '-moz-transform':'rotate(0 deg)',
            '-webkit-transform':'rotate(0 deg)',
            '-o-transform':'rotate(0 deg)',
            '-ms-transform':'rotate(0 deg)',
            'transform': 'rotate(0)'
       });
    }, 1000);
  })

  function doRotate(d) {

    $('.expand').css({
          'transition':'transform 1s ease-in-out',
          '-moz-transform':'rotate('+d+'deg)',
          '-webkit-transform':'rotate('+d+'deg)',
          '-o-transform':'rotate('+d+'deg)',
          '-ms-transform':'rotate('+d+'deg)',
          'transform': 'rotate('+d+'deg)'
     });
}

$('.how').click(function () {
  $('.modal-overlay').show(1);
  setTimeout(function () {
    slideRight($('.modal-container'),'80%')
  }, 250);
  $('.modal-title').text($(this).data("title"));
  var index;
  switch ($(this).prop("id")) {
    case "btn-1":
      index = 0;
      break;
    case "btn-2":
      index = 1;
      break;
    case "btn-3":
      index = 2;
      break;
    default:
      break;
  }
  $('.modal-desc').text(modalTexts[index]);
})

$('.modal-close').click(function () {
  slideLeft($('.modal-container'), '0');
  setTimeout(function () {
    $('.modal-overlay').hide(1);
  }, 10);
})

  //functions
  var updateTitle = function () {
    var index = 0;
    setInterval(function () {
      index++;
      slideLeft($('.updating-title'),titleSizes[index]);
      setTimeout(function () {
        $('.updating-title').text(titleWordsArray[index]);
        slideRight($('.updating-title'),titleSizes[index]);
      }, 1000);
      if (index > titleWordsArray.length - 1) {
        index = 0;
      }
    }, 5000);
  }

  var checkAboutSize = function (aboutSlider) {
    aboutSlider.slideClass = ".how";
    aboutSlider.slideId = "#how-";
    var aboutInterval = setInterval(function () {
      if ($(window).width() < 650) {
        aboutSlider.nextSlide();
      } else {
        aboutSlider.displaySlide(1);
        aboutSlider.displaySlide(2);
        aboutSlider.displaySlide(3);
      }
    }, 10000);
  }

  var slideLeft = function (ele,size) {
    $(ele).animate({
      width:0,
    }, 1000)
  }

  var slideRight = function (ele,size) {
    $(ele).animate({
      width:size
    }, 1000)
  }

  var updateDonation = function () {
    setInterval(function () {
      totalDonations = getDonations(totalDonations);
      $('.total-donated').text(totalDonations + "$");
    }, 1000 * 10);
  }

  var getDonations = function (totalDonations) {
    return totalDonations + 100;
  }

  var startTimer = function (slider) {
    timer = setInterval(function () {
      slider.nextSlide();
    }, 10000);
  }

  var resetTimer = function () {
    window.clearInterval(timer);
    startTimer(slider);
  }

  var getCarousel = function () {
    return slider;
  }

  var start = function() {
    updateTitle();
    updateDonation();
    slider.displaySlide(1);
    startTimer(slider);
    checkAboutSize(aboutSlider);
    $('.jumbotron').height($(window).height());
  }

  //return
  return {
    init: start,
    getSlider: getCarousel,
    resetCarousel: resetTimer
  };

})(jQuery);

// var ready = false;
// while(!ready) {
//   app.loader();
// }
$(document).ready(function () {
  ready = true;
  app.init();
  smoothScool(1000);
})

function smoothScool (duration) {
  $('a[href^="#"]').on('click', function(event) {
    if ($($(this)).prop('id') != '#next' && $($(this)).prop('id') != '#prev') {
      var target = $( $(this).attr('href') );
      $('.menu-container').addClass("animation-target-scale-down");
      $('.menu-container').removeClass("animation-target-scale-up");
      setTimeout(function () {
        $('.menu-overlay').slideUp(500);
      }, 100);
      setTimeout(function() {
      }, 600);
      if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, duration);
      }
    }
  });
}

function sendMail() {
  var emailString = 'mailto:kappdesignsco@gmail.com?subject='+$('.subject').val()+'&body='+$('#emailbod').val()+'&cc='+$('.cc').val()+'';
  email = window.open(emailString);
  setTimeout(function () {
    email.close();
  }, 1000);
}
