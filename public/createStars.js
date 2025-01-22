function createStars() {
  const container = document.body;
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");

    star.className = "star";

    const size = Math.random() * 3 + "px";
    star.style.width = size;
    star.style.height = size;

    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";

    star.style.animationDelay = Math.random() * 2 + "s";

    container.appendChild(star);
  }
}

document.addEventListener("DOMContentLoaded", createStars);
