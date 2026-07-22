const FOOTER_LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#demo", label: "Demo" },
  { href: "#features", label: "Features" },
  { href: "#compare", label: "Compare" },
  { href: "#pricing", label: "Pricing" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#faq", label: "FAQ" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <p className="wordmark">
            <span className="wordmark-dot" aria-hidden="true" />
            Boom<em>Tap</em>
          </p>
          <p className="footer-tag">From mouth to music.</p>
          <p className="footer-glossary">
            <span className="gloss-term">boxeme</span>{" "}
            <span className="gloss-pos">/ˈbɒks.iːm/ n.</span> a single
            vocal-percussion sound event. You&apos;ll be making hundreds.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="footer-fine">
          <p>
            Clean by construction — licensed training data only, provenance on
            every file. No voice cloning. No impersonation. Ever.
          </p>
          <p>&copy; 2026 BoomTap. All beats yours.</p>
        </div>
      </div>
    </footer>
  );
}
