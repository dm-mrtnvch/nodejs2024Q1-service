import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { db } from 'src/database/database';
import { Album } from './entities/album.entity';
import { ERRORS } from 'src/helpers/constants';
import { Entities, Favorites } from 'src/helpers/types';

@Injectable()
export class AlbumService {
  constructor (private db: db){}

  create(createAlbumDto: CreateAlbumDto) {
    const { name, artistId, year } = createAlbumDto;
    const album = new Album(name, year, artistId);

    this.db.albums.push(album);

    return album;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    
    if(!album) {
      throw new NotFoundException(ERRORS.entityNotFound(Entities.Album, id));
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const { name, artistId, year } = updateAlbumDto;

    const album = this.db.albums.find((album) => album.id === id);
    
    if(!album) {
      throw new NotFoundException(ERRORS.entityNotFound(Entities.Album, id));
    }

    album.updateAlbum(name, year, artistId);

    return album;
  }

  remove(id: string) {
    const index = this.db.albums.findIndex((album) => album.id === id);

    if(index === -1) {
      throw new NotFoundException(ERRORS.entityNotFound(Entities.Album, id));
    }

    const track = this.db.tracks.find((track) => track.albumId === id);
    if (track) track.deleteAlbum();

    this.db.deleteFavs(id, Favorites.Albums);

    const deletedAlbum = this.db.albums.splice(index, 1);

    return deletedAlbum;
  }
}
