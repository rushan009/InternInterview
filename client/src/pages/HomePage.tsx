import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import ApplicationTable from "../components/ApplicationTable";
import { useEffect, useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import type { Application } from "../types/application.types";
import { getAllapplication, deleteApplication } from "../services/api";

const ITEMS_PER_PAGE = 3;

export default function HomePage() {
    //shows the form when the add application button is clicked
    const [showform, setShowform] = useState(false);

    //state variable to trigger a refresh of the application list
    const [refresh, setRefresh] = useState(0);

    //for loading state when fetching applications
    const [loading, setLoading] = useState(false);

    //state variables for applications, pagination, search, and filters
    const [applications, setApplications] = useState<Application[]>([]);

    // State variables for pagination, search, and filters
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    

    //for debugging purposes, log the current search query and status filter
    console.log(searchQuery, statusFilter);
    console.log(applications);


  
// Function to fetch applications based on current filters and pagination
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getAllapplication(
        statusFilter === "All" ? undefined : statusFilter,
        searchQuery || undefined,
        currentPage,
        ITEMS_PER_PAGE,
      );
      setApplications(data.data);
      setTotalCount(data.total);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };


  // Function to handle deletion of an application while clicked on delte button in the table. It calls the deleteApplication API and then refreshes the application list.
  const handleDelete = async (id: number) => {
    try {
      console.log("Deleting application with id:", id);
      await deleteApplication(id);
      fetchApplications(); // Refresh the application list
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };


  //call the fetchApplications function whenever the refresh state, currentPage, searchQuery, or statusFilter changes. This ensures that the application list is always up-to-date with the latest data based on the current filters and pagination.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: loading-state data fetch
    fetchApplications();
  }, [refresh, currentPage, searchQuery, statusFilter]);

  const refreshApplications = () => {
    setRefresh((prev) => prev + 1);
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, statusFilter]);

  const appliedApplication = applications.length;
  const interviewApplication = applications.filter(
    (app) => app.status === "Interviewing",
  ).length;
  const offerApplication = applications.filter(
    (app) => app.status === "Offer",
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Career Hub</h1>
            <div className="flex items-center gap-4">
              <SearchBar onSearch={setSearchQuery} />
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
            <StatusFilter setstatus={setStatusFilter} status={statusFilter} />
          </div>

          {showform && (
            <>
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setShowform(false)}
              ></div>

              <div className="fixed inset-0 flex items-center justify-center z-50">
                <ApplicationForm
                  onClose={() => setShowform(false)}
                  onApplicationAdded={refreshApplications}
                />
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
              <p className="text-sm text-gray-400">
                Click "Add Application" to get started.
              </p>
            </div>
          ) : (
            <>
              <ApplicationTable
                applications={applications}
                onDelete={handleDelete}
                onApplicationAdded={refreshApplications}
                setStatusFilter={setStatusFilter}
              />

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing 1 to 3 of {totalCount} applications
                </p>
                <div className="flex gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-2 py-1 rounded disabled:opacity-50"
                  >
                    ←
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-2 py-1 rounded disabled:opacity-50"
                  >
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
