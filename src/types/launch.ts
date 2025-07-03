// launch.ts
// Placeholder for SpaceX launch types

export interface Payload {
  id: string;
  orbit?: string;
  [key: string]: unknown;
}

export interface Rocket {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface Launchpad {
  id: string;
  name?: string;
  [key: string]: unknown;
}

export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  upcoming: boolean;
  details?: string;
  payloads?: string[];
  rocket?: string;
  launchpad?: string;
  success?: boolean;
  [key: string]: unknown;
} 