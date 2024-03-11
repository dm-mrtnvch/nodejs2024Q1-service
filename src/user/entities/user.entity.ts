import { Exclude } from "class-transformer";
import { v4 as uuidv4 } from 'uuid';

export class User {
  readonly id: string; // uuid v4
  public login: string;

  @Exclude()
  public password: string;
  public version: number; // integer number, increments on update
  readonly createdAt: number; // timestamp of creation
  public updatedAt: number; // timestamp of last update

  constructor(login: string, password: string) {
    this.id = uuidv4();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = this.createdAt;
  }

  updatePassword(newPassword: string) {
    this.password = newPassword;
    this.version += 1;
    this.updatedAt = Date.now();
  }
}
