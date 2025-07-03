import { useEffect, useState } from "react";
import { getAllLaunches, getAllPayloads, getAllRockets, getAllLaunchpads } from "../lib/api";
import type { Launch, Payload, Rocket, Launchpad } from "../types/launch";
import Logo from "@/assets/Logo.png";

export default function Dashboard() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [payloadMap, setPayloadMap] = useState<Record<string, Payload>>({});
  const [rocketMap, setRocketMap] = useState<Record<string, Rocket>>({});
  const [launchpadMap, setLaunchpadMap] = useState<Record<string, Launchpad>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [launchData, payloads, rockets, launchpads] = await Promise.all([
          getAllLaunches(),
          getAllPayloads(),
          getAllRockets(),
          getAllLaunchpads(),
        ]);
        setLaunches(launchData);
        setPayloadMap(payloads);
        setRocketMap(rockets);
        setLaunchpadMap(launchpads);
      } catch (err) {
        setError("Failed to fetch launches, payloads, rockets, or launchpads." + err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mb-6">
        <img src={Logo} alt="Logo" className="my-4" style={{ width: 260, height: 32 }} />
        <div className="w-full h-px bg-gray-300 rounded" />
      </div>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8">


        {loading && <p>Loading launches...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && launches.length > 0 && (
          <div className="w-full overflow-x-auto rounded-lg shadow border bg-white">
            <table className="min-w-[600px] w-full table-auto text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">No.</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Launched (UTC)</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Location</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Mission</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Orbit</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Launch Status</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3">Rocket</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {launches.map((launch, index) => {
                  // Get the first payload's orbit if available
                  let orbit = "N/A";
                  const firstPayloadId = launch.payloads?.[0];
                  if (firstPayloadId && payloadMap[firstPayloadId]) {
                    orbit = payloadMap[firstPayloadId].orbit || "N/A";
                  }
                  // Get the rocket name if available
                  let rocketName = "N/A";
                  if (launch.rocket && rocketMap[launch.rocket]) {
                    rocketName = rocketMap[launch.rocket].name || "N/A";
                  }
                  // Get the launchpad name if available
                  let launchpadName = "Unknown";
                  if (launch.launchpad && launchpadMap[launch.launchpad]) {
                    launchpadName = launchpadMap[launch.launchpad].name || "Unknown";
                  }
                  return (
                    <tr key={launch.id} className="hover:bg-gray-50">
                      <td className="px-2 sm:px-4 py-2 sm:py-3">{index + 1}</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        {new Date(launch.date_utc).toUTCString()}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        {launchpadName}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">{launch.name}</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">{orbit}</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium
                          ${launch.upcoming
                              ? "bg-yellow-100 text-yellow-800"
                              : launch.success
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                        >
                          {launch.upcoming
                            ? "Upcoming"
                            : launch.success
                              ? "Success"
                              : "Failed"}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">{rocketName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && launches.length === 0 && (
          <p className="text-gray-500 mt-4">No launches found.</p>
        )}
      </div>
    </>
  );
}
