import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { db } from 'src/database/database';
import { Track } from './entities/track.entity';
import { ERRORS } from 'src/helpers/constants';
import { Entities, Favorites } from 'src/helpers/types';

@Injectable()
export class TrackService {
  constructor (private db: db){}

  create(createTrackDto: CreateTrackDto) {
    const {name, artistId, albumId, duration} = createTrackDto;
    const track = new Track(name, artistId, albumId, duration);

    this.db.tracks.push(track);
    return track;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    
    if(!track) {
      throw new NotFoundException(ERRORS.entityNotFound(Entities.Track, id));
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const { name, artistId, albumId, duration } = updateTrackDto;
    
    const track = this.db.tracks.find((track) => track.id === id);
    
    if(!track) {
      throw new NotFoundException(ERRORS.entityNotFound(Entities.Track, id));
    }

    track.updateTrack(name, artistId, albumId, duration);

    return track;
  }

  remove(id: string) {
    const index = this.db.tracks.findIndex((track) => track.id === id);

    if(index === -1) {
      throw new NotFoundException(ERRORS.entityNotFound(Entities.Track, id));
    }

    this.db.deleteFavs(id, Favorites.Tracks);

    const deletedTrack = this.db.tracks.splice(index, 1);

    return deletedTrack;
  }
}
