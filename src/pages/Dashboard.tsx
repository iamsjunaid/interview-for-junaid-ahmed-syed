import { useEffect, useState } from "react";
import { getAllLaunches, getAllPayloads, getAllRockets, getAllLaunchpads } from "../lib/api";
import type { Launch, Payload, Rocket, Launchpad } from "../types/launch";
import { FilterDropdowns } from "@/components/FilterToggle";
import type { LaunchStatusFilter } from "@/components/FilterToggle";
import Logo from "@/assets/Logo.png";
import LaunchDetailsModal from "@/components/LaunchDetailsModal";
import { Spinner } from "@/components/ui/spinner";

export default function Dashboard() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [payloadMap, setPayloadMap] = useState<Record<string, Payload>>({});
  const [rocketMap, setRocketMap] = useState<Record<string, Rocket>>({});
  const [launchpadMap, setLaunchpadMap] = useState<Record<string, Launchpad>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<LaunchStatusFilter>("all");

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

  // Filter launches based on statusFilter
  const filteredLaunches: Launch[] = launches.filter((launch) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "upcoming") return launch.upcoming;
    if (statusFilter === "past") return !launch.upcoming;
    if (statusFilter === "success") return launch.success === true;
    if (statusFilter === "failed") return launch.success === false && !launch.upcoming;
    return true;
  });

  return (
    <>
      <div className="flex flex-col items-center mb-6">
        <img src={Logo} alt="Logo" className="my-4" style={{ width: 260, height: 32 }} />
        <div className="w-full h-px bg-gray-300 rounded" />
      </div>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-4">


        {error && <p className="text-red-500">{error}</p>}

        <FilterDropdowns selectedStatus={statusFilter} onStatusChange={setStatusFilter} />
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white">
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
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7}>
                    <div className="flex justify-center items-center h-64">
                      <Spinner size="large" show={true} />
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {filteredLaunches.length > 0
                    ? filteredLaunches.map((launch, index) => {
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
                          <tr key={launch.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedLaunch(launch); setDetailsModalOpen(true); }}>
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
                      })
                    : (
                      <tr>
                        <td colSpan={7}>
                          <div className="flex justify-center items-center h-64">
                            <p className="text-gray-500 text-center">No results found for the specified filter.</p>
                          </div>
                        </td>
                      </tr>
                    )
                  }
                </>
              )}
            </tbody>
          </table>
        </div>


      </div>

      <LaunchDetailsModal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        launch={selectedLaunch}
        rocket={selectedLaunch && selectedLaunch.rocket ? rocketMap[selectedLaunch.rocket] : undefined}
        payload={selectedLaunch && selectedLaunch.payloads && selectedLaunch.payloads[0] ? payloadMap[selectedLaunch.payloads[0]] : undefined}
        launchpad={selectedLaunch && selectedLaunch.launchpad ? launchpadMap[selectedLaunch.launchpad] : undefined}
      />
    </>
  );
}
