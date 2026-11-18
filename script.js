// .EXE — dotexe.dev
// Mobile nav toggle + thank-you banner after form redirect (?sent=1).

(function () {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close the menu when a nav link is tapped.
    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // FormSubmit redirects back to https://www.dotexe.dev/?sent=1 — show thanks.
  var params = new URLSearchParams(window.location.search);
  if (params.get('sent') === '1') {
    var banner = document.getElementById('sent-banner');
    if (banner) {
      banner.hidden = false;
      banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
})();
