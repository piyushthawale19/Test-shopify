/* ============================================
   Cart JS — AJAX Add to Cart
   ============================================ */

(function () {
  "use strict";

  document.addEventListener("submit", function (e) {
    var form = e.target;

    if (!form.classList.contains("product-card__form")) return;
    if (form.querySelector("[data-buy-now]")) return;

    e.preventDefault();

    var addBtn = form.querySelector(".product-card__add-btn");
    var originalText = addBtn ? addBtn.textContent : "";

    if (addBtn) {
      addBtn.disabled = true;
      addBtn.textContent = "Adding...";
    }

    var formData = new FormData(form);

    fetch(
      window.Shopify && window.Shopify.routes
        ? window.Shopify.routes.root + "cart/add.js"
        : "/cart/add.js",
      {
        method: "POST",
        body: formData,
      },
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (addBtn) {
          addBtn.textContent = "Added!";
          setTimeout(function () {
            addBtn.disabled = false;
            addBtn.textContent = originalText;
          }, 1500);
        }

        /* Update cart count in header */
        updateCartCount();
      })
      .catch(function (error) {
        console.error("Cart add error:", error);
        if (addBtn) {
          addBtn.disabled = false;
          addBtn.textContent = originalText;
        }
      });
  });

  function updateCartCount() {
    fetch(
      (window.Shopify && window.Shopify.routes
        ? window.Shopify.routes.root
        : "/") + "cart.js",
    )
      .then(function (r) {
        return r.json();
      })
      .then(function (cart) {
        var countEls = document.querySelectorAll(".header__cart-count");
        countEls.forEach(function (el) {
          el.textContent = cart.item_count;
          el.style.display = cart.item_count > 0 ? "flex" : "none";
        });
      })
      .catch(function (err) {
        console.error("Cart count update error:", err);
      });
  }
})();
