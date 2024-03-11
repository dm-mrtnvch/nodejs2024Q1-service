import { Controller, Get, Post, Param, Delete, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorites, FavoritesIds } from 'src/helpers/types';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  
  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  createTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.create(id, Favorites.Tracks, FavoritesIds.TrackId);
  }

  @Post('album/:id')
  @HttpCode(201)
  createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.create(id, Favorites.Albums, FavoritesIds.AlbumId);
  }

  @Post('artist/:id')
  @HttpCode(201)
  createArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.create(id, Favorites.Artists, FavoritesIds.ArtistId);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.remove(id, Favorites.Tracks, FavoritesIds.TrackId);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.remove(id, Favorites.Albums, FavoritesIds.AlbumId);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.remove(id, Favorites.Artists, FavoritesIds.ArtistId);
  }
}
