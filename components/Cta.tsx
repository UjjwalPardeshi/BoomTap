"use client";

import { useState } from "react";

type Status = { message: string; error: boolean } | null;

export default function Cta() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus({
        message: "That email doesn't look right — one more try?",
        error: true,
      });
      return;
    }
    setStatus({
      message:
        "You're on the list. We'll write when the beta opens — no spam, just beats.",
      error: false,
    });
    setEmail("");
  }

  return (
    <section className="section section-cta" id="beta">
      <p className="sticker" aria-hidden="true">
        #MadeWithMyMouth
      </p>
      <h2 className="cta-title">
        Your voice memos
        <br />
        deserve a producer
      </h2>
      <form className="beta-form" onSubmit={onSubmit} noValidate>
        <label className="visually-hidden" htmlFor="beta-email">
          Email address
        </label>
        <input
          type="email"
          id="beta-email"
          name="email"
          placeholder="you@wherever.com"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Get early access
        </button>
      </form>
      <p
        className={`form-status${status?.error ? " is-error" : ""}`}
        role="status"
        aria-live="polite"
      >
        {status?.message ?? ""}
      </p>
      <p className="cta-fine">
        iOS 16+ (iPhone 11 or newer) &middot; India + US first &middot; Android
        next
      </p>
    </section>
  );
}
