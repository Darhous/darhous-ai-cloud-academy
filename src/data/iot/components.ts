import { ComponentData, componentsDataPart1 } from "./components1";
import { componentsDataPart2 } from "./components2";

export type { ComponentData };

export const componentsData: ComponentData[] = [
  ...componentsDataPart1,
  ...componentsDataPart2
];
