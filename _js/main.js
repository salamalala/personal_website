$(function() {
  
  // Init ScrollMagic Controller
  var scrollMagicController = new ScrollMagic.Controller();
  
  // Create Animation for 0.5s
  var tween1 = TweenMax.to('#work--title', 3, {
    backgroundColor: 'rgb(51, 188, 154)',
    delay: 2.99
  });
  
  // Create the Scene and trigger when visible
  var scene1 = new ScrollMagic.Scene({
    triggerElement: '#work', 
    duration: "150%" 
  })
  // .setTween(tween)
  .setPin("#work--title" , {pushFollowers: false})
  .setTween(tween1)
  .addTo(scrollMagicController);

  // Create Animation for 0.5s
  var tween2 = TweenMax.to('#about-me--title', 2, {
    backgroundColor: 'rgb(101, 117, 116)'
  });
  
  // Create the Scene and trigger when visible
  var scene2 = new ScrollMagic.Scene({
    triggerElement: '#about-me', 
    duration: "150%" 
  })
  // .setTween(tween)
  .setPin("#about-me--title" , {pushFollowers: false})
  .setTween(tween2)
  .addTo(scrollMagicController);

  
  // Create the Scene and trigger when visible
  var scene3 = new ScrollMagic.Scene({
    triggerElement: '#contact', 
    duration: "150%" 
  })
  // .setTween(tween)
  .setPin("#contact--title" , {pushFollowers: false})
  .addTo(scrollMagicController);



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