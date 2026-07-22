"use client";

import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#demo", label: "Demo" },
  { href: "#features", label: "Features" },
  { href: "#compare", label: "Compare" },
  { href: "#pricing", label: "Pricing" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="BoomTap home">
        <span className="wordmark-dot" aria-hidden="true" />
        Boom<em>Tap</em>
      </a>
      <nav
        className={`site-nav${open ? " open" : ""}`}
        id="site-nav"
        aria-label="Main"
        onClick={(e) => {
          if ((e.target as HTMLElement).tagName === "A") setOpen(false);
        }}
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="btn btn-primary btn-sm" href="#beta">
          Join the beta
        </a>
        <button
          type="button"
          className="nav-toggle"
          ref={toggleRef}
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
