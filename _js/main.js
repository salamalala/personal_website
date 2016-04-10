$(function() {
  
  // Init ScrollMagic Controller
  var scrollMagicController = new ScrollMagic.Controller();

  var sceneWork = new ScrollMagic.Scene({
    triggerElement: '#work', 
    duration: $("#work").height() - 350, 
    offset: 250
  })
  .setPin("#work__title" , {pushFollowers: false})
  .addIndicators()
  .addTo(scrollMagicController);

    
  var sceneAboutMe = new ScrollMagic.Scene({
    triggerElement: '#about-me', 
    duration: $("#about-me").height() - 100,
    offset: 350
  })
  .setPin("#about-me__title" , {pushFollowers: false})
  .addIndicators()
  .addTo(scrollMagicController);

  
  var sceneContact = new ScrollMagic.Scene({
    triggerElement: '#contact', 
    duration: $("#contact").height()
  })
  .setPin("#contact__title" , {pushFollowers: false})
  .addTo(scrollMagicController)

  var scenes = {
    'scene1': {
      'work': 'anchor-work'
    },
    'scene2': {
      'about-me': 'anchor-about-me'
    },
    'scene3': {
      'contact': 'anchor-contact'
    }
  }

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
  }


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

  //work items 

  var workItemAnimation = new TimelineMax() 
  .add([
        TweenMax.staggerFromTo(".work__item", 0.7, {right: -2000, opacity: 0}, {right: 0, opacity:1, ease: Power4.easeOut}, 0.35)
      ]);

  // Scene

  // $("#work").one( "load", function() { 
    var sceneWorkItem = new ScrollMagic.Scene({
        triggerElement: "#work"})
      .addTo(scrollMagicController)
      .addIndicators()
      .reverse(false)
      .setTween(workItemAnimation);
  // } )


  $(".form__input").click(function(){
    TweenMax.fromTo(this, 0.2, {scale: 0.9, opacity: 0.5, ease:Power0.easeNone}, {scale: 1, opacity:1, ease:Bounce.easeInOut});
  });

  $(".form__submit").click(function(){
    TweenMax.fromTo(this, 0.2, {scale: 0.6, opacity: 0.5, ease:Power0.easeNone}, {scale: 1, opacity:1, ease:Bounce.easeInOut});
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
        console.log(data, "hello done"); 
      }).fail(function(data) {
        // show any errors
        console.log(data , "hello fail");
    });
            
  });

});