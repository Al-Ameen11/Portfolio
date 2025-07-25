// Active navigation link based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === currentSection) {
      link.classList.add("active");
    }
  });
});

// Animate project cards on scroll
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      projectObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".project-card").forEach((card) => {
  projectObserver.observe(card);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute("href"));
    const navHeight = document.querySelector("nav").offsetHeight;
    const targetPosition = section.offsetTop - navHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

// Typing animation for home section
const animateTyping = (element, text, speed = 100) => {
  let index = 0;
  element.innerHTML = "";

  const typing = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(typing);
    }
  }, speed);
};

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const roleText = document.querySelector(".home-text p");
  if (roleText) {
    animateTyping(roleText, "FrontEnd Developer", 100);
  }
});
