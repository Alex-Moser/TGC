$(document).ready(function() {
    // When the HIDE button is clicked...
    $( "#hideSidebar" ).click(function() {
        // IF Sidebar is NOT HIDDEN
        if ($( "div.sidebar" ).hasClass( "show-sidebar" )) {
        // HIDE SIDEBAR
            // Shrink sidebar to left
            $( "div.sidebar" ).animate({ width: "3em" }, 500, "swing" );
            // slide logo and filter options
            $( "div.logo" ).animate({ marginLeft: "-15em" }, 500, "swing" );
            // Fade text on sidebar buttons
            $( "span.sidebar-btn-text" ).
            animate({ opacity: "toggle" }, 200, "swing", function() {
                // Now toggle-on opacity of right arrow icon
                $( "span.sidebar-btn-icon > i.fa-angle-right" ).
                animate({ opacity: "1"}, 200, "swing" );
            });
            // Move rest of page to the left
            $( ".post-index-c" ).animate({ paddingLeft: "3em" }, 500, "swing" );

        // IF Sidebar IS HIDDEN
        } else {
        // SHOW SIDEBAR
            /* Slide in sidebar from left */
            $( "div.sidebar" ).animate( { width: "14em" }, 500, "swing");
            // Fade Logo and "Filter options"
            $( "div.logo" ).animate({ marginLeft: "0" }, 500, "swing" );
            // Now toggle on opacity of right arrow icon
            $( "span.sidebar-btn-icon > i.fa-angle-right" ).
            animate({ opacity: "0" }, 200, "swing", function() {
                // Fade text on sidebar buttons
                $( "span.sidebar-btn-text" ).
                animate({ opacity: "toggle" }, 200, "swing" );
            });
            // Move rest of page to the right to make room for sidebar.
            $( ".post-index-c" ).animate({ paddingLeft: "14em" }, 500, "swing" );
        }

        // Add or Remove the show-sidebar class.
        $( "div.sidebar" ).toggleClass( "show-sidebar" );
   });

   // Event listener for window resize.
   $( window ).resize(function(){
        // If the window is resized to less than 756px
        if ( $( window ).width() < 756 ){
            // Remove extra padding intended for sidebar
            $( ".post-index-c" ).css( "paddingLeft", "0" );
      } else if ($( window ).width() >= 756){ // resized geq 756px
          // If sidebar is open to full size
          if ($( "div.sidebar" ).hasClass( "show-sidebar" )){
             // Restore padding intended for sidebar
             $( ".post-index-c" ).css( "paddingLeft", "14em" );
         } else { // If sidebar is minimized
             // Restore padding intended for minimized sidebar
             $( ".post-index-c" ).css( "paddingLeft", "3em" );
         }
      }
   });
});
