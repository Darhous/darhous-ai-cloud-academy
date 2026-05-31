import { Lesson, lessonsDataPart1 } from "./lessons1";
import { lessonsDataPart2 } from "./lessons2";
import { lessonsDataPart3 } from "./lessons3";
import { lessonsDataPart4 } from "./lessons4";

// Export the interface for use in the app
export type { Lesson };

// Combine all lesson parts into one main array (total 60 lessons)
export const lessonsData: Lesson[] = [
  ...lessonsDataPart1,
  ...lessonsDataPart2,
  ...lessonsDataPart3,
  ...lessonsDataPart4
];
