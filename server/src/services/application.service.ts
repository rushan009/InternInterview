import prisma from "../config/prisma.config";
import { ApplicationFilters, CreateApplicationInput, UpdateApplicationInput } from "../types/application.types";

export const createApplication = async (data:CreateApplicationInput) =>{
    return await prisma.applications.create({data:{...data, applied_date: new Date(data.applied_date)}});
}


export const updateApplication = async (id: number, data: UpdateApplicationInput) => {
  const updateData: any = { ...data };
  
  if (data.applied_date) {
    updateData.applied_date = new Date(data.applied_date);
  }
  
  return await prisma.applications.update({
    where: { id },
    data: updateData,
  });
};


export const deleteApplication = async(id:number)=>{
    return await prisma.applications.delete({
        where:{id}
    });
}


export const getAllApplication = async (filters:ApplicationFilters) => {
    const {status, search} = filters

    const where:any = {};
    if (status) {
        where.status=status
    }

    if (search) {
        where.OR=[
            {company_name:{contains:search, mode:"insensitive"}},
            {job_title:{contains:search, mode:"insensitive"}}
        ]
    }
    return await prisma.applications.findMany({
        where,
        orderBy:{created_at:"desc"}
    })
}