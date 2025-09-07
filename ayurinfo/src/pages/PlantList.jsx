import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PlantList.css';
import axios from 'axios';
function PlantList() {
   const [plants, setPlants] =useState([]);
   useEffect(() => {
        axios.get('http://localhost:5000/api/plants')
        .then(response =>
            setPlants(response.data))
        .catch(error =>
            console.error('Error fetching plant data:', error));
        },[]);
    return (
    <div className="plant-list">
         <h2>🌿 Ayurvedic Plants</h2>
            <div className="plant-grid">
                {plants.map(plant => (
                    <div key={plant._id} className="plant-card">
                        <img src={plant.imageUrl} alt={plant.commonName} />
                        <h3>{plant.commonName}</h3>
                        <p><em>{plant.scientificName}</em></p>
                        <Link to={`/plants/${plant._id}`} className="btn">View Details</Link>
                    </div>
                ))}
            </div>
    </div>
    );
}
export default PlantList;