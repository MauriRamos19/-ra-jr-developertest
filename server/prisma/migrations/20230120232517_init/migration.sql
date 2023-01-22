-- CreateEnum
CREATE TYPE "VehicleStateEnumType" AS ENUM ('inside', 'outside');

-- CreateEnum
CREATE TYPE "VehicleEnumType" AS ENUM ('official', 'nonresidents');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "plate_number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amountParking" DOUBLE PRECISION DEFAULT 0,
    "state" "VehicleStateEnumType" DEFAULT 'inside',
    "type" "VehicleEnumType" DEFAULT 'nonresidents',

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InOutLogs" (
    "id" TEXT NOT NULL,
    "vehiceId" TEXT NOT NULL,
    "entryTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "departureTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InOutLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_number_key" ON "Vehicle"("plate_number");

-- AddForeignKey
ALTER TABLE "InOutLogs" ADD CONSTRAINT "InOutLogs_vehiceId_fkey" FOREIGN KEY ("vehiceId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
