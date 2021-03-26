
(function() {
  var $allMenus = $(".menu-item-has-children");
  var $allToggles = $allMenus.find('> a');
  var $allTopLinks = $(".nav > li > a");
  
  var hoverTimer, blurTimer, 
      delay = 500;

  // Reusable functions
  function openMenu($current) {
    $allToggles.attr("aria-expanded", "false");
    $current.attr("aria-expanded", "true");
  }

  function closeMenu($current) {
    $current.attr("aria-expanded", "false");
  }

  function focusSubmenu($current) {
    $current.on("transitionend", function() {
      if ($current.css("visibility") === "visible") {
        $current.find("li:first-child a").focus();
        $current.off("transitionend");
      } 
    });
  }

  // Add aria roles
  $(".menu-item.active > a").attr("aria-current", "page");
  $allToggles.attr({
    "aria-haspopup": "true",
    "aria-expanded": "false",
    "role": "button"
  });

  // Open menu on hover
  $allMenus.on("mouseenter", function(e) {
    openMenu($(this).find("[aria-expanded]"));

    clearTimeout(hoverTimer);
  });

  // Close menu after a short delay
  $allMenus.on("mouseleave", function() {
    $element = $(this).find("[aria-expanded]");

    hoverTimer = setTimeout(function() {
      closeMenu($element);
    }, delay);
  });

  // Toggle menu on click, tap, or focus + enter/space
  $allToggles
    .on("click touchstart", function(e) {
      $this = $(this);
      $submenu = $this.next(".sub-menu");

      if ($this.attr("aria-expanded") === "true") closeMenu($this);
      else openMenu($this);

      focusSubmenu($submenu);

      e.preventDefault();
    })
    .on("keyup", function(e) {
      if (e.keyCode === 32) {
        openMenu($(this));
        focusSubmenu($(this).next(".sub-menu"));
      }
    });

  // Close menu when refocusing on top-level links
  $allTopLinks.on("focus", function() {
    closeMenu($allToggles);
  });

  // Close menu on esc and focus loss
  $(".site-navigation").on("keyup", function(e) {
    if (e.keyCode === 27) closeMenu($allToggles);
  });
  
  // Close menu if focus isn't inside site navigation
  $('.sub-menu').on('focusout', function(){
    // There's a delay between focusout and re-focus
    setTimeout( function() {
      $focused = $(document.activeElement);
      if($focused.closest('.site-navigation').length === 0 ) {
        closeMenu($allToggles);
      }
    }, 1);
  });

})();
