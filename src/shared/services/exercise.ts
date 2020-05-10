import { Exercise } from "../models/exercise";

export class ExerciseService {
  public getExercises = async (): Promise<Exercise[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            description: '',
            name: 'Curl de biceps',
            muscles: ['biceps']
          },
          {
            name: 'Extensión de triceps',
            description: '',
            muscles: ['triceps']
          },
          {
            name: 'Press de pierna',
            description: '',
            muscles: [
              'muslos'
            ]
          },
          {
            name: 'Extensión de rodilla',
            description: '',
            muscles: [
              'quadriceps'
            ]
          },
          {
            name: 'Deadlift',
            description: '',
            muscles: [
              'glúteos'
            ]
          },
        ])
      }, 1000);
    })
  }
}