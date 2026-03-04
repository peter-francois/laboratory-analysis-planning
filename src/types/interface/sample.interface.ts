import { timeString } from "../common.type";
import { SamplePriorityEnum, SampleTypeEnum } from "../enum/sample.enum";

export interface SampleInterface {
  id: string;
  type: SampleTypeEnum;
  priority: SamplePriorityEnum;
  analysisTime: number;
  arrivalTime: timeString;
  patientId: string;
}
