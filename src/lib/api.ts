// src/lib/api.ts
import type { Payload, Rocket, Launchpad } from "@/types/launch";
const BASE_URL = "https://api.spacexdata.com/v4";

export async function getAllLaunches() {
  const res = await fetch(`${BASE_URL}/launches`);
  if (!res.ok) throw new Error("Failed to fetch launches");
  return res.json();
}

export async function getAllPayloads() {
  const res = await fetch(`${BASE_URL}/payloads`);
  if (!res.ok) throw new Error("Failed to fetch payloads");
  const payloads: Payload[] = await res.json();
  const payloadMap: Record<string, Payload> = {};
  for (const payload of payloads) {
    payloadMap[payload.id] = payload;
  }
  return payloadMap;
}

export async function getAllRockets() {
  const res = await fetch(`${BASE_URL}/rockets`);
  if (!res.ok) throw new Error("Failed to fetch rockets");
  const rockets: Rocket[] = await res.json();
  const rocketMap: Record<string, Rocket> = {};
  for (const rocket of rockets) {
    rocketMap[rocket.id] = rocket;
  }
  return rocketMap;
}

export async function getAllLaunchpads() {
  const res = await fetch(`${BASE_URL}/launchpads`);
  if (!res.ok) throw new Error("Failed to fetch launchpads");
  const launchpads: Launchpad[] = await res.json();
  const launchpadMap: Record<string, Launchpad> = {};
  for (const launchpad of launchpads) {
    launchpadMap[launchpad.id] = launchpad;
  }
  return launchpadMap;
}
