import { Album } from "src/album/entities/album.entity";
import { Artist } from "src/artist/entities/artist.entity";
import { Track } from "src/track/entities/track.entity";

export class Favorite {
  constructor(
  public artists: Artist[] = [],
  public albums: Album[] = [],
  public tracks: Track[] = []){}
}
