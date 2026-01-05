// Loading screen
window.addEventListener("load", () => {
  const loadingOverlay = document.querySelector(".loading-overlay");
  setTimeout(() => {
    loadingOverlay.classList.add("hidden");
  }, 1500);
});

// Initialize AOS
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out-cubic",
    once: true,
    offset: 50,
    delay: 100,
  });
});

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");

  // Animate hamburger lines
  const spans = hamburger.querySelectorAll("span");
  if (hamburger.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");

    // Reset hamburger animation
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  })
);

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener(
  "scroll",
  () => {
    const navbar = document.querySelector(".navbar");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 4px 30px rgba(0,0,0,0.15)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 4px 30px rgba(0,0,0,0.08)";
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  },
  false
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Scroll progress indicator
window.addEventListener("scroll", () => {
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const progress = (scrolled / scrollable) * 100;
  scrollIndicator.style.width = Math.min(progress, 100) + "%";
});

// Counter animation for stats
function animateCounter(element, start, end, duration, suffix) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.innerHTML = current + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Trigger counter animations when stats section is visible
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll(".stat-number");
      counters.forEach((counter) => {
        const text = counter.textContent.trim();

        // cari angka awal
        const numberMatch = text.match(/^\d+/);
        const endValue = numberMatch ? parseInt(numberMatch[0]) : 0;

        // sisanya biar tetap (misal "/7", "+", "%", "★")
        const suffix = numberMatch ? text.slice(numberMatch[0].length) : "";

        animateCounter(counter, 0, endValue, 2000, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const statsSection = document.querySelector(".stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Enhanced hover effects for cards
document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) scale(1.02)";
    this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Gallery item interactions
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", function () {
    const ripple = document.createElement("div");
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(244, 163, 0, 0.3)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s linear";
    ripple.style.left = "50%";
    ripple.style.top = "50%";
    ripple.style.width = ripple.style.height = "20px";
    ripple.style.marginLeft = ripple.style.marginTop = "-10px";

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation keyframes
const style = document.createElement("style");
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Contact cards enhanced animations
document.querySelectorAll(".contact-card").forEach((card, index) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateX(15px) scale(1.02)";
    this.style.boxShadow = "0 20px 60px rgba(244, 163, 0, 0.15)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateX(0) scale(1)";
    this.style.boxShadow = "0 15px 50px rgba(244, 163, 0, 0.1)";
  });
});

// System links functionality
document
  .querySelector('a[href="#inventory"]')
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Create modern alert
    const alertDiv = document.createElement("div");
    alertDiv.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, white, #f8f8f8);
                    padding: 2rem 3rem;
                    border-radius: 20px;
                    box-shadow: 0 25px 80px rgba(0,0,0,0.3);
                    z-index: 10000;
                    text-align: center;
                    min-width: 400px;
                    border: 2px solid var(--primary);
                ">
                    <i class="fas fa-boxes" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--dark); margin-bottom: 1rem; font-size: 1.5rem;">Sistem Inventory</h3>
                    <p style="color: var(--gray); margin-bottom: 2rem; line-height: 1.6;">
                        Sistem manajemen inventory internal akan segera tersedia!<br>
                        Fitur ini akan membantu mengelola stok dan inventaris produk.
                    </p>
                    <button onclick="this.parentElement.parentElement.remove()" style="
                        background: linear-gradient(135deg, var(--primary), var(--secondary));
                        color: white;
                        border: none;
                        padding: 0.8rem 2rem;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Tutup</button>
                </div>
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 9999;
                    backdrop-filter: blur(5px);
                " onclick="this.parentElement.remove()"></div>
            `;
    document.body.appendChild(alertDiv);
  });

document
  .querySelector('a[href="#invoice"]')
  .addEventListener("click", function (e) {
    e.preventDefault();

    const alertDiv = document.createElement("div");
    alertDiv.innerHTML = `
                <div style="
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, white, #f8f8f8);
                    padding: 2rem 3rem;
                    border-radius: 20px;
                    box-shadow: 0 25px 80px rgba(0,0,0,0.3);
                    z-index: 10000;
                    text-align: center;
                    min-width: 400px;
                    border: 2px solid var(--primary);
                ">
                    <i class="fas fa-file-invoice" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--dark); margin-bottom: 1rem; font-size: 1.5rem;">Invoice Management System</h3>
                    <p style="color: var(--gray); margin-bottom: 2rem; line-height: 1.6;">
                        Sistem manajemen invoice akan segera tersedia!<br>
                        Fitur ini akan membantu mengelola faktur dan pembayaran.
                    </p>
                    <button onclick="this.parentElement.parentElement.remove()" style="
                        background: linear-gradient(135deg, var(--primary), var(--secondary));
                        color: white;
                        border: none;
                        padding: 0.8rem 2rem;
                        border-radius: 25px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Tutup</button>
                </div>
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 9999;
                    backdrop-filter: blur(5px);
                " onclick="this.parentElement.remove()"></div>
            `;
    document.body.appendChild(alertDiv);
  });

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const rate = scrolled * -0.5;

  if (hero) {
    hero.style.backgroundPositionY = rate + "px";
  }
});

// Dynamic typing effect for hero title (enhanced)
const heroTitle = document.querySelector(".hero-content h1");
if (heroTitle) {
  const originalText = heroTitle.innerHTML;
  heroTitle.innerHTML = "";

  setTimeout(() => {
    let index = 0;
    const typeWriter = () => {
      if (index < originalText.length) {
        heroTitle.innerHTML = originalText.slice(0, index + 1);
        index++;
        setTimeout(typeWriter, 30);
      } else {
        // Add blinking cursor effect
        heroTitle.innerHTML +=
          '<span style="animation: blink 1s infinite;">|</span>';
      }
    };
    typeWriter();
  }, 1000);
}

// Add blinking cursor animation
const cursorStyle = document.createElement("style");
cursorStyle.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
document.head.appendChild(cursorStyle);

// Performance optimization: Throttle scroll events
let ticking = false;
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
}

function updateOnScroll() {
  // Update scroll indicator
  const scrollIndicator = document.querySelector(".scroll-indicator");
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const progress = (scrolled / scrollable) * 100;
  scrollIndicator.style.width = Math.min(progress, 100) + "%";

  ticking = false;
}

window.addEventListener("scroll", requestTick);

// Add easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.code);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.join("") === konamiSequence.join("")) {
    // Easter egg activated
    document.body.style.animation = "rainbow 2s infinite";
    setTimeout(() => {
      document.body.style.animation = "";
      Swal.fire({
        title: "🐔 Easter egg found!",
        text: "Artasy Chicken appreciates curious visitors! 🎉",
        icon: "success",
        confirmButtonColor:
          getComputedStyle(document.documentElement).getPropertyValue(
            "--secondary"
          ) || "#FB8500",
      });
    }, 2000);
  }
});

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement("style");
rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
document.head.appendChild(rainbowStyle);
