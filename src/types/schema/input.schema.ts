import { z } from "zod";
import { SampleSchema } from "./sample.shema";
import { TechnicianSchema } from "./technician.schema";
import { EquipmentSchema } from "./equipment.schema";

export const InputSchema = z.object({
  samples: z.array(SampleSchema),
  technicians: z.array(TechnicianSchema),
  equipment: z.array(EquipmentSchema),
});