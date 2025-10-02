import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import './AilmentDetail.css'; // Import the new CSS file

const AilmentDetail = () => {
  const { id } = useParams();
  const [ailment, setAilment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAilment = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/ailments/${id}`);
        setAilment(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch ailment");
      } finally {
        setLoading(false);
      }
    };

    fetchAilment();
  }, [id]);

  if (loading)
    return <p className="loading-message">Loading...</p>;
  if (error)
    return <p className="error-message">{error}</p>;
  if (!ailment)
    return <p className="not-found-message">Ailment not found</p>;

  return (
    <div className="ailment-detail-container">
      <Link to="/ailments" className="back-link">
        &larr; Back to Ailments
      </Link>
      <div className="ailment-detail-card">
        <h2 className="ailment-detail-title">{ailment.ailmentName}</h2>
        
        {ailment.description && <p className="ailment-detail-description">{ailment.description}</p>}

        <h4 className="symptoms-title">Common Symptoms:</h4>
        {ailment.commonSymptoms && ailment.commonSymptoms.length > 0 ? (
          <ul className="symptoms-list">
            {ailment.commonSymptoms.map((symptom, idx) => (
              <li key={idx}>{symptom}</li>
            ))}
          </ul>
        ) : (
          <p className="no-symptoms-text">No symptoms listed</p>
        )}
      </div>
    </div>
  );
};

export default AilmentDetail;