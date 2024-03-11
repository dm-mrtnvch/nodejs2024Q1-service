import { v4 as uuidv4 } from 'uuid';

export class Track {
    readonly id: string; // uuid v4
    public name: string;
    public artistId: string | null; // refers to Artist
    public albumId: string | null; // refers to Album
    public duration: number; // integer number

    constructor(name: string, artistId: string, albumId: string, duration: number) {
      this.id = uuidv4();
      this.name = name;
      this.artistId = artistId;
      this.albumId = albumId;
      this.duration = duration;
    }

    updateTrack(name: string, artistId: string, albumId: string, duration: number) {
      this.name = name || this.name;
      this.artistId = artistId !== undefined ? artistId : this.artistId;
      this.albumId = albumId !== undefined ? albumId : this.albumId;
      this.duration = duration || this.duration;
    }

    deleteArtist() {
      this.artistId = null;
    }

    deleteAlbum() {
      this.albumId = null;
    }
}
