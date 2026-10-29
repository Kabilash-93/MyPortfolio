/* ==========================================================
   Kabilash K N: Portfolio scripts
   Features: mobile menu, active nav link, scroll reveal,
   back-to-top.
   ========================================================== */
(function () {
  "use strict";

  var navbar = document.getElementById("navbar");
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  var navLinks = document.querySelectorAll(".nav-link");
  var backToTop = document.getElementById("backToTop");
  var toast = document.getElementById("toast");

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    navMenu.classList.toggle("open", open);
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  navToggle.addEventListener("click", function () {
    setMenu(!navMenu.classList.contains("open"));
  });

  // Close the menu after choosing a link
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  // Close the menu with the Escape key (keyboard friendly)
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      setMenu(false);
      navToggle.focus();
    }
  });

  /* ---------- Scroll: navbar style, back-to-top, active link ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    navbar.classList.toggle("scrolled", y > 20);
    backToTop.classList.toggle("show", y > 500);

    // The active section is the last one whose top has passed the navbar
    var current = sections[0] ? sections[0].id : "";
    sections.forEach(function (section) {
      if (y >= section.offsetTop - 140) current = section.id;
    });
    // At the very bottom, highlight the last section
    if (window.innerHeight + y >= document.documentElement.scrollHeight - 4 && sections.length) {
      current = sections[sections.length - 1].id;
    }

    navLinks.forEach(function (link) {
      var active = link.getAttribute("href") === "#" + current;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () { onScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Old browsers: just show everything
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Toast helper ---------- */
  var toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3500);
  }

  /* ---------- Placeholder links (e.g. GitHub URL not added yet) ---------- */
  document.querySelectorAll("a[data-placeholder]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (link.getAttribute("href") === "#") {
        e.preventDefault();
        showToast("Add your " + link.getAttribute("data-placeholder") + " in index.html to activate this link.");
      }
    });
  });
})();
