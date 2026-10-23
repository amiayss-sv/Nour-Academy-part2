/* ==========================================================================
   Sprout — sprout.js  (vanilla JS, no jQuery)
   One function per feature, guard clauses, IntersectionObserver,
   honours prefers-reduced-motion.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------------------
     Mobile navigation
     ---------------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var panel = document.getElementById("nav-panel");
    var backdrop = document.querySelector(".nav-backdrop");
    if (!toggle || !panel) return;

    function open() {
      panel.classList.add("open");
      if (backdrop) backdrop.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
    }
    function close() {
      panel.classList.remove("open");
      if (backdrop) backdrop.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    }
    function isOpen() { return panel.classList.contains("open"); }

    toggle.addEventListener("click", function () {
      isOpen() ? close() : open();
    });
    if (backdrop) backdrop.addEventListener("click", close);

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth < 992) close();
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) { close(); toggle.focus(); }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 992 && isOpen()) close();
    });
  }

  /* ----------------------------------------------------------------------
     Sticky navbar shadow on scroll
     ---------------------------------------------------------------------- */
  function initNavScroll() {
    var nav = document.querySelector(".site-nav");
    if (!nav) return;
    function onScroll() {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----------------------------------------------------------------------
     Active nav link highlight on scroll (index only)
     ---------------------------------------------------------------------- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.nav-menu a[href^="#"]')
    );
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    links.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var sec = document.getElementById(id);
      if (sec) map[id] = link;
    });

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          var link = map[entry.target.id];
          if (link) link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    Object.keys(map).forEach(function (id) {
      obs.observe(document.getElementById(id));
    });
  }

  /* ----------------------------------------------------------------------
     Reveal-on-scroll
     ---------------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          o.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { obs.observe(el); });
  }

  /* ----------------------------------------------------------------------
     Count-up stats
     ---------------------------------------------------------------------- */
  function initCountUp() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;

    function run(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var decimals = (target % 1 !== 0) ? 1 : 0;
      if (reduceMotion) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
      }
      var dur = 1400, start = null;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(tick);
    }

    if (!("IntersectionObserver" in window)) {
      nums.forEach(run);
      return;
    }
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { run(entry.target); o.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { obs.observe(el); });
  }

  /* ----------------------------------------------------------------------
     FAQ accordion
     ---------------------------------------------------------------------- */
  function initFaq() {
    var items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    items.forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      var panel = item.querySelector(".faq-a");
      if (!btn || !panel) return;

      btn.addEventListener("click", function () {
        var isOpen = btn.getAttribute("aria-expanded") === "true";
        // Close all
        items.forEach(function (other) {
          var ob = other.querySelector(".faq-q");
          var op = other.querySelector(".faq-a");
          if (ob && op) {
            ob.setAttribute("aria-expanded", "false");
            op.style.maxHeight = null;
          }
        });
        if (!isOpen) {
          btn.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });

    window.addEventListener("resize", function () {
      items.forEach(function (item) {
        var btn = item.querySelector(".faq-q");
        var panel = item.querySelector(".faq-a");
        if (btn && panel && btn.getAttribute("aria-expanded") === "true") {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }

  /* ----------------------------------------------------------------------
     Testimonials slider
     ---------------------------------------------------------------------- */
  function initTestimonials() {
    var root = document.querySelector(".testi-slider");
    if (!root) return;
    var slides = Array.prototype.slice.call(root.querySelectorAll(".testi-slide"));
    var dots = Array.prototype.slice.call(root.querySelectorAll(".testi-dot"));
    var prev = root.querySelector(".testi-prev");
    var next = root.querySelector(".testi-next");
    if (slides.length < 2) return;

    var idx = 0, timer = null;

    function show(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle("active", i === idx); });
      dots.forEach(function (d, i) {
        d.classList.toggle("active", i === idx);
        d.setAttribute("aria-selected", i === idx ? "true" : "false");
      });
    }
    function nextSlide() { show(idx + 1); }
    function start() {
      if (reduceMotion) return;
      stop();
      timer = setInterval(nextSlide, 6000);
    }
    function stop() { if (timer) clearInterval(timer); }

    if (next) next.addEventListener("click", function () { nextSlide(); start(); });
    if (prev) prev.addEventListener("click", function () { show(idx - 1); start(); });
    dots.forEach(function (d, i) {
      d.addEventListener("click", function () { show(i); start(); });
    });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    show(0);
    start();
  }

  /* ----------------------------------------------------------------------
     Gallery lightbox
     ---------------------------------------------------------------------- */
  function initLightbox() {
    var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
    var box = document.getElementById("lightbox");
    if (!triggers.length || !box) return;

    var imgEl = box.querySelector("img");
    var cap = box.querySelector("figcaption");
    var btnClose = box.querySelector(".lb-close");
    var btnPrev = box.querySelector(".lb-prev");
    var btnNext = box.querySelector(".lb-next");
    var current = 0, lastFocus = null;

    var items = triggers.map(function (t) {
      return {
        src: t.getAttribute("data-lightbox"),
        caption: t.getAttribute("data-caption") || ""
      };
    });

    function render() {
      var it = items[current];
      imgEl.setAttribute("src", it.src);
      imgEl.setAttribute("alt", it.caption);
      if (cap) cap.textContent = it.caption;
    }
    function open(i) {
      current = i;
      lastFocus = document.activeElement;
      render();
      box.classList.add("open");
      box.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      if (btnClose) btnClose.focus();
    }
    function close() {
      box.classList.remove("open");
      box.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    }
    function move(step) { current = (current + step + items.length) % items.length; render(); }

    triggers.forEach(function (t, i) {
      t.addEventListener("click", function () { open(i); });
    });
    if (btnClose) btnClose.addEventListener("click", close);
    if (btnNext) btnNext.addEventListener("click", function () { move(1); });
    if (btnPrev) btnPrev.addEventListener("click", function () { move(-1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });

    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
    });
  }

  /* ----------------------------------------------------------------------
     Booking / enrollment form validation
     ---------------------------------------------------------------------- */
  function initBookingForm() {
    var form = document.getElementById("booking-form");
    if (!form) return;
    var success = document.getElementById("booking-success");

    function validateField(field) {
      var valid = true;
      var val = (field.value || "").trim();
      if (field.hasAttribute("required") && !val) valid = false;
      if (valid && field.type === "email" && val) {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      }
      if (valid && field.type === "tel" && val) {
        valid = val.replace(/[^0-9]/g, "").length >= 7;
      }
      field.classList.toggle("invalid", !valid);
      return valid;
    }

    var fields = Array.prototype.slice.call(
      form.querySelectorAll("input[required], select[required], textarea[required], input[type=email]")
    );

    fields.forEach(function (f) {
      f.addEventListener("blur", function () { validateField(f); });
      f.addEventListener("input", function () {
        if (f.classList.contains("invalid")) validateField(f);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var firstBad = null;
      fields.forEach(function (f) {
        if (!validateField(f)) { ok = false; if (!firstBad) firstBad = f; }
      });
      if (!ok) { if (firstBad) firstBad.focus(); return; }

      form.style.display = "none";
      if (success) {
        success.classList.add("show");
        success.setAttribute("tabindex", "-1");
        success.focus();
      }
      form.reset();
    });
  }

  /* ----------------------------------------------------------------------
     Current year in footer
     ---------------------------------------------------------------------- */
  function initYear() {
    var els = document.querySelectorAll("[data-year]");
    var y = new Date().getFullYear();
    els.forEach(function (el) { el.textContent = y; });
  }

  /* ----------------------------------------------------------------------
     Smooth anchor scroll offset for sticky nav
     ---------------------------------------------------------------------- */
  function initAnchorOffset() {
    var links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href").slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
        if (history.pushState) history.pushState(null, "", "#" + id);
      });
    });
  }

  /* ----------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */
  function boot() {
    initMobileNav();
    initNavScroll();
    initScrollSpy();
    initReveal();
    initCountUp();
    initFaq();
    initTestimonials();
    initLightbox();
    initBookingForm();
    initYear();
    initAnchorOffset();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
