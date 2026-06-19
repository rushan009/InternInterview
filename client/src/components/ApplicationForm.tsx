import { useState } from "react";
import type { CreateApplicationInput, UpdateApplicationInput, Application, JobType, Status } from "../types/application.types";
import { createApplication, updateApplication } from "../services/api";
interface ApplicationFormProps {
  onClose: () => void;
  onApplicationAdded?: () => void; // Add this prop to refresh the application list
  application?: Application; // Add this prop to pre-fill the form with existing application data

}

export default function ApplicationForm({ onClose, onApplicationAdded, application }: ApplicationFormProps) {
    const isEditing = !!application; // Check if we are editing an existing application
    const [data, setData] = useState({
        company_name: isEditing ? application.company_name : "",
        job_title: isEditing ? application.job_title : "",
        job_type: isEditing ? application.job_type : "Full_time",
        status: isEditing ? application.status : "Applied",
        applied_date: isEditing ? new Date(application.applied_date).toISOString().split('T')[0] : "",
        notes: isEditing ? (application.notes || "") : "",
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  console.log(data);

  try {
    if (isEditing) {
      await updateApplication(application.id, data as UpdateApplicationInput);
    } else {
      await createApplication(data as CreateApplicationInput);
    }
    onClose();
    onApplicationAdded?.();
  } catch (err) {
    console.error(err);
  }
};

    return (

      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? "Edit Application" : "Add Application"}
          </h2>
          <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Corp"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.company_name}
                onChange={(e) => setData({...data, company_name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                placeholder="e.g. UX Designer"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.job_title}
                onChange={(e) => setData({...data, job_title: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={data.job_type}
                onChange={(e) => setData({...data, job_type: e.target.value as JobType})}
              >
                <option value="Full_time">Full Time</option>
<option value="Internship">Internship</option>
<option value="Part_time">Part Time</option>

              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={data.status}
                onChange={(e) => setData({...data, status: e.target.value as Status})}
              >
                <option>Applied</option>
                <option>Interviewing</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Applied Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={data.applied_date}
              onChange={(e) => setData({...data, applied_date: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              placeholder="Any additional details about the application process, referral info, or specific requirements..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
              value={data.notes}
              onChange={(e) => setData({...data, notes: e.target.value})}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors" onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
  
  );
}
