import { PartialType } from '@nestjs/swagger';
import { CreateAlbumDto } from './create-album.dto';
import { IsInt, IsString } from 'class-validator';
import { IsUUIDOrNull } from 'src/validators/isUUIDOrNull.decorator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsUUIDOrNull()
  artistId: string; 
}
