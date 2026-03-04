import { timeString } from "../common.type";
import { TechnicianSpecialityEnum } from "../enum/technician.enum";

export interface TechnicianInterface {
  id: string;
  name?: string;
  speciality: TechnicianSpecialityEnum;
  startTime: timeString;
  endTime: timeString;
}
