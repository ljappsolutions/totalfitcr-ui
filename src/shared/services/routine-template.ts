import { RoutineTemplate } from "../models/routine-template"

export class RoutineTemplateService {
  public getRoutineTemplates = async (): Promise<RoutineTemplate[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            name: 'Tren superior',
            trainer: 1,
            exercises: [
              {
                name: 'Curl de biceps',
                description: '',
                muscles: ['biceps']
              },
              {
                name: 'Extensión de triceps',
                description: '',
                muscles: ['triceps']
              },
            ]
          },
          {
            name: 'Tren inferior',
            trainer: 1,
            exercises: [
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
            ]
          }
        ]);
      }, 1000);
    });
  }
}