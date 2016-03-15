$(function() {
  
  // Init ScrollMagic Controller
  var scrollMagicController = new ScrollMagic.Controller();
  
  // Create Animation for 0.5s
  var tweenWorkTitle = TweenMax.to('#work--title', 3, {
    backgroundColor: 'rgb(51, 188, 154)',
    delay: 2.99
  });
  
  // Create the Scene and trigger when visible
  var sceneWork = new ScrollMagic.Scene({
    triggerElement: '#work', 
    duration: "150%" 
  })
  // .setTween(tween)
  .setPin("#work__title" , {pushFollowers: false})
  .setTween(tweenWorkTitle)
  .addIndicators()
  .addTo(scrollMagicController);

  // Create Animation for 0.5s
  var tweenAboutMeTitle = TweenMax.to('#about-me--title', 2, {
    backgroundColor: 'rgb(101, 117, 116)'
  });
  
  // Create the Scene and trigger when visible
  var sceneAboutMe = new ScrollMagic.Scene({
    triggerElement: '#about-me', 
    duration: "150%" 
  })
  // .setTween(tween)
  .setPin("#about-me--title" , {pushFollowers: false})
  .setTween(tweenAboutMeTitle)
  .addIndicators()
  .addTo(scrollMagicController);

  
  // Create the Scene and trigger when visible
  var sceneContact = new ScrollMagic.Scene({
    triggerElement: '#contact', 
    duration: "150%" 
  })
  // .setTween(tween)
  .setPin("#contact--title" , {pushFollowers: false})
  .addTo(scrollMagicController)
  .addIndicators();



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