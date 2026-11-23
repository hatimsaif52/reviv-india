// Shows the unticked-terms error on the product page.
function showTermsError(termsCheckbox) {
  const errorMessage = termsCheckbox
    .closest(".product-terms-container")
    .querySelector(".product-terms-error");
  if (errorMessage) {
    errorMessage.classList.remove("hidden");

    // Visual feedback
    errorMessage.focus();
    errorMessage.classList.add("shake");
    setTimeout(() => {
      errorMessage.classList.remove("shake");
    }, 820);
  }

  termsCheckbox.scrollIntoView({ behavior: "smooth", block: "center" });
}

// The xBoost side cart opens on the add button's click, before the form's
// submit fires, so an unticked box used to open an empty cart. Gate the click
// itself (window capture runs before xBoost) and ask for the tick in the AT
// terms sheet, then add as normal.
window.addEventListener(
  "click",
  function (e) {
    const button =
      e.target.closest &&
      e.target.closest('form[action*="/cart/add"] [type="submit"]');
    if (!button) return;

    const termsCheckbox = document.querySelector(".product-terms-checkbox");
    if (!termsCheckbox || termsCheckbox.checked) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    if (window.atTermsSheet) {
      window.atTermsSheet(termsCheckbox, function () {
        button.click();
      });
      return;
    }
    showTermsError(termsCheckbox);
  },
  true
);

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('form[action*="/cart/add"]').forEach((form) => {
    form.addEventListener(
      "submit",
      function (e) {
        const termsCheckbox = document.querySelector(".product-terms-checkbox");

        if (termsCheckbox && !termsCheckbox.checked) {
          e.preventDefault();
          e.stopPropagation();
          showTermsError(termsCheckbox);
          return false;
        }
      },
      true
    );
  });

  document.addEventListener("change", function (e) {
    if (e.target && e.target.classList.contains("product-terms-checkbox")) {
      if (e.target.checked) {
        const errorMessage = e.target
          .closest(".product-terms-container")
          .querySelector(".product-terms-error");
        if (errorMessage) {
          errorMessage.classList.add("hidden");
        }
      }
    }
  });
});
