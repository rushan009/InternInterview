import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import ApplicationTable from "../components/ApplicationTable";
import { useEffect, useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import type { Application } from "../types/application.types";
import { getAllapplication, deleteApplication } from "../services/api";

export default function HomePage() {
  const [showform, setShowform] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);

  const [applications, setApplications] = useState<Application[]>([]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getAllapplication();
      setApplications(data.data);
      console.log("data:", data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      console.log("Deleting application with id:", id);
      await deleteApplication(id);
      fetchApplications(); // Refresh the application list
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: loading-state data fetch
    fetchApplications();
  }, [refresh]);

  const refreshApplications = () => {
    setRefresh((prev) => prev + 1);
  };

  const appliedApplication = applications.length;
  const interviewApplication = applications.filter(app => app.status === "Interviewing").length;
  const offerApplication = applications.filter(app => app.status === "Offer").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Career Hub</h1>
            <div className="flex items-center gap-4">
              <SearchBar />
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setShowform(true)}
                disabled={loading}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Application
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm font-medium">Total Applied</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {loading ? (
                <span className="inline-block w-10 h-7 bg-gray-200 rounded animate-pulse" />
              ) : (
                appliedApplication
              )}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
            <p className="text-gray-600 text-sm font-medium">Interviews</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {loading ? (
                <span className="inline-block w-10 h-7 bg-gray-200 rounded animate-pulse" />
              ) : (
                interviewApplication
              )}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <p className="text-gray-600 text-sm font-medium">Offers</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {loading ? (
                <span className="inline-block w-10 h-7 bg-gray-200 rounded animate-pulse" />
              ) : (
                offerApplication
              )}
            </p>
          </div>
        </div>

        {/* Filters and Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Job Applications
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Manage and track your career opportunities in real-time
            </p>
            <StatusFilter />
          </div>

          {showform && (
            <>
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setShowform(false)}
              ></div>

              <div className="fixed inset-0 flex items-center justify-center z-50">
                <ApplicationForm onClose={() => setShowform(false)} onApplicationAdded={refreshApplications} />
              </div>
            </>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <svg
                className="w-8 h-8 text-blue-600 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z"
                />
              </svg>
              <p className="text-sm text-gray-500">Loading applications...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
              <p className="text-sm text-gray-500">No applications yet.</p>
              <p className="text-sm text-gray-400">Click "Add Application" to get started.</p>
            </div>
          ) : (
            <>
              <ApplicationTable applications={applications} onDelete={handleDelete} />

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing 1 to 6 of 24 applications
                </p>
                <div className="flex gap-1">
                  <button className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">
                    ←
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded">
                    1
                  </button>
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                    2
                  </button>
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                    3
                  </button>
                  <button className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">
                    →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}