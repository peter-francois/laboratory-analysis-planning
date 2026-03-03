import { EquipmentInterface } from "../types/interface/equipment.interface";
import { InputInterface } from "../types/interface/input.interface";
import { SampleInterface } from "../types/interface/sample.interface";
import { TechnicianInterface } from "../types/interface/technician.interface";
import { shiftTimeByMinutes } from "../utils/time.utils";

export function planifyLab(data: InputInterface): any {
  const samples: SampleInterface[] = data.samples;
  const technicians: TechnicianInterface[] = data.technicians;
  const equipments: EquipmentInterface[] = data.equipment;
  const schedule: any[] = [];
  for (const sample of samples) {
    schedule.push({
      sampleId: sample.id,
      technicianId: technicians[0].id,
      equipmentId: equipments[0].id,
      startTime: technicians[0].startTime,
      endTime: shiftTimeByMinutes(sample.arrivalTime, sample.analysisTime),
      priority: sample.priority,
    });
  }
  return { schedule };
}
