/*
  Warnings:

  - You are about to drop the column `ticketStatus` on the `ReservationHistory` table. All the data in the column will be lost.
  - Added the required column `status` to the `ReservationHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ReservationHistory` DROP COLUMN `ticketStatus`,
    ADD COLUMN `status` ENUM('reserved', 'canceled') NOT NULL;
