import { v4 as uuidv4 } from 'uuid';

export class Artist {
  readonly id: string; // uuid v4
  public name: string;
  public grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.id = uuidv4();
    this.name = name;
    this.grammy = grammy;
  }

  updateArtist(name: string, grammy: boolean) {
    this.name = name;
    this.grammy = grammy;
  }
}
