import { EquipmentInterface } from "./equipment.interface";
import { SampleInterface } from "./sample.interface";
import { TechnicianInterface } from "./technician.interface";

export interface InputInterface {
  samples: SampleInterface[];
  technicians: TechnicianInterface[];
  equipment: EquipmentInterface[];
}
