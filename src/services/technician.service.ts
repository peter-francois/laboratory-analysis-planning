import { TechnicianSpecialityEnum } from "../types/enum/technician.enum";
import { TechnicianInterface } from "../types/interface/technician.interface";

export function isTechnicianCompatible(
  technician: TechnicianInterface,
  sampleType: string,
): boolean {
  return (
    technician.speciality === sampleType ||
    technician.speciality === TechnicianSpecialityEnum.GENERAL
  );
}
