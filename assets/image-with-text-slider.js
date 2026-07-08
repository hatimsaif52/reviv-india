document.addEventListener("DOMContentLoaded", function () {
  const pages = document.querySelectorAll(".image-with-text-slider__page");
  const paginationBullets = document.querySelectorAll(".pagination-bullet");
  const prevButton = document.querySelector(
    ".image-with-text-slider-pagination__button.prev"
  );
  const nextButton = document.querySelector(
    ".image-with-text-slider-pagination__button.next"
  );
  const searchInput = document.querySelector(".search-box__input");
  const searchButton = document.querySelector(".search-box__button");
  const sliderElement = document.querySelector(".image-with-text-slider");
  const paginationWrapper = document.querySelector(
    ".image-with-text-slider-pagination-wrapper"
  );
  const noResultsMessage = document.querySelector(".search-no-results");
  const blocks = document.querySelectorAll(".image-with-text-slider__content");

  let currentPageIndex = 0;
  const totalPages = pages.length;

  // Function to show a specific page
  function showPage(index) {
    // Hide all pages
    pages.forEach((page) => {
      page.removeAttribute("data-active");
    });

    // Remove active class from all pagination bullets
    paginationBullets.forEach((bullet) => {
      bullet.classList.remove("active");
    });

    // Show the selected page and update pagination
    pages[index].setAttribute("data-active", "true");
    paginationBullets[index].classList.add("active");

    // Update current index
    currentPageIndex = index;

    // Update button states
    prevButton.disabled = currentPageIndex === 0;
    nextButton.disabled = currentPageIndex === totalPages - 1;
  }

  // Initialize pagination bullets
  paginationBullets.forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
      showPage(index);
    });
  });

  // Next button
  nextButton.addEventListener("click", () => {
    if (currentPageIndex < totalPages - 1) {
      showPage(currentPageIndex + 1);
    }
  });

  // Previous button
  prevButton.addEventListener("click", () => {
    if (currentPageIndex > 0) {
      showPage(currentPageIndex - 1);
    }
  });

  // Search functionality
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let matchedBlocks = [];

    if (searchTerm === "") {
      // Reset all blocks to visible
      blocks.forEach((block) => {
        block.style.display = "";
      });

      // Show all pages using standard pagination
      pages.forEach((page) => {
        page.style.display = "";
      });

      // Reset to first page
      showPage(0);

      // Show pagination
      sliderElement.style.display = "";
      paginationWrapper.style.display = "";
      noResultsMessage.style.display = "none";
      return;
    }

    // Check each block for matches
    blocks.forEach((block) => {
      const heading =
        block.querySelector(".image-with-text-slider__heading")?.textContent ||
        "";
      const author =
        block.querySelector(".image-with-text-slider__author")?.textContent ||
        "";
      const description =
        block.querySelector(".image-with-text-slider__description")
          ?.textContent || "";

      if (
        heading.toLowerCase().includes(searchTerm) ||
        author.toLowerCase().includes(searchTerm) ||
        description.toLowerCase().includes(searchTerm)
      ) {
        matchedBlocks.push(block);
        block.style.display = "";
      } else {
        block.style.display = "none";
      }
    });

    if (matchedBlocks.length > 0) {
      // Show the slider and pagination
      sliderElement.style.display = "";
      paginationWrapper.style.display = "";
      noResultsMessage.style.display = "none";

      // Handle page visibility based on visible blocks
      let hasVisibleBlock = Array.from(pages).map((page) => {
        const pageBlocks = page.querySelectorAll(
          ".image-with-text-slider__content"
        );
        const hasVisible = Array.from(pageBlocks).some(
          (block) => block.style.display !== "none"
        );
        page.style.display = hasVisible ? "" : "none";
        return hasVisible;
      });

      // Update pagination bullets
      paginationBullets.forEach((bullet, index) => {
        bullet.style.display = hasVisibleBlock[index] ? "" : "none";
      });

      // Find first visible page and show it
      const firstVisiblePageIndex = hasVisibleBlock.findIndex(
        (isVisible) => isVisible
      );
      if (firstVisiblePageIndex !== -1) {
        showPage(firstVisiblePageIndex);
      }

      // Update navigation buttons
      const visiblePagesCount = hasVisibleBlock.filter(Boolean).length;
      prevButton.disabled = currentPageIndex === 0;
      nextButton.disabled = currentPageIndex >= visiblePagesCount - 1;
    } else {
      // Hide slider and pagination when no results
      sliderElement.style.display = "none";
      paginationWrapper.style.display = "none";
      noResultsMessage.style.display = "block";
    }
  }

  // Handle search events
  searchInput.addEventListener("input", performSearch);
  searchButton.addEventListener("click", performSearch);
  // searchInput.addEventListener("keydown", function (event) {
  //   if (event.key === "Enter") {
  //     performSearch();
  //   }
  // });

  // Keyboard navigation
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight" && !nextButton.disabled) {
      nextButton.click();
    } else if (event.key === "ArrowLeft" && !prevButton.disabled) {
      prevButton.click();
    }
  });
});
