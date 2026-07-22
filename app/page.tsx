import Compare from "@/components/Compare";
import Cta from "@/components/Cta";
import Demo from "@/components/Demo";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Modes from "@/components/Modes";
import Personas from "@/components/Personas";
import Pricing from "@/components/Pricing";
import Privacy from "@/components/Privacy";
import Problem from "@/components/Problem";
import RevealObserver from "@/components/RevealObserver";
import Roadmap from "@/components/Roadmap";
import Stats from "@/components/Stats";
import Ticker from "@/components/Ticker";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <Problem />
        <HowItWorks />
        <Demo />
        <Modes />
        <Stats />
        <Features />
        <Compare />
        <Personas />
        <Privacy />
        <Pricing />
        <Roadmap />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
