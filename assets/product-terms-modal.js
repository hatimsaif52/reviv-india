document.addEventListener("DOMContentLoaded", () => {
  const termsLinks = document.querySelectorAll(".terms-link-button");

  termsLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      // Find the closest section ID
      const container = this.closest(".product-terms-container");
      const checkboxId = container.querySelector(".product-terms-checkbox").id;
      const sectionId = checkboxId.split("-").pop();

      // Get related elements
      const checkbox = document.getElementById(checkboxId);
      const modal = document.getElementById(
        `ProductTermsModal-template--${sectionId}`
      );

      // Check if modal found
      if (!modal) return;

      // Simply display the modal
      modal.style.display = "flex";

      // Handle accept button
      modal.querySelector("#product-terms-modal__accept").addEventListener(
        "click",
        () => {
          checkbox.checked = true;
          hideModal(modal);
        },
        { once: true }
      );

      // Handle refuse button
      modal.querySelector("#product-terms-modal__refuse").addEventListener(
        "click",
        () => {
          checkbox.checked = false;
          hideModal(modal);
        },
        { once: true }
      );

      modal.querySelector("#product-terms-modal__close").addEventListener(
        "click",
        () => {
          hideModal(modal);
        },
        { once: true }
      );

      // Close when clicking outside modal content
      modal.addEventListener(
        "click",
        (e) => {
          if (e.target === modal) {
            hideModal(modal);
          }
        },
        { once: true }
      );
    });
  });

  function hideModal(modal) {
    modal.style.display = "none";
  }
});
