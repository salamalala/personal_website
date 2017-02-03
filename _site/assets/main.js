// Init ScrollMagic Controller
var scrollMagicController = new ScrollMagic.Controller(),

    sceneWork = new ScrollMagic.Scene({
      triggerElement: '#work',
      duration: $("#work").height() - 300,
      offset: 200
    }),

    sceneAboutMe = new ScrollMagic.Scene({
        triggerElement: '#about-me',
        duration: $("#about-me").height() - 200,
        offset: 150
    }),

    sceneContact = new ScrollMagic.Scene({
        triggerElement: '#contact',
        duration: $("#contact").height(),
        offset: 100,
    }),

    scenes = {
        'scene1': {
          'work': 'anchor-work'
        },
        'scene2': {
          'about-me': 'anchor-about-me'
        },
        'scene3': {
          'contact': 'anchor-contact'
        }
    },

    sceneWorkItem = new ScrollMagic.Scene({
        triggerElement: "#work"
    }),

    workItemAnimation = new TimelineMax();



// Shorthand for $( document ).ready()
$(function() {

//navigation scroll to section
  for(var key in scenes) {
    // skip loop if the property is from prototype
    if (!scenes.hasOwnProperty(key)) continue;

    var obj = scenes[key];

    for (var prop in obj) {
      // skip loop if the property is from prototype
      if(!obj.hasOwnProperty(prop)) continue;

      new ScrollMagic.Scene({
        triggerElement: '#' + prop
      })
      .setClassToggle('#' + obj[prop], 'active')
      .addTo(scrollMagicController);
    }
  };

  // Change behavior of controller
  // to animate scroll instead of jump
  scrollMagicController.scrollTo(function(target) {

    TweenMax.to(window, 0.5, {
      scrollTo : {
        y : target, // scroll position of the target along y axis
        autoKill : true // allows user to kill scroll action smoothly
      },
      ease : Cubic.easeInOut
    });

  });


  $('.top-nav--list').on("click", "a[href^=#]", function(e) {
    var id = $(this).attr("href"); // grab the href attribute value

    if($(id).length > 0) {
      // prevents default behavior of links.
      e.preventDefault();

      // trigger scroll
      scrollMagicController.scrollTo(id);

      // If supported by the browser we can also update the URL
       if (window.history && window.history.pushState) {
         history.pushState("", document.title, id);
       }
    }
  });

  //animation on section titles
  sceneWork
  .setPin("#work__title" , {pushFollowers: false})
  .addTo(scrollMagicController);

  sceneAboutMe
  .setPin("#about-me__title" , {pushFollowers: false})
  .addTo(scrollMagicController);

  sceneContact
  .setPin("#contact__title" , {pushFollowers: false})
  .addTo(scrollMagicController);


  // work items slide in from the right side
  workItemAnimation
  .add([TweenMax.staggerFromTo(".work__item", 0.7, {x: 200, opacity: 0}, {x: 0, opacity:1, ease: Power4.easeOut}, 0.35)
      ]);

  sceneWorkItem
      .addTo(scrollMagicController)
      .reverse(false)
      .setTween(workItemAnimation);

  //animation on form input elements
  $(".form__input").click(function(){
    TweenMax.fromTo(this, 0.2, {scale: 0.9, opacity: 0.5, ease:Power0.easeNone}, {scale: 1, opacity:1, ease:Bounce.easeInOut});
  });

  //animation on form submit element
  $(".form__submit").click(function(){
    TweenMax.fromTo(this, 0.2, {scale: 0.4, opacity: 0.4, ease:Power0.easeNone}, {scale: 1, opacity:1, ease:Bounce.easeOut});
  });


  //contact form

  $('#ajax-form').submit(function(e){
    e.preventDefault();

    var formData = {
      'name' : $('input[name=name]').val(),
      'email' : $('input[name=email]').val(),
      'message' : $('input[name=message]').val()
    };

    $.ajax({
      dataType: 'jsonp',
      url: "https://getsimpleform.com/messages/ajax?form_api_token=1e539777a5c88e415ab6cf772123e7c5",
      data: formData
    })

    // using the done promise callback
    .done(function(data) {
      var el = $('.contact__header');
        el.text() == el.data("text-swap")
          ? el.text(el.data("text-original"))
          : el.text(el.data("text-swap"));
    });

  });

});
