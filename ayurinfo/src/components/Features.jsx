import React from "react";

const features = [
  {
    title: "Search Knowledge",
    desc: "Find information on plants, ingredients, ailments, and prescriptions with powerful filtering.",
    icon: "🔎",
  },
  {
    title: "Medicinal Plants",
    desc: "Dive into a vast database of Ayurvedic plants, their properties, and traditional uses.",
    icon: "🌿",
  },
  {
    title: "Ailments & Remedies",
    desc: "Discover Ayurvedic approaches to common ailments and their plant-based solutions.",
    icon: "💊",
  },
  {
    title: "Prescriptions Library",
    desc: "Access traditional Ayurvedic formulations and their application for various conditions.",
    icon: "📖",
  },
];

function Features() {
  return (
    <section className="features">
      <h2>Explore AyurInfo</h2>
      <div className="feature-grid">
        {features.map((f, index) => (
          <div className="feature-card" key={index}>
            <div className="icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
