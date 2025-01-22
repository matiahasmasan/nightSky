function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const burgerButton = document.getElementById("burger-button");

  if (mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("block");
    burgerButton.setAttribute("aria-expanded", "true");
  } else {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("block");
    burgerButton.setAttribute("aria-expanded", "false");
  }
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const mobileMenu = document.getElementById("mobile-menu");
  const burgerButton = document.getElementById("burger-button");

  if (
    !mobileMenu.contains(e.target) &&
    !burgerButton.contains(e.target) &&
    !mobileMenu.classList.contains("hidden")
  ) {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("block");
    burgerButton.setAttribute("aria-expanded", "false");
  }
});
