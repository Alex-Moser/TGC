$(document).ready(function() {

    // When the HIDE button is clicked...
    $( "#hideSidebar" ).click(function() {

        // IF Sidebar is NOT HIDDEN
        if ($( "div.sidebar" ).hasClass( "show-sidebar" )) {

        // HIDE SIDEBAR
            // Shrink sidebar to left
            $( "div.sidebar" ).animate({ width: "3em" }, 400, "swing" );
            // slide logo and filter options
            $( "h2.logo, div.sidebar-text, h4.sidebar-text, section.filter-wrapper" ).
            animate({ marginLeft: "-20em" }, 400, "swing" );
            // Remove border of filter form
            $( "#filterFieldset, #filterLegend" ).css({ border: "none" });
            // Fade text on sidebar buttons
            $( "span.sidebar-btn-text" ).
            animate({ opacity: "toggle" }, 200, "swing", function() {
                // Now toggle-on opacity of right arrow icon
                $( "span.sidebar-btn-icon > i.fa-angle-right" ).
                animate({ opacity: "1"}, 200, "swing" );
            });
            // Move rest of page to the left
            $( ".post-index-c" ).animate({ paddingLeft: "3em" }, 400, "swing" );


        } else { // IF Sidebar IS HIDDEN

        // SHOW SIDEBAR
            /* Slide in sidebar from left */
            $( "div.sidebar" ).animate( { width: "14em" }, 400, "swing");
            // Fade Logo and "Filter options"
            $( "h2.logo, div.sidebar-text, h4.sidebar-text, section.filter-wrapper" ).
            animate({ marginLeft: "0" }, 400, "swing" );
            // Add border back to filter fieldset and legend
            $("#filterFieldset, #filterLegend").css({ border: "solid 1px #ebebeb" });
            // Toggle on opacity of right arrow icon
            $( "span.sidebar-btn-icon > i.fa-angle-right" ).
            animate({ opacity: "0" }, 200, "swing", function() {
                // Fade text on sidebar buttons
                $( "span.sidebar-btn-text" ).
                animate({ opacity: "toggle" }, 200, "swing" );
            });
            // Move rest of page to the right to make room for sidebar.
            $( ".post-index-c" ).animate({ paddingLeft: "14em" }, 400, "swing" );
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
