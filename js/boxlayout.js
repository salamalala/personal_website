var Boxlayout = (function() {

  var $element = $( '#block-main' ),
    $sections = $element.children( 'section:not(:first)' ),

    // projects section
    $sectionProject = $( '#block-project-section' ),

    // projects items
    $workItems = $( '#block-work-items > li' ),

    // projects panels
    $workPanelsContainer = $( '#block-panel-work-items' ),
    $workPanels = $workPanelsContainer.children( 'div' ),
    totalWorkPanels = $workPanels.length,
    // navigating the work panels
    $nextWorkItem = $workPanelsContainer.find( 'nav > span.block-next-work' ),
    // if currently navigating the work items
    isAnimating = false,
    // close work panel trigger
    $closeWorkItem = $workPanelsContainer.find( 'nav > span.block-icon-close' ),
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

  // clicking on a work item: the current section scales down and the respective work panel slides up
    $workItems.on( 'click', function( event ) {

      // scale down main section
      $sectionProject.addClass( 'block-scale-down' );

      // show panel for this work item
      $workPanelsContainer.addClass( 'block-panel-items-show' );

      var $panel = $workPanelsContainer.find("[data-panel='" + $( this ).data( 'panel' ) + "']");
      currentWorkPanel = $panel.index();
      $panel.addClass( 'block-show-work' );

      return false;

    } );

  // navigating the work items: current work panel scales down and the next work panel slides up
    $nextWorkItem.on( 'click', function( event ) {
      
      if( isAnimating ) {
        return false;
      }
      isAnimating = true;

      var $currentPanel = $workPanels.eq( currentWorkPanel );
      currentWorkPanel = currentWorkPanel < totalWorkPanels - 1 ? currentWorkPanel + 1 : 0;
      var $nextPanel = $workPanels.eq( currentWorkPanel );

      $currentPanel.removeClass( 'block-show-work' ).addClass( 'block-hide-current-work' ).on( transEndEventName, function( event ) {
        if( !$( event.target ).is( 'div' ) ) return false;
        $( this ).off( transEndEventName ).removeClass( 'block-hide-current-work' );
        isAnimating = false;
      } );

      if( !supportTransitions ) {
        $currentPanel.removeClass( 'block-hide-current-work' );
        isAnimating = false;
      }
      
      $nextPanel.addClass( 'block-show-work' );

      return false;

    } );

  // clicking the work panels close button: the current work panel slides down and the section scales up again
    $closeWorkItem.on( 'click', function( event ) {

      // scale up main section
      $sectionProject.removeClass( 'block-scale-down' );
      $workPanelsContainer.removeClass( 'block-panel-items-show' );
      $workPanels.eq( currentWorkPanel ).removeClass( 'block-show-work' );
      
      return false;

    } );

  }

  return { init : init };

})();