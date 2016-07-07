var app = (function ($) {
  //variables
  titleWordsArray = ['Community','Love','Inspiration'];
  titleSizes = [400,200,452];
  totalDonations = 0;

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

$('.event-container').mouseenter(function () {
  $(this).find('.event-info').slideDown();
  $(this).find('.event-more').slideDown(500);
  $(this).css({
    'transition':'margin-top 0.5s, height 0.5s',
    'height':'100%',
    'margin-top':'-32px'
  });
})

$('.event-container').mouseleave(function () {
  $(this).css({
    'transition':'margin-top 1s, height 1s',
    'height':'60px',
    'margin-top':'308px'
  });
  setTimeout(function () {
    $('.event-info').slideUp();
    $('.event-more').slideUp();
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
      totalDonations = getDonations();
      $('.total-donated').text(totalDonations + "$");
    }, 1000*60*10);
  }
  
  var getDonations = function () {
    return 0;
  }

  var start = function() {
    updateTitle();
    updateDonation();
  }

  //return
  return {
    init: start

  };

})(jQuery);

$(document).ready(function () {
  app.init();
})
