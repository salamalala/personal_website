var Boxlayout = (function() {

  var $element = $( '#block-main' ),
  
  $sections = $element.children( 'section:not(:first)' ),
   
    transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition' : 'transitionend',
      'OTransition' : 'oTransitionEnd',
      'msTransition' : 'MSTransitionEnd',
      'transition' : 'transitionend'
    },
    // transition end event name
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    // support css transitions
    supportTransitions = Modernizr.csstransitions;

    function init() {
      initEvents();
    }

    function initEvents() {

      $sections.each( function() {

        var $section = $( this );

        // expand the clicked section and scale down the others
        $section.on( 'click', function() {

        if( !$section.data( 'open' ) ) {
          $section.data( 'open', true ).addClass( 'block-expand block-expand-top' );
          $element.addClass( 'block-expand-item' ); 
        }

      } ).find( 'span.block-icon-close' ).on( 'click', function() {

        // close the expanded section and scale up the others
        $section.data( 'open', false ).removeClass( 'block-expand' ).on( transEndEventName, function( event ) {
          if( !$( event.target ).is( 'section' ) ) return false;
          $( this ).off( transEndEventName ).removeClass( 'block-expand-top' );
        } );

        if( !supportTransitions ) {
          $section.removeClass( 'block-expand-top' );
        }

        $element.removeClass( 'block-expand-item' );
        
        return false;

      } );

    } );



    // clicking the work panels close button: the current work panel slides down and the section scales up again
    $closeWorkItem.on( 'click', function( event ) {

      // scale up main section
      $sectionWork.removeClass( 'block-scale-down' );
      $workPanelsContainer.removeClass( 'block-panel-items-show' );
      $workPanels.eq( currentWorkPanel ).removeClass( 'block-show-work' );
      
      return false;

    } );

  }

  return { init : init };

})();