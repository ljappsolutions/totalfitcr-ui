import { IPersonInformationState } from "../models/person/person-information";

export class UserService {
  private users: IPersonInformationState[] = [
    {
      name: 'Juan Daniel',
      lastName: 'Sanchez',
      id: '402070775',
      email: 'jdsanchez@ljappsolutions',
      birthday: '09-20-1990',
      phoneNumber: '88164859'
    },
    {
      name: 'Soledad Vanessa',
      lastName: 'Riggioni',
      id: '456735589',
      email: 'soledad.riggioni@gmail.com',
      birthday: '1991-06-09',
      phoneNumber: '88164859'
    },
    {
      name: 'Ana Lucia',
      lastName: 'Hidalgo',
      id: '207400129',
      email: 'luhidalgo01@gmail.com',
      birthday: '1995-06-01',
      phoneNumber: '88164859'
    },
    {
      name: 'Luis Diego',
      lastName: 'Bolaños',
      id: '234567890',
      email: 'luisdiego.bolaños@gmail.com',
      birthday: '1990-09-20',
      phoneNumber: '88164859'
    }
  ];
  public find = async (searchTxt: string): Promise<IPersonInformationState[]> => {
    const filteredUsers = this.users.filter(x => x.name.includes(searchTxt)
      || x.lastName.includes(searchTxt)
      || x.email.includes(searchTxt)
      || x.id.includes(searchTxt));
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filteredUsers);
      }, 1000);
    })
  }
}