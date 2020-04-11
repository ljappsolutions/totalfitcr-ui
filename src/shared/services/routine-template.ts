import { RoutineTemplate } from "../models/routine-template"

export class RoutineTemplateService {
  public getRoutineTemplates = async (): Promise<RoutineTemplate[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            name: 'Upper Body Training',
            trainer: 1,
            exercises: [
              'biceps',
              'triceps'
            ]
          },
          {
            name: 'Lower Body',
            trainer: 1,
            exercises: [
              'hamstrings',
              'quadriceps'
            ]
          }
        ]);
      }, 1000);
    });
  }
}