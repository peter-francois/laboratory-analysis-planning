import { SampleTypeEnum } from "../types/enum/sample.enum";
import { TechnicianSpecialityEnum } from "../types/enum/technician.enum";
import { TechnicianInterface } from "../types/interface/technician.interface";

export function isTechnicianCompatible(
  technician: TechnicianInterface,
  sampleType: SampleTypeEnum,
): boolean {
  return (
    technician.speciality as string === sampleType ||
    technician.speciality === TechnicianSpecialityEnum.GENERAL
  );
}
