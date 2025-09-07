import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PlantDetail.css';
import axios from 'axios';

function PlantDetail() {
    const {id} = useParams();
    const [plant, setPlant] = useState(null);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/plants/id/${id}`)
            .then(response => {
                console.log('Plant data:', response.data); // Debug log
                setPlant(response.data);
                setLoading(false);
            })
            .catch(error => { 
                console.error('Error fetching plant data:', error);
                setError('Plant not found');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!plant) return <div className="error">Plant Not Found</div>;

    return (
        <div className="plant-detail">
            <Link to="/plants" className="btn-back">← Back to Plants</Link>
            <div className="plant-header">
            {plant.imageUrl && (
                <img 
                    src={plant.imageUrl} 
                    alt={plant.commonName} 
                    className='plant-img'
                    onError={(e) => {
                        e.target.style.display = 'none'; // Hide broken images
                    }}
                />
            )}
            
            <h2>{plant.commonName}</h2>
            <h3><em>~{plant.scientificName}</em></h3>
            </div>
            <p className="description">{plant.description}</p>
            
            <div className="plant-info-section">
                <h3>🌱 Plant Information</h3>
                <ul>
                    <li><strong>Regional Names:</strong>{plant.regionalNames?.join(',')||'N/A'}</li>
                    <li><strong>Habitat:</strong> {plant.habitat}</li>
                    <li><strong>Season:</strong> {plant.season}</li>
                    <li><strong>Parts Used:</strong> {plant.plantPartUsed?.join(', ') || 'N/A'}</li>
                </ul>
            </div>

            <div className="plant-info-section">
                <h3>✨ Healing Properties</h3>
                <ul>
                    {plant.healingProperties && plant.healingProperties.map((prop, idx) => (
                        <li key={idx}>{prop}</li>
                    ))}
                </ul>
            </div>

            <div className="plant-info-section">
                <h3>🧪 Active Compounds</h3>
                <ul>
                    {plant.compounds && plant.compounds.map((compound, idx) => (
                        <li key={idx}>
                            {compound}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="plant-info-section">
                <h3>🩺 Treated Ailments</h3>
                <ul>
                    {plant.ailments && plant.ailments.map((ailment, idx) => (
                        <li key={idx}>
                            {typeof ailment === 'object' ? ailment.ailmentName : ailment}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="plant-info-section">
                <h3>💊 Usage & Prescriptions</h3>
                <ul>
                    {plant.prescriptions && plant.prescriptions.map((prescription, idx) => (
                        <li key={idx}>
                            {typeof prescription === 'object' ? prescription.dosage : prescription}
                        </li>
                    ))}
                </ul>
            </div>

         </div>
    );
}

export default PlantDetail;