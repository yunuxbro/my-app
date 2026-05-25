const mongoose = require('mongoose');

// Extracted from verified .env.local
const MONGODB_URI = "mongodb+srv://yuhan2008thasmal_db_user:Thasmal2008Yuhan@nexuscore.fndpnup.mongodb.net/NexusCore?appName=nexuscore";

const SurvivorSchema = new mongoose.Schema({
  identity_code: String,
  full_name: String,
  duty: String,
  clearance: String,
  status: String,
  created_at: { type: Date, default: Date.now }
});

const PolicySchema = new mongoose.Schema({
  title: String,
  domain: String,
  severity: String,
  status: String,
  created_at: { type: Date, default: Date.now }
});

async function checkData() {
  console.log('Querying Database for existing records...');
  try {
    await mongoose.connect(MONGODB_URI);
    
    const Survivor = mongoose.models.Survivor || mongoose.model('Survivor', SurvivorSchema);
    const Policy = mongoose.models.Policy || mongoose.model('Policy', PolicySchema);

    const sCount = await Survivor.countDocuments();
    const pCount = await Policy.countDocuments();

    console.log(`STATUS: DATA_AUDIT_COMPLETE`);
    console.log(`RECORDS FOUND: Survivors(${sCount}) | Policies(${pCount})`);
    
    if (sCount > 0) {
      const sample = await Survivor.findOne();
      console.log('SAMPLE_SURVIVOR:', sample.full_name);
    }
    
    process.exit(0);
  } catch (err) {
    console.error('STATUS: AUDIT_FAILED');
    console.error('ERROR:', err.message);
    process.exit(1);
  }
}

checkData();
