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
    triggerElement: '#about-me--title', 
    duration: "150%" 
  })
  // .setTween(tween)
  .setPin("#about-me--title" , {pushFollowers: false})
  .setTween(tween2)
  .addTo(scrollMagicController);
  
});

