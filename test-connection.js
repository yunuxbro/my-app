const mongoose = require('mongoose');

// Extracted from verified .env.local
const MONGODB_URI = "mongodb+srv://yuhan2008thasmal_db_user:Yuhan2008Thasmal@fndpnup.mongodb.net/NexusCore?retryWrites=true&w=majority";

async function test() {
  console.log('Final Handshake Attempt...');
  try {
    // Attempt connection with a short timeout to prevent hanging
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000
    });
    console.log('STATUS: CORE_LINK_SECURED');
    console.log('SUCCESS: Handshake verified with Cluster [fndpnup]');
    process.exit(0);
  } catch (err) {
    console.error('STATUS: CORE_LINK_SEVERED');
    console.error('ERROR_LOG:', err.message);
    process.exit(1);
  }
}

test();
