// seed/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Load models
import Plant from '../models/Plant.js';
import Ailment from '../models/Ailment.js';
import Compound from '../models/Compound.js';
import Prescription from '../models/Prescription.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON data
const plantsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'plants.json'), 'utf-8'));
const ailmentsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'ailments.json'), 'utf-8'));
const compoundsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'compounds.json'), 'utf-8'));
const prescriptionsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'prescriptions.json'), 'utf-8'));

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected:', conn.connection.name);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Destroy all data
const destroyCollections = async () => {
  const deletedPlants = await Plant.deleteMany({});
  const deletedAilments = await Ailment.deleteMany({});
  const deletedCompounds = await Compound.deleteMany({});
  const deletedPrescriptions = await Prescription.deleteMany({});

  console.log('Deleted Plants:', deletedPlants.deletedCount);
  console.log('Deleted Ailments:', deletedAilments.deletedCount);
  console.log('Deleted Compounds:', deletedCompounds.deletedCount);
  console.log('Deleted Prescriptions:', deletedPrescriptions.deletedCount);
};

// Import new data
const importData = async () => {
  try {
    await connectDB();

    // Clear existing data first (without exiting)
    await destroyCollections();

    // Insert new data
    const insertedAilments = await Ailment.insertMany(ailmentsData);
    const insertedCompounds = await Compound.insertMany(compoundsData);
    const insertedPrescriptions = await Prescription.insertMany(prescriptionsData);
    const insertedPlants = await Plant.insertMany(plantsData);

    console.log('Inserted Ailments:', insertedAilments.length);
    console.log('Inserted Compounds:', insertedCompounds.length);
    console.log('Inserted Prescriptions:', insertedPrescriptions.length);
    console.log('Inserted Plants:', insertedPlants.length);

    console.log('Data imported successfully!');
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Run based on CLI argument
if (process.argv[2] === '-d') {
  // Only destroy
  connectDB().then(() => {
    destroyCollections().then(() => {
      console.log('All data destroyed successfully!');
      mongoose.connection.close();
      process.exit(0);
    });
  });
} else {
  importData();
}
