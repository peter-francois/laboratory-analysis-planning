import { DateTime } from "luxon";
import { AssignInterface } from "../types/interface/assign.interface";
import { EquipmentInterface } from "../types/interface/equipment.interface";
import { SampleInterface } from "../types/interface/sample.interface";
import { ScheduleInterface } from "../types/interface/schedule.interface";
import { TechnicianInterface } from "../types/interface/technician.interface";
import { timeString } from "../types/common.type";
import { isTechnicianCompatible } from "./technician.service";
import { isEquipmentCompatible } from "./equipment.service";
import { MetricsInterface } from "../types/interface/metrics.interface";
import { shiftTimeByMinutes } from "../utils/time.utils";
import { FindSlotInterface } from "../types/interface/resource.interface";
import { isResourceAvailable } from "./resource.service";

export function assignSampleToResources(
  sample: SampleInterface,
  technicians: TechnicianInterface[],
  equipment: EquipmentInterface[],
  schedule: ScheduleInterface[],
  metrics: MetricsInterface,
): AssignInterface | null {
  const sampleArrival = sample.arrivalTime;
  const sampleDuration = sample.analysisTime;

  for (const technician of technicians) {
    if (!isTechnicianCompatible(technician, sample.type)) continue;

    const techStart = DateTime.fromISO(technician.startTime);
    const techEnd = DateTime.fromISO(technician.endTime);
    const earliestStart = DateTime.max(DateTime.fromISO(sampleArrival), techStart).toFormat(
      "HH:mm",
    ) as timeString;

    for (const equip of equipment) {
      if (!isEquipmentCompatible(equip, sample.type)) continue;
      const slot = findNextAvailableSlot(
        schedule,
        technician,
        equip,
        earliestStart,
        sampleDuration,
        techEnd,
      );

      if (slot) {
        return {
          technicianId: technician.id,
          equipmentId: equip.id,
          startTime: slot.startTime,
          endTime: slot.endTime,
        };
      } else {
        metrics.conflicts += 1;
      }
    }
  }
  return null;
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