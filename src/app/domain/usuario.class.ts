import { Rol } from './rol.enum';

export class Usuario {
  constructor(
    public id: number,
    public email: string,
    public password?: string,
    public role?: Rol
  ) {}
}
