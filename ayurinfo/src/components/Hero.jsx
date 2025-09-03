import React from "react";
import herbs from "../assets/hero.jpg"; // save your plant image here

function Hero() {
  return (
    <section className="hero">
      <h1>
        AyurInfo: Your Guide to <span>Ayurvedic Healing</span>
      </h1>
      <p>
        Empowering well-being through comprehensive, evidence-based knowledge
        on medicinal plants, their chemical components, and traditional
        remedies. Discover the ancient wisdom of Ayurveda at your fingertips.
      </p>
      <img src={herbs} alt="Medicinal plants" className="hero-img" />
    </section>
  );
}

export default Hero;
