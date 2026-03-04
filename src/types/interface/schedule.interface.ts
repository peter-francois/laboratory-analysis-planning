import { timeString } from "../common.type";
import { SamplePriorityEnum } from "../enum/sample.enum";

export interface ScheduleInterface {
  sampleId: string;
  technicianId: string;
  equipmentId: string;
  startTime: timeString;
  endTime: timeString;
  priority: SamplePriorityEnum;
}
