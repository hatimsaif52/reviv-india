document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('form[action*="/cart/add"]').forEach((form) => {
    form.addEventListener(
      "submit",
      function (e) {
        const termsCheckbox = document.querySelector(".product-terms-checkbox");

        if (termsCheckbox && !termsCheckbox.checked) {
          document.querySelectorAll(".xboost-cart-slide")[0].click();
          e.preventDefault();
          e.stopPropagation();

          // Show error message
          const errorMessage = termsCheckbox
            .closest(".product-terms-container")
            .querySelector(".product-terms-error");
          if (errorMessage) {
            errorMessage.classList.remove("hidden");
          }

          // Visual feedback
          errorMessage.focus();
          errorMessage.classList.add("shake");
          setTimeout(() => {
            errorMessage.classList.remove("shake");
          }, 820);

          termsCheckbox.scrollIntoView({ behavior: "smooth", block: "center" });

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
