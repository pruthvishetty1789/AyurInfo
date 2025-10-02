import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './AilmentList.css'; // Import the CSS file

const AilmentList = () => {
  const [ailments, setAilments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAilments = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/ailments");
        setAilments(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch ailments");
      } finally {
        setLoading(false);
      }
    };

    fetchAilments();
  }, []);

  if (loading)
    return <p className="ailment-loading">Loading...</p>;
  if (error)
    return <p className="ailment-error">{error}</p>;

  return (
    <div className="ailment-list-container">
      <h2 className="ailment-list-title">Ailments</h2>
      {ailments.length === 0 && <p className="ailment-no-found">No ailments found</p>}
      <div className="ailment-grid">
        {ailments.map((a) => (
          <Link
            to={`/ailments/${a._id}`}
            key={a._id}
            className="ailment-card" // Apply the CSS class here
          >
            <h3>{a.ailmentName}</h3>
            {a.description && <p>{a.description}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AilmentList;