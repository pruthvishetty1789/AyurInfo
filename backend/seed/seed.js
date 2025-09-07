// seed/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load models
import Plant from '../models/Plant.js';
import Ailment from '../models/Ailment.js';
import Compound from '../models/Compound.js';
import Prescription from '../models/Prescription.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load data
const plantsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'plants.json'), 'utf-8'));
const ailmentsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'ailments.json'), 'utf-8'));
const compoundsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'compounds.json'), 'utf-8'));
const prescriptionsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'prescriptions.json'), 'utf-8'));

const importData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Plant.deleteMany({});
    await Ailment.deleteMany({});
    await Compound.deleteMany({});
    await Prescription.deleteMany({});

    console.log('Existing data cleared');

    // Import new data
    await Ailment.insertMany(ailmentsData);
    await Compound.insertMany(compoundsData);
    await Prescription.insertMany(prescriptionsData);
    await Plant.insertMany(plantsData);

    console.log('Data imported successfully!');

    // Now run the mapping script
    console.log('Starting to map references...');
    
    // Import and run the mapping function
    const { default: mapReferences } = await import('./mapReferences.js');
    await mapReferences();

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear all data
    await Plant.deleteMany({});
    await Ailment.deleteMany({});
    await Compound.deleteMany({});
    await Prescription.deleteMany({});

    console.log('Data destroyed successfully!');
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

// Run based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}