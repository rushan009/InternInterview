import { JobType, Status } from "../../generated/prisma/enums";

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
    search?:string
}