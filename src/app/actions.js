"use server";

import dbConnect from "@/lib/dbConnect";
import { Survivor, Policy } from "@/models/DashboardModels";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

// --- Connection Handshake ---
export async function getDbStatus() {
  try {
    await Promise.race([
      dbConnect(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("DB_TIMEOUT")), 5000))
    ]);
    return mongoose.connection.readyState;
  } catch (err) {
    console.error("Database connection fault:", err.message);
    return 0; // Disconnected
  }
}

// --- Survivor Actions ---
export async function fetchSurvivors() {
  try {
    await Promise.race([
      dbConnect(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("DB_TIMEOUT")), 5000))
    ]);
    const survivors = await Survivor.find({}).sort({ created_at: -1 }).lean();
    return JSON.parse(JSON.stringify(survivors));
  } catch (error) {
    console.error("Fetch survivors error:", error.message);
    return [];
  }
}

export async function createSurvivor(formData) {
  try {
    await dbConnect();
    const survivor = await Survivor.create(formData);
    revalidatePath("/dashboard/census");
    revalidatePath("/dashboard");
    return { success: true, data: JSON.parse(JSON.stringify(survivor)) };
  } catch (error) {
    console.error("Create survivor error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateSurvivor(id, update) {
  try {
    await dbConnect();
    const survivor = await Survivor.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    revalidatePath("/dashboard/census");
    revalidatePath("/dashboard");
    return { success: true, data: JSON.parse(JSON.stringify(survivor)) };
  } catch (error) {
    console.error("Update survivor error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteSurvivor(id) {
  try {
    await dbConnect();
    await Survivor.findByIdAndDelete(id);
    revalidatePath("/dashboard/census");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Delete survivor error:", error);
    return { success: false, error: error.message };
  }
}

// --- Policy Actions ---
export async function fetchPolicies() {
  try {
    await Promise.race([
      dbConnect(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("DB_TIMEOUT")), 5000))
    ]);
    const policies = await Policy.find({}).sort({ created_at: -1 }).lean();
    return JSON.parse(JSON.stringify(policies));
  } catch (error) {
    console.error("Fetch policies error:", error.message);
    return [];
  }
}

export async function createPolicy(formData) {
  try {
    await dbConnect();
    const policy = await Policy.create(formData);
    revalidatePath("/dashboard/policies");
    revalidatePath("/dashboard");
    return { success: true, data: JSON.parse(JSON.stringify(policy)) };
  } catch (error) {
    console.error("Create policy error:", error);
    return { success: false, error: error.message };
  }
}

export async function updatePolicy(id, update) {
  try {
    await dbConnect();
    const policy = await Policy.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    revalidatePath("/dashboard/policies");
    revalidatePath("/dashboard");
    return { success: true, data: JSON.parse(JSON.stringify(policy)) };
  } catch (error) {
    console.error("Update policy error:", error);
    return { success: false, error: error.message };
  }
}

export async function deletePolicy(id) {
  try {
    await dbConnect();
    await Policy.findByIdAndDelete(id);
    revalidatePath("/dashboard/policies");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Delete policy error:", error);
    return { success: false, error: error.message };
  }
}
