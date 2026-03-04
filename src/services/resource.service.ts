import { DateTime } from "luxon";
import { ScheduleInterface } from "../types/interface/schedule.interface";
import { timeString } from "../types/common.type";
import { TechnicianInterface } from "../types/interface/technician.interface";
import { EquipmentInterface } from "../types/interface/equipment.interface";
import { FindSlotInterface } from "../types/interface/resource.interface";
import { shiftTimeByMinutes } from "../utils/time.utils";

export function isResourceAvailable(
  schedule: ScheduleInterface[],
  resource: TechnicianInterface | EquipmentInterface,
  start: timeString,
  end: timeString,
  type: "technician" | "equipment",
): boolean {
  const startTime = DateTime.fromISO(start);
  const endTime = DateTime.fromISO(end);
  for (const item of schedule) {
    const itemStart = DateTime.fromISO(item.startTime);
    const itemEnd = DateTime.fromISO(item.endTime);

    const overlap = startTime < itemEnd && endTime > itemStart;
    if (overlap) {
      if (type === "technician" && item.technicianId === resource.id) {
        return false;
      }
      if (type === "equipment" && item.equipmentId === resource.id) {
        return false;
      }
    }
  }
  return true;
}

export function findNextAvailableSlot(
  schedule: ScheduleInterface[],
  technician: TechnicianInterface,
  equip: EquipmentInterface,
  startTime: timeString,
  duration: number,
  techEnd: DateTime,
): FindSlotInterface | null {
  let currentStart = startTime;
  let currentEnd = shiftTimeByMinutes(currentStart, duration);

  while (DateTime.fromISO(currentEnd) <= techEnd) {
    if (
      isResourceAvailable(schedule, technician, currentStart, currentEnd, "technician") &&
      isResourceAvailable(schedule, equip, currentStart, currentEnd, "equipment")
    ) {
      return { startTime: currentStart, endTime: currentEnd };
    }
    currentStart = shiftTimeByMinutes(currentStart, 1);
    currentEnd = shiftTimeByMinutes(currentStart, duration);
  }
  return null;
}
