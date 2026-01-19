// scripts/seed.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import your models
import Admin from '../Models/Admin';
import Station from '../Models/Station';

// Load environment variables (so we can read MONGODB_CONNECTION_STRING)
dotenv.config({ path: '.env.local' });

const STATIONS = [
  { name: 'North Avenue', slug: 'north-ave', orderIndex: 1, distFromStartKm: 0},
  { name: 'Quezon Avenue', slug: 'quezon-ave', orderIndex: 2, distFromStartKm: 1.2},
  { name: 'Cubao', slug: 'cubao', orderIndex: 3, distFromStartKm: 3},
  { name: 'Santolan', slug: 'santolan', orderIndex: 4, distFromStartKm: 4.2},
  { name: 'Pasig', slug: 'pasig', orderIndex: 5, distFromStartKm: 5.4},
  { name: 'Shaw Boulevard', slug: 'shaw-boulevard', orderIndex: 6, distFromStartKm: 6.5},
  { name: 'Guadalupe', slug: 'guadalupe', orderIndex: 7, distFromStartKm: 8.5},
  { name: 'Buendia', slug: 'buendia', orderIndex: 8, distFromStartKm: 9.2},
  { name: 'Ayala', slug: 'ayala', orderIndex: 9, distFromStartKm: 11},
  { name: 'Magallanes', slug: 'magallanes', orderIndex: 10, distFromStartKm: 13.4},
  { name: 'Taft Avenue', slug: 'taft-ave', orderIndex: 11, distFromStartKm: 15},
];

async function seed() {
  if (!process.env.MONGODB_CONNECTION_STRING) {
    throw new Error('MONGODB_CONNECTION_STRING is missing in .env.local');
  }

  try {
    console.log('Connecting to MongoDB');
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    
    console.log('Clearing existing data');
    await Station.deleteMany({});

    console.log('🚉 Seeding Stations...');
    await Station.insertMany(STATIONS);

    console.log('Seeding Users');
    
    // create admin
    await Admin.create({
      username: 'admin2',
      password: 'admin123', // TODO: HASH THE PASSWORD'
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