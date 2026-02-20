/* ============================================
   Product Card JS — Variant Selector
   ============================================ */

(function () {
  "use strict";

  document.addEventListener("change", function (e) {
    if (e.target.classList.contains("product-card__variant-select")) {
      var select = e.target;
      var form = select.closest("form");
      if (!form) return;

      var variantId = select.value;
      var variantInput = form.querySelector('input[name="id"]');
      if (variantInput) {
        variantInput.value = variantId;
      }

      /* Update price display if data attributes present */
      var card = select.closest(".product-card");
      if (!card) return;

      var selectedOption = select.options[select.selectedIndex];
      var price = selectedOption.getAttribute("data-price");
      var comparePrice = selectedOption.getAttribute("data-compare-price");
      var available = selectedOption.getAttribute("data-available");

      var priceEl = card.querySelector(".product-card__price-current");
      var comparePriceEl = card.querySelector(".product-card__price-compare");
      var addBtn = card.querySelector(".product-card__add-btn");

      if (priceEl && price) {
        priceEl.textContent = price;
      }

      if (comparePriceEl) {
        if (comparePrice && comparePrice !== price) {
          comparePriceEl.textContent = comparePrice;
          comparePriceEl.style.display = "";
        } else {
          comparePriceEl.style.display = "none";
        }
      }

      if (addBtn) {
        if (available === "true") {
          addBtn.disabled = false;
          addBtn.textContent = "Add to Cart";
        } else {
          addBtn.disabled = true;
          addBtn.textContent = "Sold Out";
        }
      }
    }
  });
})();
