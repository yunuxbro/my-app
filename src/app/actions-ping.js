"use server";

export async function ping() {
  return { success: true, message: "PONG" };
}
