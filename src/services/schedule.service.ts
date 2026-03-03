import { DateTime } from "luxon";
import { ISOTimeString } from "../types/common.type";
import { InputInterface } from "../types/interface/input.interface";
import { MetricsInterface } from "../types/interface/metrics.interface";
import { ScheduleInterface } from "../types/interface/schedule.interface";
import { shiftTimeByMinutes } from "../utils/time.utils";

export function planifyLab(data: InputInterface): {
  schedule: ScheduleInterface[];
  metrics: MetricsInterface;
} {
  const { samples, technicians, equipment } = data;
  const schedule: ScheduleInterface[] = [];
  const metrics: MetricsInterface = {
    totalTime: 0,
    efficiency: 0,
    conflicts: 0,
  };
  let firstStart: ISOTimeString | null = null;
  let lastEnd: ISOTimeString | null = null;
  let sumAnalysisTime: number = 0;

  for (const sample of samples) {
    const endTime = shiftTimeByMinutes(sample.arrivalTime, sample.analysisTime) as ISOTimeString;
    if (!firstStart || DateTime.fromISO(sample.arrivalTime) < DateTime.fromISO(firstStart)) {
      firstStart = sample.arrivalTime;
    }
    if (!lastEnd || DateTime.fromISO(endTime) > DateTime.fromISO(lastEnd)) {
      lastEnd = endTime;
    }

    schedule.push({
      sampleId: sample.id,
      technicianId: technicians[0].id,
      equipmentId: equipment[0].id,
      startTime: technicians[0].startTime,
      endTime,
      priority: sample.priority,
    });
    sumAnalysisTime += sample.analysisTime;
  }

  metrics.totalTime =
    firstStart && lastEnd
      ? DateTime.fromISO(lastEnd).diff(DateTime.fromISO(firstStart), "minutes").minutes
      : 0;
  metrics.efficiency = parseFloat(((sumAnalysisTime / metrics.totalTime) * 100).toFixed(1));

  return { schedule, metrics };
}
