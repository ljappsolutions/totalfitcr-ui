import { EditableExercise } from "./exercise";

export interface IRoutine {
  nbrOfWeeks: number;
  exercises: EditableExercise[];
}