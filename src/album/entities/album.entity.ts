import { v4 as uuidv4 } from 'uuid';


export class Album {
  readonly id: string; // uuid v4
  public name: string;
  public year: number;
  public artistId: string | null; 

  constructor(name: string, year: number, artistId: string) {
    this.id = uuidv4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  updateAlbum(name: string, year: number, artistId: string) {
    this.name = name || this.name;
    this.year = year || this.year;
    this.artistId = artistId !== undefined ? artistId : this.artistId;
  }

  deleteArtist() {
    this.artistId = null;
  }
}
