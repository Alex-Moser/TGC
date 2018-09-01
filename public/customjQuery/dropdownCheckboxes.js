$(document).ready(function() {

    // When the select element is clicked
    $('div.custom-dropdown').click(function() {
      $('div.custom-dropdown').next().css({display: 'none'}).removeClass('menu-visible');
      if (!$(this).hasClass("menu-visible")) { // menu not visible

          $(this).next().css({display: 'block'});
          $(this).addClass('menu-visible');

      } else if ($(this).hasClass("menu-visible")) { // menu visible
          // TODO: bug fix when other select is clicked and other is auto closed, takes two clicks to reopen
          // Clicking select element closes menu
          $(this).next().css({display: 'none'});
          $(this).removeClass('menu-visible');
      }
    });

});
