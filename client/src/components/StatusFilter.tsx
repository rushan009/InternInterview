export default function StatusFilter({ setstatus, status }: { setstatus: (status: string) => void; status: string }) {
  const filters = ["All", "Applied", "Interviewing", "Offer", "Rejected"];

  return (
    <div className="flex gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === status
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => setstatus(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
