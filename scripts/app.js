"use strict";

// ── Sticky nav ─────────────────────────────────────────────────
const nav = document.getElementById("main-nav");
if (nav) {
  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 60);
    },
    { passive: true },
  );
}

// ── Intersection Observer reveal ──────────────────────────────
const revealElements = document.querySelectorAll(".reveal");
if (revealElements.length > 0) {
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

  revealElements.forEach((el) => revealObserver.observe(el));
}

// ── Hero photo parallax + scale-in ────────────────────────────
const heroPhoto = document.getElementById("hero-photo");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (heroPhoto) {
  // Scale-in on load
  requestAnimationFrame(() => heroPhoto.classList.add("loaded"));

  // Subtle parallax via CSS custom property so the transform stays in CSS
  if (!prefersReducedMotion) {
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          heroPhoto.style.setProperty("--parallax-y", `${y * 0.18}px`);
        }
      },
      { passive: true },
    );
  }
}
