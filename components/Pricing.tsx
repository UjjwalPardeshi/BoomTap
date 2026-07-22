"use client";

import { useState } from "react";

type Region = "us" | "in";

interface TierPrices {
  monthly: string;
  yearly?: string;
}

const PRICES: Record<Region, { free: TierPrices; pro: TierPrices; studio: TierPrices }> = {
  us: {
    free: { monthly: "$0" },
    pro: { monthly: "$7.99", yearly: "$59.99" },
    studio: { monthly: "$16.99", yearly: "$129.99" },
  },
  in: {
    free: { monthly: "₹0" },
    pro: { monthly: "₹399", yearly: "₹2,499" },
    studio: { monthly: "₹799", yearly: "₹5,999" },
  },
};

export default function Pricing() {
  const [region, setRegion] = useState<Region>("us");
  const p = PRICES[region];

  return (
    <section className="section" id="pricing">
      <div className="section-head">
        <span className="section-tag">09 / Pricing</span>
        <h2>Start free. Pay when it earns it.</h2>
        <div className="region-toggle" role="group" aria-label="Pricing region">
          <button
            type="button"
            className={`region-btn${region === "us" ? " is-active" : ""}`}
            aria-pressed={region === "us"}
            onClick={() => setRegion("us")}
          >
            US $
          </button>
          <button
            type="button"
            className={`region-btn${region === "in" ? " is-active" : ""}`}
            aria-pressed={region === "in"}
            onClick={() => setRegion("in")}
          >
            India ₹
          </button>
        </div>
      </div>
      <div className="price-grid">
        <article className="price-card">
          <h3>Free</h3>
          <p className="price">
            <span>{p.free.monthly}</span>
            <span className="price-per">forever</span>
          </p>
          <ul>
            <li>Unlimited capture &amp; Faithful mode</li>
            <li>3 Produce renders a day</li>
            <li>Tracks up to 60 seconds</li>
            <li>MP3 export with a subtle end-tag</li>
            <li>Core kits</li>
          </ul>
          <a className="btn btn-ghost btn-block" href="#beta">
            Start free
          </a>
        </article>
        <article className="price-card price-card-hot">
          <p className="price-flag">Most popular</p>
          <h3>Pro</h3>
          <p className="price">
            <span>{p.pro.monthly}</span>
            <span className="price-per">
              /mo &middot; or {p.pro.yearly}/yr
            </span>
          </p>
          <ul>
            <li>100 renders a month</li>
            <li>WAV + MIDI export</li>
            <li>All kits and all styles</li>
            <li>No audio end-tag</li>
            <li>3 calibration profiles</li>
          </ul>
          <a className="btn btn-primary btn-block" href="#beta">
            Go Pro
          </a>
        </article>
        <article className="price-card">
          <h3>Studio</h3>
          <p className="price">
            <span>{p.studio.monthly}</span>
            <span className="price-per">
              /mo &middot; or {p.studio.yearly}/yr
            </span>
          </p>
          <ul>
            <li>Everything in Pro</li>
            <li>Per-instrument stems</li>
            <li>Commercial-use license</li>
            <li>Priority render queue</li>
            <li>
              3-minute tracks <span className="soon">Phase 2</span>
            </li>
            <li>
              Plugin &amp; Live beta <span className="soon">Phase 3</span>
            </li>
          </ul>
          <a className="btn btn-ghost btn-block" href="#beta">
            Get Studio
          </a>
        </article>
      </div>
      <p className="pricing-note">
        Launch offer: 7-day Pro trial unlocks after your first shared track.
        Friends who join from your share link earn you bonus renders. Regional
        pricing because a beat from Indore is worth the same as one from
        Indiana.
      </p>
    </section>
  );
}
