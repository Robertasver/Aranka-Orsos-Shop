
/*! remove-gallery-crumbs.js — safely hides the "Aranka Orsos • Gallery" breadcrumb */
(function () {
  function hideCrumbOnce() {
    // Find the *small* element that contains this exact crumb text (tolerate whitespace)
    var nodes = document.querySelectorAll('body *');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      // Skip large containers to avoid nuking whole layouts
      if (el.children && el.children.length > 5) continue;
      var txt = (el.textContent || '').replace(/\s+/g, ' ').trim();
      if (/^Aranka\s+Orsos\s*•\s*Gallery$/i.test(txt)) {
        el.style.display = 'none';
        return true;
      }
    }
    return false;
  }

  // Run immediately, then observe for React re-renders
  hideCrumbOnce();

  var mo = new MutationObserver(function () {
    hideCrumbOnce();
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
