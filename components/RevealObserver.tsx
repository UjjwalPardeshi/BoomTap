"use client";

import { useEffect } from "react";

const TARGETS =
  ".section-head, .step, .feature, .persona, .price-card, .phase, .mode-card, .stat, .pull-card";

/** Adds the scroll-reveal animation to section elements. Renders nothing. */
export default function RevealObserver() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    const elements = document.querySelectorAll(TARGETS);
    for (const el of elements) {
      el.classList.add("reveal");
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return null;
}
