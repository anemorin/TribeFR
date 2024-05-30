export type ExercisesType = {
  id: number;
  results: Exercises[]
}

type Exercises = {
  id: number;
  exercise_base: number;
  sets: 4;
  order: 1;
}
