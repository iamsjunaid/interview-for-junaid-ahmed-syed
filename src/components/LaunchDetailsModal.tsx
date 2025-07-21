import React from "react";
import Modal from "./LaunchModal";
import type { Launch, Payload, Rocket, Launchpad } from "@/types/launch";

interface LaunchDetailsModalProps {
  open: boolean;
  onClose: () => void;
  launch: Launch | null;
  rocket?: Rocket;
  payload?: Payload;
  launchpad?: Launchpad;
}

const LaunchDetailsModal: React.FC<LaunchDetailsModalProps> = ({ open, onClose, launch, rocket, payload, launchpad }) => {
  if (!launch) return null;

  // Status
  let statusLabel = "";
  let statusClass = "";
  if (launch.upcoming) {
    statusLabel = "Upcoming";
    statusClass = "bg-yellow-100 text-yellow-800";
  } else if (launch.success) {
    statusLabel = "Success";
    statusClass = "bg-green-100 text-green-800";
  } else {
    statusLabel = "Failed";
    statusClass = "bg-red-100 text-red-800";
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="max-w-lg w-full bg-white rounded-md p-6 relative">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          {launch.links?.patch?.small && (
            <img src={launch.links.patch.small} alt={launch.name} className="w-16 h-16 rounded" />
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg">{launch.name}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}>{statusLabel}</span>
            </div>
            <div className="text-gray-500 text-xs">{rocket?.name || ""}</div>
          </div>
        </div>
        {/* Description */}
        {launch.details && (
          <div className="mb-4 text-gray-700 text-xs">
            {launch.details} {launch.links?.wikipedia && (
              <a href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">Wikipedia</a>
            )}
          </div>
        )}
        {/* Info Table */}
        <div className="">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b-1 border-gray-200 "><td className="font-medium p-2 text-gray-500 w-1/3">Flight Number</td><td className="p-2">{String(launch.flight_number ?? "")}</td></tr>
              <tr className="border-b-1 border-gray-200"><td className="font-medium p-2 w-1/2 text-gray-500">Mission Name</td><td className="p-2">{String(launch.name ?? "")}</td></tr>
              <tr className="border-b-1 border-gray-200"><td className="font-medium p-2 w-1/2 text-gray-500">Rocket Type</td><td className="p-2">{String(rocket?.type || "N/A")}</td></tr>
              <tr className="border-b-1 border-gray-200"><td className="font-medium p-2 w-1/2 text-gray-500">Rocket Name</td><td className="p-2">{String(rocket?.name ?? "N/A")}</td></tr>
              <tr className="border-b-1 border-gray-200"><td className="font-medium p-2 w-1/2 text-gray-500">Manufacturer</td><td className="p-2">{String(rocket?.company ?? "N/A")}</td></tr>
              <tr className="border-b-1 border-gray-200"><td className="font-medium p-2 w-1/2 text-gray-500">Nationality</td><td className="p-2">{String(rocket?.country ?? "N/A")}</td></tr>
              <tr className="border-b-1 border-gray-200"><td className="font-medium p-2 w-1/2 text-gray-500">Launch Date</td><td className="p-2">{new Date(launch.date_utc).toLocaleString()}</td></tr>
              <tr className="border-b-1 border-gray-200"><td className="font-medium p-2 w-1/2 text-gray-500">Payload Type</td><td className="p-2">{String(payload?.type ?? "N/A")}</td></tr>
              <tr className="border-b-1 border-gray-200"><td className="font-medium p-2 w-1/2 text-gray-500">Orbit</td><td className="p-2">{String(payload?.orbit ?? "N/A")}</td></tr>
              <tr className="border-b-1 border-gray-200"><td className="font-medium p-2 w-1/2 text-gray-500">Launch Site</td><td className="p-2">{String(launchpad?.name ?? "N/A")}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default LaunchDetailsModal; 