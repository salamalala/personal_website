$(function() {
  
  // Init ScrollMagic Controller
  var scrollMagicController = new ScrollMagic.Controller();
  
  // Create Animation for 0.5s
  // var tween = TweenMax.to('#work--title', 3, {
  //   backgroundColor: 'rgb(255, 39, 46)',
  //   scale: 5,
  //   rotation: 360
  // });
  
  // Create the Scene and trigger when visible
  var scene = new ScrollMagic.Scene({
    triggerElement: '#work', 
    duration: "150%" 
  })
  // .setTween(tween)
  .setPin("#work--title" , {pushFollowers: false})
  .addTo(scrollMagicController);
  
});

