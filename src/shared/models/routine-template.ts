import { Exercise } from "./exercise";

export interface RoutineTemplate {
  name: string;
  trainer: number;
  exercises: Exercise[];
}