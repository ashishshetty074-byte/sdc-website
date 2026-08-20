document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------
     Sticky header shadow on scroll
  --------------------------------------------------------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      var isOpen = navLinks.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------------------------------------------------------
     Scroll reveal via IntersectionObserver
  --------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------------------------------------------------------
     Animated stat counters
  --------------------------------------------------------- */
  var counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    var animateCounter = function (el) {
      var target = parseFloat(el.getAttribute('data-counter'));
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1400;
      var startTime = null;
      var step = function (ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = target * eased;
        el.textContent = (target % 1 === 0 ? Math.floor(value) : value.toFixed(1)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var cIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { cIo.observe(el); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---------------------------------------------------------
     Testimonial carousel — auto-rotating
  --------------------------------------------------------- */
  var track = document.querySelector('.testi-slides');
  if (track) {
    var slides = track.querySelectorAll('.testi-slide');
    var dotsWrap = document.querySelector('.testi-dots');
    var current = 0;
    var timer;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); resetTimer(); });
      dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap.querySelectorAll('.testi-dot');

    function goTo(i) {
      current = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, idx) { d.classList.toggle('active', idx === current); });
    }
    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(function () { goTo(current + 1); }, 5500);
    }
    resetTimer();

    var wrap = document.querySelector('.testi-wrap');
    if (wrap) {
      wrap.addEventListener('mouseenter', function () { clearInterval(timer); });
      wrap.addEventListener('mouseleave', resetTimer);
    }
  }

  /* ---------------------------------------------------------
     FAQ accordion
  --------------------------------------------------------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------------------------------------------------------
     Contact form validation
  --------------------------------------------------------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var successBox = document.querySelector('.form-success');

    var validators = {
      name: function (v) { return v.trim().length >= 2; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      phone: function (v) { return /^[0-9+\-\s()]{7,15}$/.test(v.trim()); }
    };

    function validateField(field) {
      var row = field.closest('.form-row');
      var name = field.name;
      if (validators[name]) {
        var valid = validators[name](field.value);
        row.classList.toggle('invalid', !valid);
        return valid;
      }
      return true;
    }

    ['name', 'email', 'phone'].forEach(function (fieldName) {
      var field = form.querySelector('[name="' + fieldName + '"]');
      if (field) {
        field.addEventListener('blur', function () { validateField(field); });
        field.addEventListener('input', function () {
          if (field.closest('.form-row').classList.contains('invalid')) validateField(field);
        });
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allValid = true;
      ['name', 'email', 'phone'].forEach(function (fieldName) {
        var field = form.querySelector('[name="' + fieldName + '"]');
        if (field && !validateField(field)) allValid = false;
      });
      if (!allValid) {
        var firstInvalid = form.querySelector('.form-row.invalid input, .form-row.invalid textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      // Note: actual submission wiring is handled by the client's dev team.
      successBox.classList.add('show');
      form.reset();
      document.querySelectorAll('.form-row.invalid').forEach(function (r) { r.classList.remove('invalid'); });
      setTimeout(function () { successBox.classList.remove('show'); }, 6000);
    });
  }

  /* ---------------------------------------------------------
     Active nav link highlighting by current page
  --------------------------------------------------------- */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

});
