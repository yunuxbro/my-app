"use server";

import dbConnect from "@/lib/dbConnect";
import { Survivor, Policy } from "@/models/DashboardModels";
import mongoose from "mongoose";

export async function getSystemDiagnostics() {
  try {
    // 1. Verify ENV
    const uri = process.env.MONGODB_URI;
    if (!uri) return { dbConnected: false, error: "ENV_MISSING" };

    // 2. Verify Connection
    await dbConnect();
    const readyState = mongoose.connection.readyState;
    
    // 3. Verify Data
    const sCount = await Survivor.countDocuments();
    const pCount = await Policy.countDocuments();

    return {
      dbConnected: readyState === 1,
      readyState,
      counts: { survivors: sCount, policies: pCount },
      error: null
    };
  } catch (err) {
    return { dbConnected: false, error: err.message };
  }
}
