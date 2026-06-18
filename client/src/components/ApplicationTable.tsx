

const getAvatarColor = (letter: string): string => {
  const colors: { [key: string]: string } = {
    G: "bg-blue-500",
    S: "bg-green-600",
    A: "bg-blue-300",
    M: "bg-red-600",
    F: "bg-blue-200",
    N: "bg-purple-500",
  };
  return colors[letter] || "bg-gray-500";
};


const getStatusColor = (status: string): string => {
  switch (status) {
    case "Applied":
      return "bg-blue-100 text-blue-800";
    case "Interviewing":
      return "bg-purple-100 text-purple-800";
    case "Offer":
      return "bg-green-100 text-green-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface ApplicationTableProps {
  applications: Application[];
  onDelete: (id: number) => void;
}




export default function ApplicationTable( { applications, onDelete }: ApplicationTableProps) {

    

  return (
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Company Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Job Title
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Type
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Applied Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Notes
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr
              key={app.id}
              className={`border-b border-gray-200 hover:bg-gray-50 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="px-6 py-4 text-sm">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${getAvatarColor(app.company_name[0])} flex items-center justify-center text-white font-semibold text-sm`}
                  >
                    {app.company_name[0]}
                  </div>
                  <span className="font-medium text-gray-900">{app.company_name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{app.job_title}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{app.job_type}</td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}
                >
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{new Date(app.applied_date).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{app.notes}</td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <button className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded">
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded" onClick={() => onDelete(app.id)}>
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3H4v2h16V7h-3z"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  }

