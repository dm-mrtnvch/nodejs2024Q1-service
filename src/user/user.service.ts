import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { db } from 'src/database/database';
import { User } from './entities/user.entity';
import { ERRORS } from 'src/helpers/constants';
import { Entities } from 'src/helpers/types';

@Injectable()
export class UserService {
  constructor (private db: db){}

  create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    const user = new User(login, password);
 
    this.db.users.push(user);
    return user;
  }

  findAll() {
    return this.db.users;
  }

  findOne(id: string) {
    const user = this.db.users.find((user) => user.id === id);
    if(!user) {
      throw new NotFoundException(ERRORS.entityNotFound(Entities.User, id));
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserDto;

    const user = this.db.users.find((user) => user.id === id);

    if(!user) {
      throw new NotFoundException(ERRORS.entityNotFound(Entities.User, id));
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException(`You passed the wrong passwond`);
    }

    user.updatePassword(newPassword);
    return user;
  }

  remove(id: string) {
    const index = this.db.users.findIndex((usr) => usr.id === id);

    if(index === -1) {
      throw new NotFoundException(ERRORS.entityNotFound(Entities.User, id));
    }

    const deletedUser = this.db.users.splice(index, 1);

    return deletedUser;
  }

  isUserExist(login: string) {
   return !!this.db.users.find((usr) => usr.login === login);
  }
}
