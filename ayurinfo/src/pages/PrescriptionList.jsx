import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './PrescriptionList.css'; // Import the new CSS file

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/prescriptions");
        setPrescriptions(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch prescriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="prescription-list-container">
      <h2 className="list-title">Prescriptions</h2>
      {prescriptions.length === 0 && <p className="no-prescriptions-message">No prescriptions found</p>}
      
      <ul className="prescription-list">
        {prescriptions.map((p) => (
          <li
            key={p._id}
            className="prescription-card"
          >
            <Link
              to={`/prescriptions/${p._id}`}
            >
              <h3>Dosage: {p.dosage}</h3>
              <p>Method: {p.consumingMethod}</p>
              <p>Duration: {p.courseDuration}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrescriptionList;