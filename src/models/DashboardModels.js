import mongoose from 'mongoose';

const SurvivorSchema = new mongoose.Schema({
  identity_code: { type: String, required: true, unique: true },
  full_name: { type: String, required: true },
  duty: { type: String, required: true },
  clearance: { 
    type: String, 
    required: true,
    enum: ['ALPHA', 'BETA', 'GAMMA', 'OMEGA']
  },
  status: { 
    type: String, 
    enum: ['Active', 'Quarantine', 'Discharged'],
    default: 'Active' 
  },
  created_at: { type: Date, default: Date.now }
});

SurvivorSchema.index({ created_at: -1 });

const PolicySchema = new mongoose.Schema({
  title: { type: String, required: true },
  domain: { type: String, required: true },
  severity: { 
    type: String, 
    required: true,
    enum: ['Low', 'Medium', 'High', 'Critical']
  },
  status: { 
    type: String, 
    enum: ['Draft', 'Review', 'Enforced'],
    default: 'Draft' 
  },
  created_at: { type: Date, default: Date.now }
});

PolicySchema.index({ created_at: -1 });

// Check if models are already compiled
export const Survivor = mongoose.models.Survivor || mongoose.model('Survivor', SurvivorSchema);
export const Policy = mongoose.models.Policy || mongoose.model('Policy', PolicySchema);
