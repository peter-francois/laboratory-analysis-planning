import { MetricsInterface } from "./metrics.interface";
import { ScheduleInterface } from "./schedule.interface";

export interface OutputInterface {
  schedule: ScheduleInterface[];
  metrics: MetricsInterface;
}