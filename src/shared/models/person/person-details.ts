import * as jf from 'joiful';

export class PersonDetailsInfo {
  @jf.string().required().exactLength(9).error((_errors) => {
    return {
      message: 'La cédula es obligatoria y tener 9 dígitos',
      name: 'ValidationError'
    }
  })
  id: string = '';
  @jf.string().required().error((_errors) => {
    return {
      message: 'El nombre es requerido',
      name: 'ValidationError'
    }
  })
  name: string = '';
  @jf.string().required().error((_errors) => {
    return {
      message: 'El apellido es requerido',
      name: 'ValidationError'
    }
  })
  lastName: string = '';
  @jf.string().email().required().error((_errors) => {
    console.log(_errors);
    return {
      message: 'El correo electrónico es requerido',
      name: 'ValidationError'
    }
  })
  email: string = '';
  @jf.string().required().error((_errors) => {
    return {
      message: 'El número telefónico es requerido',
      name: 'ValidationError'
    }
  })
  phoneNumber: string = '';
  @jf.string().required().error((_errors) => {
    return {
      message: 'La fecha de nacimiento es requerida',
      name: 'ValidationError'
    }
  })
  birthday: string = '';
}
