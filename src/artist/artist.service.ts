import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { db } from 'src/database/database';
import { Artist } from './entities/artist.entity';
import { ERRORS } from 'src/helpers/constants';
import { Entities, Favorites } from 'src/helpers/types';

@Injectable()
export class ArtistService {

  constructor (private db: db){}

  create(createArtistDto: CreateArtistDto) {
    const { name, grammy} = createArtistDto;
    const artist = new Artist(name, grammy);

    this.db.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if(!artist) {
      throw new NotFoundException(ERRORS.entityNotFound(Entities.Artist, id));
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const { name, grammy } = updateArtistDto;

    const artist = this.db.artists.find((artist) => artist.id === id);

    if(!artist) {
      throw new NotFoundException(ERRORS.entityNotFound(Entities.Artist, id));
    }

    artist.updateArtist(name, grammy);
    return artist;
  }

  remove(id: string) {
    const index = this.db.artists.findIndex((artist) => artist.id === id);

    if(index === -1) {
      throw new NotFoundException(ERRORS.entityNotFound(Entities.Artist, id));
    }

    const album = this.db.albums.find((album) => album.artistId === id);
    if (album) album.deleteArtist();

    const track = this.db.tracks.find((track) => track.artistId === id);
    if (track) track.deleteArtist();

    this.db.deleteFavs(id, Favorites.Artists);
  
    const deletedArtist = this.db.artists.splice(index, 1);
    
    return deletedArtist;
  }
}
