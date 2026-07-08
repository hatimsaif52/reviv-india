document.addEventListener('DOMContentLoaded', function () {

  // Size → Color mapping
  const sizeToColor = {
    'Large': 'Yellow',
    'Small': 'White'
  };

  // Observe the Rapi bundle container because Rapi loads dynamically
  const rapiContainer = document.querySelector('div[data-rapi-id="rapi_6329443a3a024c"]');

  if (!rapiContainer) {
    console.warn("Rapi container not found.");
    return;
  }

  const observer = new MutationObserver(() => {
    const sizeSelector = rapiContainer.querySelector('select[data-attribute="Size"]');
    const colorSelector = rapiContainer.querySelector('select[data-attribute="Color"]');

    if (!sizeSelector || !colorSelector) {
      return;
    }

    function syncColor() {
      const currentSize = sizeSelector.value;
      const targetColor = sizeToColor[currentSize];
      if (!targetColor) return;

      const opts = Array.from(colorSelector.options);

      const match = opts.find(
        opt => opt.text.trim().toLowerCase() === targetColor.toLowerCase()
      );

      if (match && colorSelector.value !== match.value) {
        colorSelector.value = match.value;
        colorSelector.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    sizeSelector.addEventListener('change', syncColor);

    // run once on load
    syncColor();
  });

  observer.observe(rapiContainer, { childList: true, subtree: true });
});