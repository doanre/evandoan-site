// Lightbox functionality for grid images with arrow key navigation
const images = Array.from(document.querySelectorAll(".image-upload-grid img"));
let currentIndex = -1;
const overlay = document.getElementById("lightbox-overlay");
const lightboxImg = document.getElementById("lightbox-img");
images.forEach((img, idx) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", function () {
    currentIndex = idx;
    lightboxImg.src = this.dataset.original || this.src;
    overlay.style.display = "flex";
  });
});
// Only close overlay if background (not image) is clicked
overlay.addEventListener("click", function (e) {
  if (e.target === overlay) {
    overlay.style.display = "none";
    lightboxImg.src = "";
    currentIndex = -1;
  }
});
document.addEventListener("keydown", function (e) {
  // Check if overlay is visible (display flex or block)
  const isOverlayVisible =
    overlay &&
    (overlay.style.display === "flex" ||
      overlay.style.display === "block" ||
      getComputedStyle(overlay).display !== "none");
  if (isOverlayVisible) {
    if (e.key === "Escape" || e.key === "Esc") {
      overlay.style.display = "none";
      lightboxImg.src = "";
      currentIndex = -1;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex + 1) % images.length;
      } else if (e.key === "ArrowRight") {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
      }
      lightboxImg.src =
        images[currentIndex].dataset.original || images[currentIndex].src;
    }
  }
});

// Preload high-resolution images after page load
window.addEventListener("load", function () {
  images.forEach((img) => {
    const originalSrc = img.dataset.original;
    if (originalSrc) {
      const i = new Image();
      i.src = originalSrc;
    }
  });
});
