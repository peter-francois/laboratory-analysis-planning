import { DateTime } from "luxon";
import { ScheduleInterface } from "../types/interface/schedule.interface";
import { timeString } from "../types/common.type";
import { TechnicianInterface } from "../types/interface/technician.interface";
import { EquipmentInterface } from "../types/interface/equipment.interface";
import { SampleTypeEnum } from "../types/enum/sample.enum";
import { TechnicianSpecialityEnum } from "../types/enum/technician.enum";

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

export function isTechnicianCompatible(
  technician: TechnicianInterface,
  sampleType: SampleTypeEnum,
): boolean {
  return (
    technician.speciality as string === sampleType ||
    technician.speciality === TechnicianSpecialityEnum.GENERAL
  );
}

export function isEquipmentCompatible(
    equipment: EquipmentInterface,
    sampleType: SampleTypeEnum
): boolean{
    return (equipment.type as string) === (sampleType as string)
}