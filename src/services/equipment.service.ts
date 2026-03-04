import { SampleTypeEnum } from "../types/enum/sample.enum";
import { EquipmentInterface } from "../types/interface/equipment.interface";

export function isEquipmentCompatible(
    equipment: EquipmentInterface,
    sampleType: SampleTypeEnum
): boolean{
    return (equipment.type as string) === (sampleType as string)
}