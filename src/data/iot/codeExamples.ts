import { CodeExample, codeExamplesDataPart1 } from "./codeExamples1";
import { codeExamplesDataPart2 } from "./codeExamples2";

export type { CodeExample };

export const codeExamplesData: CodeExample[] = [
  ...codeExamplesDataPart1,
  ...codeExamplesDataPart2
];
