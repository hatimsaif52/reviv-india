document.addEventListener("DOMContentLoaded", function () {
  const purchaseButton = document.querySelector(".button-purchase");
  let floatingClone = null;

  if (!purchaseButton) return;

  // Get the initial position of the button relative to the document
  const buttonInitialPosition =
    purchaseButton.getBoundingClientRect().top + window.scrollY;

  // Create floating button function
  function createFloatingButton() {
    if (!floatingClone) {
      // Clone the button
      floatingClone = purchaseButton.cloneNode(true);
      floatingClone.classList.add("floating");
      floatingClone.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 50%;
      transform: translateX(50%);
      z-index: 10000;
      width: 250px;
      `;

      // Add click handler that triggers original button
      floatingClone.addEventListener("click", function (e) {
        e.preventDefault();
        purchaseButton.click();
      });

      // Add to body
      document.body.appendChild(floatingClone);
    }
  }

  // Remove floating button function
  function removeFloatingButton() {
    if (floatingClone) {
      document.body.removeChild(floatingClone);
      floatingClone = null;
    }
  }

  window.addEventListener("scroll", function () {
    // If scrolled past the button's initial position
    if (window.scrollY > buttonInitialPosition) {
      createFloatingButton();
    } else {
      removeFloatingButton();
    }
  });
});
