const mongoose = require('mongoose');

// Extracted from .env.local
const MONGODB_URI = "mongodb+srv://yuhan2008thasmal_db_user:Yuhan2008Thasmal.fndpnup.mongodb.net/NexusCore?retryWrites=true&w=majority";

async function test() {
  console.log('Attempting to connect to:', MONGODB_URI);
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('SUCCESS: Connected to MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('FAILURE: Could not connect to MongoDB');
    console.error(err.message);
    process.exit(1);
  }
}

test();
