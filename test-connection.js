const mongoose = require('mongoose');

// Manually extracted from .env.local to bypass dotenv issues
const MONGODB_URI = "mongodb+srv://yuhan2008thasmal_db_user:Yuhan2008@cluster0.example.mongodb.net/nexuscore?retryWrites=true&w=majority";

async function test() {
  console.log('Attempting to connect to:', MONGODB_URI);
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 // 5 second timeout
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
