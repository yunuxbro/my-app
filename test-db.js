const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

console.log('MONGODB_URI present:', !!MONGODB_URI);

async function test() {
  if (!MONGODB_URI) {
    console.error('ERROR: MONGODB_URI is missing');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('SUCCESS: Connected to MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('FAILURE: Could not connect to MongoDB');
    console.error(err);
    process.exit(1);
  }
}

test();
