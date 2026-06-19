import prisma from "../config/prisma.config.js";
import { ApplicationFilters, CreateApplicationInput, UpdateApplicationInput } from "../types/application.types.js";

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

export const getAllApplication = async (filters: ApplicationFilters) => {
  const { status, search, page = "1", limit = "3" } = filters;

  const where: any = {};
  if (status) where.status = status;
  if (search) where.OR = [
    { company_name: { contains: search, mode: "insensitive" } },
    { job_title: { contains: search, mode: "insensitive" } }
  ];

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const data = await prisma.applications.findMany({
    where,
    orderBy: { created_at: "desc" },
    skip,
    take: limitNum
  });

  const total = await prisma.applications.count({ where });

  return { 
    data, 
    total, 
    page: pageNum, 
    totalPages: Math.ceil(total / limitNum) 
  };
};



export const getApplicationById = async (id:number) =>{
    return await prisma.applications.findUnique({
        where:{id}
    });
}
