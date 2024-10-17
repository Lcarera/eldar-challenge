import { Role } from './role.enum';

export class User {
  constructor(
    public id: number,
    public email: string,
    public password?: string,
    public role?: Role
  ) {}
}
