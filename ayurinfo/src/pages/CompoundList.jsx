import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './CompoundList.css'; // Import the CSS file

const CompoundList = () => {
  const [compounds, setCompounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    axios.get("http://localhost:5000/api/compounds")
      .then(res => setCompounds(res.data))
      .catch(err => {
        console.error("Failed to fetch compounds:", err);
        setError("Failed to load compounds. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="compound-list-container">
      <h2 className="compound-list-title">🧪 Compounds</h2>
      
      {loading && <p className="loading-message">Loading compounds...</p>}
      
      {error && <p className="loading-message" style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && compounds.length === 0 && (
        <p className="loading-message">No compounds found.</p>
      )}

      {!loading && !error && compounds.length > 0 && (
        <div className="compound-grid">
          {compounds.map(compound => (
            <div key={compound._id} className="compound-card">
              <h3>{compound.compoundName}</h3>
              {compound.healingProperties?.length > 0 && (
                <ul>
                  {compound.healingProperties.slice(0, 3).map((prop, idx) => ( // Show max 3 properties
                    <li key={idx}>{prop}</li>
                  ))}
                  {compound.healingProperties.length > 3 && <li>...</li>}
                </ul>
              )}
              <Link to={`/compounds/${compound._id}`} className="detail-link">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



export default CompoundList;