document.addEventListener("DOMContentLoaded", function () {
  const slidesContainer = document.querySelector(".slides-container");
  const prevButton = document.querySelector(".prev-slide");
  const nextButton = document.querySelector(".next-slide");
  const dots = document.querySelectorAll(".dot");

  let currentIndex = 0;
  let autoSlideInterval;

  function showSlide(index) {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + dots.length) % dots.length;
    showSlide(currentIndex);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % dots.length;
    showSlide(currentIndex);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Slide every 3 seconds
  }

  function resetAutoSlideInterval() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  function disableAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  prevButton.addEventListener("click", () => {
    prevSlide();
    disableAutoSlide();
  });

  nextButton.addEventListener("click", () => {
    nextSlide();
    disableAutoSlide();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      currentIndex = i;
      disableAutoSlide();
    });
  });

  slidesContainer.addEventListener("touchstart", disableAutoSlide);
  slidesContainer.addEventListener("mousedown", disableAutoSlide);
  slidesContainer.addEventListener("mouseup", startAutoSlide);

  // Start auto sliding on page load
  startAutoSlide();

  // Show initial slide
  showSlide(currentIndex);
});
