import { Project, projectsDataPart1 } from "./projects1";
import { projectsDataPart2 } from "./projects2";
import { projectsDataPart3 } from "./projects3";
import { projectsDataPart4 } from "./projects4";

// Export the interface for use in the app
export type { Project };

// Combine all project parts into one main array (total 72 projects, 60 normal + 12 capstone)
export const projectsData: Project[] = [
  ...projectsDataPart1,
  ...projectsDataPart2,
  ...projectsDataPart3,
  ...projectsDataPart4
];
