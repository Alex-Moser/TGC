$( "#hideSidebar" ).click(function() {

    // If Sidebar is not hidden
    if ($("div.sidebar").hasClass("show-sidebar")) {

        /* Shrink sidebar to left */
        $( "div.sidebar" ).animate({
          width: "3em"
      }, 500, "swing", function() {
          // Animation complete.
      });

      // slide logo and filter options
      $("div.logo").animate({
          marginLeft: "-15em"
      }, 500, "swing", function() {
          // Animation complete
      });

      // Fade text on sidebar buttons
      $("span.sidebar-btn-text").animate({
          opacity: "toggle"
      }, 200, "swing", function() {
          // Now toggle on opacity of right arrow icon
         $("span.sidebar-btn-icon > i.fa-angle-right").animate({
             opacity: "1"
         }, 200, "swing", function() {
             // Animation Complete
         });
     });
      // Move rest of page to the left
      $(".post-index-c").animate({
          paddingLeft: "3em"
      }, 500, "swing", function() {
          // Animation complete
      });

  } else {

      /* Shrink sidebar to left */
      $( "div.sidebar" ).animate({
        width: "14em"
    }, 500, "swing", function() {
        // Animation complete.

    });

    // Fade Logo and "Filter options"
    $("div.logo").animate({
        marginLeft: "0"
    }, 500, "swing", function() {
        // Animation complete
    });

    // Now toggle on opacity of right arrow icon
   $("span.sidebar-btn-icon > i.fa-angle-right").animate({
       opacity: "0"
   }, 200, "swing", function() {
       // Fade text on sidebar buttons
       $("span.sidebar-btn-text").animate({
           opacity: "toggle"
       }, 200, "swing", function() {

      });
   });

    // Move rest of page to the left
    $(".post-index-c").animate({
        paddingLeft: "14em"
    }, 500, "swing", function() {
        // Animation complete
    });


  }


    $("div.sidebar").toggleClass("show-sidebar");

});
