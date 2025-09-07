import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlantList from "./pages/PlantList";
import PlantDetail from "./pages/PlantDetail";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
          <Hero/>
          <Features/>
          </>
          } />
          <Route path="/plants" element={<PlantList />} />
          <Route path="/plants/:id" element={<PlantDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
