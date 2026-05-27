import { Survivor, Policy } from '../models/DashboardModels';

export async function seedDatabase() {
  const survivorCount = await Survivor.countDocuments();
  const policyCount = await Policy.countDocuments();

  if (survivorCount === 0) {
    console.log('Seeding Survivors...');
    await Survivor.insertMany([
      { identity_code: 'NX-001', full_name: 'Alexander Vance', duty: 'Strategic Command', clearance: 'OMEGA', status: 'Active' },
      { identity_code: 'NX-002', full_name: 'Elena Rossi', duty: 'Medical Research', clearance: 'ALPHA', status: 'Active' },
      { identity_code: 'NX-003', full_name: 'Marcus Thorne', duty: 'Security Ops', clearance: 'BETA', status: 'Active' },
      { identity_code: 'NX-004', full_name: 'Sarah Chen', duty: 'System Engineering', clearance: 'ALPHA', status: 'Quarantine' },
      { identity_code: 'NX-005', full_name: 'David Miller', duty: 'Logistics', clearance: 'GAMMA', status: 'Active' },
    ]);
  }

  if (policyCount === 0) {
    console.log('Seeding Policies...');
    await Policy.insertMany([
      { title: 'Resource Rationing Protocol', domain: 'Harvesting', severity: 'High', status: 'Enforced' },
      { title: 'Sector-7 Quarantine Directive', domain: 'Pulse', severity: 'Critical', status: 'Enforced' },
      { title: 'External Comms Blackout', domain: 'Telecom', severity: 'High', status: 'Enforced' },
      { title: 'Academic Revisionism Act', domain: 'Archive', severity: 'Medium', status: 'Review' },
      { title: 'General Mobilization Order', domain: 'Global', severity: 'High', status: 'Draft' },
    ]);
  }

  console.log('Seeding Complete.');
}
