import { z } from "zod";
import { EquipmentTypeEnum } from "../enum/equipment.enum";

export const EquipmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(Object.values(EquipmentTypeEnum)),
  available: z.boolean(),
});
