import { EquipmentTypeEnum } from "../enum/equipment.enum";

export interface EquipmentInterface {
  id: string;
  name: string;
  type: EquipmentTypeEnum;
  available: boolean;
}
