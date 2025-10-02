import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlantDetail from "./pages/PlantDetail";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import CompoundList from "./pages/CompoundList";

import CompoundDetail from "./pages/CompoundDetail";
import PlantList from "./pages/PlantList";
import AilmentList from "./pages/AilmentList";
import AilmentDetail from "./pages/AilmentDetail";
import PrescriptionList from "./pages/PrescriptionList";
import PrescriptionDetail from "./pages/PrescriptionDetail";
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
          
          {/* Plants page: shows both plant details + compounds */}
          <Route path="/plants" element={<PlantList />} />

          {/* Individual plant detail page */}
          <Route path="/plants/:id" element={<PlantDetail />} />

          {/* Individual compound detail page */}
            <Route path="/compounds" element={<CompoundList />} />
          <Route path="/compounds/:id" element={<CompoundDetail />} />
          <Route path="/ailments" element={<AilmentList />} />
          <Route path="/ailments/:id" element={<AilmentDetail />} />
           <Route path="/prescriptions" element={<PrescriptionList />} />
           <Route path="/prescriptions/:id" element={<PrescriptionDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
