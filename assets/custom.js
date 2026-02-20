/* ============================================
   Unique Collections — Custom JS
   ============================================ */

(function () {
  "use strict";

  /* --- Mobile Drawer --- */
  const mobileToggle = document.querySelector(".header__mobile-toggle");
  const mobileDrawer = document.querySelector(".mobile-drawer");
  const mobileOverlay = document.querySelector(".mobile-drawer__overlay");
  const mobileClose = document.querySelector(".mobile-drawer__close");

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add("is-open");
    if (mobileOverlay) mobileOverlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove("is-open");
    if (mobileOverlay) mobileOverlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (mobileToggle) mobileToggle.addEventListener("click", openDrawer);
  if (mobileClose) mobileClose.addEventListener("click", closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener("click", closeDrawer);

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
