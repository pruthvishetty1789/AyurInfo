import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './CompoundDetail.css'; // Import the new CSS file

const CompoundDetail = () => {
  const { id } = useParams();
  const [compound, setCompound] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/compounds/${id}`)
      .then(res => setCompound(res.data))
      .catch(err => {
          console.error(err);
          // Set a distinct error state if needed, but for simplicity, we'll just log and rely on !compound check
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="loading-message">Loading...</p>;
  if (!compound) return <p className="not-found-message">Compound not found</p>;

  return (
    <div className="compound-detail-container">
      <Link to="/compounds" className="back-link">
        &larr; Back to Compounds
      </Link>
      
      <div className="compound-detail-card">
        <h2 className="compound-detail-title">{compound.compoundName}</h2>
        
        {compound.healingProperties?.length > 0 && (
          <>
            <h4 style={{ color: "#2c3e50", marginBottom: "0.8rem" }}>Healing Properties:</h4>
            <ul className="healing-properties-list">
              {compound.healingProperties.map((prop, idx) => (
                <li key={idx}>{prop}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default CompoundDetail;