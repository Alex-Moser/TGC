$(document).ready(function() {
    // When the HIDE button is clicked...
    $( "#hideSidebar" ).click(function() {

        // If Sidebar is not hidden
        if ($("div.sidebar").hasClass("show-sidebar")) {

        // HIDE SIDEBAR FUNCTIONS---------------------
            // Shrink sidebar to left
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
              paddingLeft: "0"
          }, 500, "swing", function() {
              // Animation complete
          });

      } else { // If the Sidebar is hidden...

          // SHOW SIDEBAR FUNCTIONS-----------------------------------
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

   // Event listener for window resize.
   $( window ).resize(function(){
      if ($( window ).width() < 756){

          $(".post-index-c").css("paddingLeft", "0");
      } else if ($( window ).width() >= 756){
          if ($("div.sidebar").hasClass("show-sidebar")){
             $(".post-index-c").css("paddingLeft", "14em");
         } else {
             $(".post-index-c").css("paddingLeft", "3em");
         }

      }
   });



});
