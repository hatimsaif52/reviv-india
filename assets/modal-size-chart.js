document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const sizeChartButton = document.getElementById("SizeChartButton");
  const sizeChartModal = document.getElementById("SizeChartModal");
  const closeButton = document.getElementById("size-chart-modal__close");
  const closeButtonFooter = document.getElementById(
    "size-chart-modal__close-btn"
  );

  if (!sizeChartButton || !sizeChartModal) return;

  // Open modal
  sizeChartButton.addEventListener("click", function () {
    sizeChartModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  // Close modal with X button
  closeButton.addEventListener("click", function () {
    sizeChartModal.style.display = "none";
    document.body.style.overflow = "";
  });

  // Close modal with footer button
  if (closeButtonFooter) {
    closeButtonFooter.addEventListener("click", function () {
      sizeChartModal.style.display = "none";
      document.body.style.overflow = "";
    });
  }

  // Close modal when clicking outside
  sizeChartModal.addEventListener("click", function (event) {
    if (event.target === sizeChartModal) {
      sizeChartModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // Close modal with escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && sizeChartModal.style.display === "flex") {
      sizeChartModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});
