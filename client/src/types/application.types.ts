export type JobType = "Internship" | "Full_time" | "Part_time";

export type Status = "Applied" | "Interviewing" | "Offer" | "Rejected";

export interface Application {
  id: number;
  company_name: string;
  job_title: string;
  job_type: JobType;
  status: Status;
  applied_date: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}
export interface CreateApplicationInput {
  company_name: string;
  job_title: string;
  job_type: JobType;
  status?: Status;
  applied_date: string;
  notes?: string;
}
export interface UpdateApplicationInput {
  company_name?: string;
  job_title?: string;
  job_type?: JobType;
  status?: Status;
  applied_date?: string;
  notes?: string;
}
