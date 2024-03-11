import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { db } from 'src/database/database';
import { Favorites, FavoritesIds } from 'src/helpers/types';
import { ERRORS } from 'src/helpers/constants';

@Injectable()
export class FavoritesService {

  constructor (private db: db){}

  findAll() {
    return this.db.favorites;
  }

  create(id: string, type: Favorites, typeId: FavoritesIds) {
    const entity = this.db[type].find((entity) => entity.id === id);

    if(!entity) {
      throw new UnprocessableEntityException(ERRORS.entityNotFound(type, id));
    }

    const entityExistInFavs = this.db.favorites[type].some((entity) => entity[typeId] === id);

    if (entityExistInFavs) return undefined;

    this.db.favorites[type].push(entity as any);
    return entity;
  }

  remove(id: string, type: Favorites, typeId: FavoritesIds) {
    const index = this.db.favorites[type].findIndex((entity) => entity[typeId] === id);
    const someEntitiesExist = this.db.favorites[type].some((entity) => entity[typeId] === id);

    if(someEntitiesExist) {
      throw new NotFoundException(ERRORS.entityNotFound(type, id));
    }

    const deletedEntity = this.db.favorites[type].splice(index, 1);

    return deletedEntity;
  }
}
