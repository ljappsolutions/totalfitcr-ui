export interface Exercise {
  name: string;
  description: string;
  muscles: string[];
}

export interface SeriesDetails {
  week: number;
  information: string;
}

export interface EditableExercise extends Exercise{
  id: string;
  selected: boolean;
  series: SeriesDetails[];
}