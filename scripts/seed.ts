// scripts/seed.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import your models
// (Adjust these paths if your models are in a different folder)
import User from '../models/User'; 
import Passenger from '../models/Passenger';
import Turnstile from '../models/Turnstile';
import Admin from '../models/Admin';
import Station from '../models/Station';
import Trip from '../models/Trip';

// Load environment variables (so we can read MONGODB_CONNECTION_STRING)
dotenv.config({ path: '.env.local' });

const STATIONS = [
  { name: 'North Avenue', slug: 'north-ave', orderIndex: 1 },
  { name: 'Quezon Avenue', slug: 'quezon-ave', orderIndex: 2 },
  { name: 'GMA Kamuning', slug: 'kamuning', orderIndex: 3 },
  { name: 'Araneta Center-Cubao', slug: 'cubao', orderIndex: 4 },
  { name: 'Santolan-Annapolis', slug: 'santolan', orderIndex: 5 },
  { name: 'Ortigas', slug: 'ortigas', orderIndex: 6 },
  { name: 'Shaw Boulevard', slug: 'shaw', orderIndex: 7 },
  { name: 'Boni', slug: 'boni', orderIndex: 8 },
  { name: 'Guadalupe', slug: 'guadalupe', orderIndex: 9 },
  { name: 'Buendia', slug: 'buendia', orderIndex: 10 },
  { name: 'Ayala', slug: 'ayala', orderIndex: 11 },
  { name: 'Magallanes', slug: 'magallanes', orderIndex: 12 },
  { name: 'Taft Avenue', slug: 'taft', orderIndex: 13 },
];

async function seed() {
  if (!process.env.MONGODB_CONNECTION_STRING) {
    throw new Error('MONGODB_CONNECTION_STRING is missing in .env.local');
  }

  try {
    console.log('Connecting to MongoDB');
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    
    console.log('Clearing existing data');
    await User.deleteMany({});
    await Station.deleteMany({});
    await Trip.deleteMany({});

    console.log('🚉 Seeding Stations...');
    await Station.insertMany(STATIONS);

    console.log('Seeding Users');
    
    // create admin
    await Admin.create({
      username: 'admin',
      password: 'admin123', // TODO: HASH THE PASSWORD
      role: 'ADMIN'
    });


    console.log('Database Seeded Successfully!');

  } catch (error) {
    console.error('Seeding Failed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seed();