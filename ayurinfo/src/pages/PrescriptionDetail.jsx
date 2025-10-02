import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom"; // Added Link for potential navigation
import './PrescriptionDetail.css'; // Import the new CSS file

const PrescriptionDetail = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/prescriptions/${id}`);
        setPrescription(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch prescription");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [id]);

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!prescription) return <p className="not-found-message">Prescription not found</p>;

  return (
    <div className="prescription-detail-container">
      {/* Optional: Add a back button here using Link */}
      {/* <Link to="/prescriptions" className="back-link">
        &larr; Back to Prescriptions
      </Link> */}
      
      <div className="prescription-detail-card">
        <h2 className="prescription-detail-title">Prescription Details</h2>
        
        <p className="detail-item">
          <strong>Dosage:</strong> {prescription.dosage}
        </p>
        
        <p className="detail-item">
          <strong>Method:</strong> {prescription.consumingMethod}
        </p>
        
        <p className="detail-item">
          <strong>Duration:</strong> {prescription.courseDuration}
        </p>
        
        {/* You can add more details here if your API returns them */}
      </div>
    </div>
  );
};

export default PrescriptionDetail;