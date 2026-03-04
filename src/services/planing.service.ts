import { DateTime } from "luxon";
import { AssignInterface } from "../types/interface/assign.interface";
import { EquipmentInterface } from "../types/interface/equipment.interface";
import { SampleInterface } from "../types/interface/sample.interface";
import { ScheduleInterface } from "../types/interface/schedule.interface";
import { TechnicianInterface } from "../types/interface/technician.interface";
import { timeString } from "../types/common.type";
import { findNextAvailableSlot } from "./resource.service";
import { isTechnicianCompatible } from "./technician.service";
import { isEquipmentCompatible } from "./equipment.service";
import { MetricsInterface } from "../types/interface/metrics.interface";

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
