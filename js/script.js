(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};

  function waLink(customMessage) {
    var msg = encodeURIComponent(customMessage || cfg.WHATSAPP_MESSAGE || "");
    return "https://wa.me/" + (cfg.WHATSAPP_NUMBER || "") + (msg ? "?text=" + msg : "");
  }

  // Wire up every element carrying data-wa-link to the configured WhatsApp number.
  document.querySelectorAll("[data-wa-link]").forEach(function (el) {
    el.setAttribute("href", waLink());
  });

  // Fill placeholder text nodes from config.
  document.querySelectorAll("[data-config]").forEach(function (el) {
    var key = el.getAttribute("data-config");
    if (cfg[key] !== undefined) el.textContent = cfg[key];
  });

  document.querySelectorAll("[data-config-html]").forEach(function (el) {
    var key = el.getAttribute("data-config-html");
    if (cfg[key] !== undefined) el.innerHTML = cfg[key];
  });

  // Mobile nav toggle.
  var hamburger = document.querySelector(".hamburger");
  var mobileNav = document.querySelector(".mobile-nav");
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      mobileNav.classList.toggle("open");
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { mobileNav.classList.remove("open"); });
    });
    document.addEventListener("click", function (e) {
      if (mobileNav.classList.contains("open") && !mobileNav.contains(e.target) && e.target !== hamburger) {
        mobileNav.classList.remove("open");
      }
    });
  }

  // Accordion (curriculum + FAQ).
  document.querySelectorAll(".acc-trigger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".acc-item");
      var panel = item.querySelector(".acc-panel");
      var isOpen = item.classList.contains("open");

      // Close siblings within the same accordion group.
      var group = item.closest(".accordion");
      if (group) {
        group.querySelectorAll(".acc-item.open").forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove("open");
            openItem.querySelector(".acc-panel").style.maxHeight = null;
          }
        });
      }

      if (isOpen) {
        item.classList.remove("open");
        panel.style.maxHeight = null;
      } else {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // Lead form — submits to a Google Apps Script Web App that appends a row
  // to a Google Sheet. See site/GOOGLE_SHEET_SETUP.md to get the endpoint
  // URL and set it as LEAD_FORM_ENDPOINT in config.js. Until that's set,
  // submissions are not sent; visitors are directed to WhatsApp.
  var leadForm = document.getElementById("lead-form");
  if (leadForm) {
    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var successBox = document.getElementById("lead-form-success");
      var submitBtn = leadForm.querySelector("button[type=submit]");

      var data = new URLSearchParams(new FormData(leadForm));
      data.set("page_url", window.location.href);
      data.set("submitted_at", new Date().toISOString());

      function showStatus(message) {
        if (successBox) { successBox.textContent = message; successBox.classList.add("show"); }
        if (submitBtn) submitBtn.disabled = false;
      }

      function done() {
        showStatus("تم إرسال الطلب، لكن مش قادرين نأكد استلامه. تواصل معانا على واتساب لتأكيد الاستفسار.");
        if (successBox) successBox.classList.add("show");

        if (submitBtn) submitBtn.disabled = false;
      }

      if (cfg.LEAD_FORM_ENDPOINT) {
        if (submitBtn) submitBtn.disabled = true;
        // Apps Script Web Apps don't return CORS headers on simple POSTs,
        // so the response body is opaque; "no-cors" lets the request go
        // through, but cannot confirm that the server saved the submission.
        fetch(cfg.LEAD_FORM_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          body: data,
        }).then(done).catch(function () {
          showStatus("تعذر إرسال الطلب. بياناتك لسه موجودة، حاول تاني أو كلمنا على واتساب.");
        });
      } else {
        showStatus("الاستمارة مش متصلة حاليًا. كلمنا على واتساب للاستفسار عن المواعيد والتقسيط.");
      }
    });
  }

  // Meta Pixel custom event on WhatsApp click (pixel base code not wired —
  // no Pixel ID was supplied in source material; see plan §6 "Tracking").
  document.querySelectorAll("[data-wa-link]").forEach(function (el) {
    el.addEventListener("click", function () {
      if (typeof fbq === "function") {
        fbq("trackCustom", "WhatsAppClick");
      }
    });
  });

  // Sticky header shadow on scroll (purely cosmetic).
  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.style.boxShadow = window.scrollY > 8 ? "0 4px 18px rgba(0,0,0,0.25)" : "none";
    });
  }
})();

