document.addEventListener("DOMContentLoaded", function () {
  const substackComponent = document.querySelector(".substack-embed-wrapper");
  let floatingClone = null;

  if (!substackComponent) return;

  const substackComponentPos =
    substackComponent.getBoundingClientRect().top + window.scrollY;

  // Create floating button function
  function createFloatingButton() {
    if (!floatingClone) {
      // Clone the button
      floatingClone = substackComponent.cloneNode(true);
      floatingClone.classList.add("floating");
      floatingClone.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 50%;
      transform: translateX(50%);
      z-index: 10000;
      width: 400px;
      `;

      // Add click handler that triggers original button
      floatingClone.addEventListener("click", function (e) {
        e.preventDefault();
        substackComponent.click();
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
    if (window.scrollY > substackComponentPos) {
      createFloatingButton();
    } else {
      removeFloatingButton();
    }
  });
});
