// seed/mapReferences.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Plant from '../models/Plant.js';
import Ailment from '../models/Ailment.js';
import Compound from '../models/Compound.js';
import Prescription from '../models/Prescription.js';

// Load environment variables
dotenv.config();

const mapReferences = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');

    // Get all reference documents
    const ailments = await Ailment.find({});
    const compounds = await Compound.find({});
    const prescriptions = await Prescription.find({});

    // Create mapping objects
    const ailmentMap = {};
    ailments.forEach(a => {
      ailmentMap[a.ailmentName] = a._id;
    });

    const compoundMap = {};
    compounds.forEach(c => {
      compoundMap[c.compoundName] = c._id;
    });

    const prescriptionMap = {};
    prescriptions.forEach(p => {
      prescriptionMap[p.dosage] = p._id;
    });

    console.log('Mapping objects created');
    console.log('Ailment Map:', ailmentMap);
    console.log('Compound Map:', compoundMap);
    console.log('Prescription Map:', prescriptionMap);

    // Update plants with ObjectID references
    const plants = await Plant.find({});
    console.log(`Found ${plants.length} plants to update`);
    
    let updatedCount = 0;

    for (const plant of plants) {
      let needsUpdate = false;
      
      // Map ailments
      if (plant.ailments && plant.ailments.length > 0 && typeof plant.ailments[0] === 'string') {
        plant.ailments = plant.ailments.map(ailmentName => 
          ailmentMap[ailmentName] || ailmentName
        );
        needsUpdate = true;
      }

      // Map compounds
      if (plant.compounds && plant.compounds.length > 0 && typeof plant.compounds[0] === 'string') {
        plant.compounds = plant.compounds.map(compoundName => 
          compoundMap[compoundName] || compoundName
        );
        needsUpdate = true;
      }

      // Map prescriptions
      if (plant.prescriptions && plant.prescriptions.length > 0 && typeof plant.prescriptions[0] === 'string') {
        plant.prescriptions = plant.prescriptions.map(prescriptionText => 
          prescriptionMap[prescriptionText] || prescriptionText
        );
        needsUpdate = true;
      }

      if (needsUpdate) {
        await plant.save();
        updatedCount++;
        console.log(`Updated plant: ${plant.commonName}`);
      }
    }

    console.log(`Successfully updated ${updatedCount} plants with ObjectID references!`);
    
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error mapping references:', error);
    process.exit(1);
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  mapReferences();
}

export default mapReferences;