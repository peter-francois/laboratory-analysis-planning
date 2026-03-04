import { timeString } from "../common.type";

export interface AssignInterface {
  technicianId: string;
  equipmentId: string;
  startTime: timeString;
  endTime: timeString;
}
