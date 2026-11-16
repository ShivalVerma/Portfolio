// =========================================
// SHIVAL VERMA — PORTFOLIO INTERACTIONS
// =========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
  document.body.classList.toggle("menu-open", isOpen);
});

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  document.body.classList.remove("menu-open");
}

navItems.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Scroll progress and back-to-top button
function handleScroll() {
  const scrollable =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

  scrollProgress.style.width = `${progress}%`;
  backToTop.classList.toggle("visible", window.scrollY > 450);
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// Reveal sections on scroll
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Active navigation link
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

// Contact form
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const name = document.getElementById("senderName").value.trim();
  const email = document.getElementById("senderEmail").value.trim();
  const message = document.getElementById("senderMessage").value.trim();

  const subject = encodeURIComponent(`Portfolio message from ${name}`);

  const body = encodeURIComponent(
    `Hi Shival,\n\n${message}\n\nRegards,\n${name}\n${email}`
  );

  formStatus.textContent = "Opening your email application...";

  window.location.href =
    `mailto:shivalverma888@gmail.com?subject=${subject}&body=${body}`;
});

// Update footer year automatically
document.getElementById("currentYear").textContent =
  new Date().getFullYear();