import { Usuario } from './usuario.class';

export class Publicacion {
  constructor(
    public id: number,
    public title: string,
    public body: string,
    public usuario: Usuario,
    public userId: number
  ) {}
}
