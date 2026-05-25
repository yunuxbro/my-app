const mongoose = require('mongoose');

// Extracted from LATEST .env.local
const MONGODB_URI = "mongodb+srv://yuhan2008thasmal_db_user:Thasmal2008Yuhan@nexuscore.fndpnup.mongodb.net/NexusCore?appName=nexuscore";

async function test() {
  console.log('Initiating Core Link Handshake with LATEST URI...');
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log('STATUS: CORE_LINK_SECURED');
    console.log('SUCCESS: Handshake verified with Cluster [nexuscore.fndpnup]');
    process.exit(0);
  } catch (err) {
    console.error('STATUS: CORE_LINK_SEVERED');
    console.error('ERROR_LOG:', err.message);
    process.exit(1);
  }
}

test();
