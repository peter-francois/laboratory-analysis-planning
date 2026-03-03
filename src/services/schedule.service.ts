import { ISOTimeString } from "../types/common.type";
import { EquipmentInterface } from "../types/interface/equipment.interface";
import { InputInterface } from "../types/interface/input.interface";
import { SampleInterface } from "../types/interface/sample.interface";
import { ScheduleInterface } from "../types/interface/schedule.interface";
import { TechnicianInterface } from "../types/interface/technician.interface";
import { shiftTimeByMinutes } from "../utils/time.utils";

export function planifyLab(data: InputInterface): { schedule: ScheduleInterface[] } {
  const samples: SampleInterface[] = data.samples;
  const technicians: TechnicianInterface[] = data.technicians;
  const equipments: EquipmentInterface[] = data.equipment;
  const schedule: ScheduleInterface[] = [];
  for (const sample of samples) {
    schedule.push({
      sampleId: sample.id,
      technicianId: technicians[0].id,
      equipmentId: equipments[0].id,
      startTime: technicians[0].startTime,
      endTime: shiftTimeByMinutes(sample.arrivalTime, sample.analysisTime) as ISOTimeString,
      priority: sample.priority,
    });
  }
  return { schedule };
}
