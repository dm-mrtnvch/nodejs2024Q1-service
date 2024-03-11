import { Injectable } from "@nestjs/common";
import { Album } from "src/album/entities/album.entity";
import { Artist } from "src/artist/entities/artist.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { Favorites } from "src/helpers/types";
import { Track } from "src/track/entities/track.entity";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class db {
  users: User[] = [];
  albums: Album[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  favorites: Favorite = new Favorite();

  deleteFavs(id: string, type: Favorites) {

    const favsIndex = this.favorites[type].findIndex((ent) => ent.id === id);

    if (favsIndex !== -1) {
      this.favorites[type].splice(favsIndex, 1);
    }
  }
}
