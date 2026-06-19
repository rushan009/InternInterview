import { JobType, Status } from "@prisma/client";



// typescript types for the application routes for creating and updating applications and also for the filter that are going to come from the backend.
export interface CreateApplicationInput { 
  company_name:string
  job_title:string
  job_type:JobType
  status?:Status
  applied_date:string
  notes?:string      
}


export interface UpdateApplicationInput { 

  company_name?:string
  job_title?:string
  job_type?:JobType
  status?:Status
  applied_date?:string
  notes?:string      
}


export interface ApplicationFilters {
    status?:Status,
    search?:string,
    page?:string,
    limit?:string
}