import { User } from './user.class';

export class Post {
  constructor(
    public id: number,
    public title: string,
    public body: string,
    public user: User,
    public userId: number
  ) {}
}
