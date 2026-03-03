import { ISOTimeString } from "../types/common.type";
import { InputInterface } from "../types/interface/input.interface";
import { ScheduleInterface } from "../types/interface/schedule.interface";
import { shiftTimeByMinutes } from "../utils/time.utils";

export function planifyLab(data: InputInterface): { schedule: ScheduleInterface[] } {
  const { samples, technicians, equipment } = data;
  const schedule: ScheduleInterface[] = [];
  for (const sample of samples) {
    schedule.push({
      sampleId: sample.id,
      technicianId: technicians[0].id,
      equipmentId: equipment[0].id,
      startTime: technicians[0].startTime,
      endTime: shiftTimeByMinutes(sample.arrivalTime, sample.analysisTime) as ISOTimeString,
      priority: sample.priority,
    });
  }
  return { schedule };
}
