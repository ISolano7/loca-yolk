"use strict";

// ── Sticky nav ─────────────────────────────────────────────────
const nav = document.getElementById("main-nav");
window.addEventListener(
  "scroll",
  () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  },
  { passive: true },
);

// ── Intersection Observer reveal ──────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ── Hero photo parallax + scale-in ────────────────────────────
const heroPhoto = document.getElementById("hero-photo");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (heroPhoto && !prefersReducedMotion) {
  // Scale-in on load
  requestAnimationFrame(() => heroPhoto.classList.add("loaded"));

  // Subtle parallax
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroPhoto.style.transform = `scale(1) translateY(${y * 0.18}px)`;
      }
    },
    { passive: true },
  );
} else if (heroPhoto) {
  heroPhoto.classList.add("loaded");
}
