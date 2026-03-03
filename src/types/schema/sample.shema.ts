import { z } from "zod";
import { SamplePriorityEnum, SampleTypeEnum } from "../enum/sample.enum";

// Si ISOTimeString = string représentant une date ISO
export const SampleSchema = z.object({
  id: z.string(),
  type: z.enum(Object.values(SampleTypeEnum)),
  priority: z.enum(Object.values(SamplePriorityEnum)),
  analysisTime: z.number(),
  arrivalTime: z.string().refine((val) => /^\d{2}:\d{2}$/.test(val), {
    message: "arrivalTime doit être au format HH:MM",
  }),
  patientId: z.string(),
});
