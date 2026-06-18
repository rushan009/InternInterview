-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('Internship', 'Full_time', 'Part_time');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Applied', 'Interviewing', 'Offer', 'Rejected');

-- CreateTable
CREATE TABLE "applications" (
    "id" SERIAL NOT NULL,
    "company_name" VARCHAR(100) NOT NULL,
    "job_title" VARCHAR(100) NOT NULL,
    "job_type" "JobType" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Applied',
    "applied_date" DATE NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);
