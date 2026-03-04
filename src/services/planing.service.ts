import { DateTime } from "luxon";
import { TechnicianSpecialityEnum } from "../types/enum/technician.enum";
import { AssignInterface } from "../types/interface/assign.interface";
import { EquipmentInterface } from "../types/interface/equipment.interface";
import { SampleInterface } from "../types/interface/sample.interface";
import { ScheduleInterface } from "../types/interface/schedule.interface";
import { TechnicianInterface } from "../types/interface/technician.interface";
import { shiftTimeByMinutes } from "../utils/time.utils";
import { timeString } from "../types/common.type";
import { isResourceAvailable } from "./resource.service";
import { isTechnicianCompatible } from "./technician.service";

export function assignSampleToResources(
  sample: SampleInterface,
  technicians: TechnicianInterface[],
  equipment: EquipmentInterface[],
  schedule: ScheduleInterface[],
): AssignInterface | null {
  const sampleArrival = sample.arrivalTime;
  const sampleDuration = sample.analysisTime;

  for (const technician of technicians) {
    if (!isTechnicianCompatible(technician, sample.type)) continue;

    const techStart = DateTime.fromISO(technician.startTime);
    const techEnd = DateTime.fromISO(technician.endTime);
    let currentStartTime = DateTime.max(DateTime.fromISO(sampleArrival), techStart).toFormat(
      "HH:mm",
    ) as timeString;
    let currentEndTime = shiftTimeByMinutes(currentStartTime, sampleDuration);
    if (DateTime.fromISO(currentEndTime) > techEnd) {
      continue;
    }

    for (const equip of equipment) {
      if ((equip.type as string) !== (sample.type as string)) continue;

      while (
        (!isResourceAvailable(
          schedule,
          technician,
          currentStartTime,
          currentEndTime,
          "technician",
        ) ||
          !isResourceAvailable(schedule, equip, currentStartTime, currentEndTime, "equipment")) &&
        DateTime.fromISO(currentEndTime) <= techEnd
      ) {
        currentStartTime = shiftTimeByMinutes(currentStartTime, 1);
        currentEndTime = shiftTimeByMinutes(currentStartTime, sampleDuration);
      }

      if (
        isResourceAvailable(schedule, technician, currentStartTime, currentEndTime, "technician") &&
        isResourceAvailable(schedule, equip, currentStartTime, currentEndTime, "equipment") &&
        DateTime.fromISO(currentEndTime) <= techEnd
      ) {
        return {
          technicianId: technician.id,
          equipmentId: equip.id,
          startTime: currentStartTime,
          endTime: currentEndTime,
        };
      }
    }
  }
  return null;
}
