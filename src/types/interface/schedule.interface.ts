import { ISOTimeString } from "../common.type";
import { SamplePriorityEnum } from "../enum/sample.enum";

export interface ScheduleInterface {
  sampleId: string;
  technicianId: string;
  equipmentId: string;
  startTime: ISOTimeString;
  endTime: ISOTimeString;
  priority: SamplePriorityEnum;
}
