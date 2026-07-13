/* Waggin' Tails — progressive enhancement.
   Site is fully usable with JS disabled; this adds nav toggle,
   scroll reveals, and AJAX form submission. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* Form delivery endpoint (Formspree).
     Live form "Waggin' Tails Website" -> habib@interactive-guru.com,
     free plan (50 submissions/mo). Created 2026-07-13. */
  var FORM_ENDPOINT = "https://formspree.io/f/xnjeqwrw";

  /* ----- footer year ----- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ----- mobile nav ----- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ----- scroll reveal (respects reduced motion via CSS) ----- */
  var revealTargets = document.querySelectorAll(
    ".card, .gallery figure, .toon-pair, .trust-item, .community-quote, .day-photo, .community-photo"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
  }

  /* ----- contact form ----- */
  var form = document.getElementById("contact-form");
  if (!form) return;
  var status = form.querySelector(".form-status");

  function setStatus(msg, ok) {
    status.textContent = msg;
    status.className = "form-status " + (ok ? "ok" : "err");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var valid = true;
    form.querySelectorAll("[required]").forEach(function (field) {
      var bad = !field.value.trim() ||
        (field.type === "email" && !/^\S+@\S+\.\S+$/.test(field.value));
      field.classList.toggle("invalid", bad);
      if (bad) valid = false;
    });
    if (!valid) {
      setStatus("Please fill in your name, phone, email, and a short message.", false);
      return;
    }

    if (!FORM_ENDPOINT) {
      setStatus(
        "The message desk is being connected. For the fastest answer, call (269) 579-3201.",
        false
      );
      return;
    }

    var btn = form.querySelector("[type=submit]");
    btn.disabled = true;
    setStatus("Sending…", true);

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("send failed");
        form.reset();
        setStatus("Thanks for reaching out. Your message was sent. For the fastest answer, call Waggin' Tails directly.", true);
      })
      .catch(function () {
        setStatus("Something went wrong sending your message. Please call (269) 579-3201.", false);
      })
      .finally(function () {
        btn.disabled = false;
      });
  });
})();
