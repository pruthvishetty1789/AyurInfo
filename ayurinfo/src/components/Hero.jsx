import React from "react";
import herbs from "../assets/hero.jpg"; 
import './Hero.css'; // Import the new CSS file

function Hero() {
  return (
    <section className="hero">
      <div> {/* Wrap text content in a div for better alignment control */}
        <h1>
          AyurInfo: Your Guide to <span>Ayurvedic Healing</span>
        </h1>
        <p>
          Empowering well-being through comprehensive, evidence-based knowledge
          on medicinal plants, their chemical components, and traditional
          remédies. Discover the ancient wisdom of Ayurveda at your fingertips.
        </p>
      </div>
      <img src={herbs} alt="Medicinal plants" className="hero-img" />
    </section>
  );
}

export default Hero;