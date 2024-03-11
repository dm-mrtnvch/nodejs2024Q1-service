import { PartialType } from '@nestjs/swagger';
import { CreateTrackDto } from './create-track.dto';
import { IsInt, IsString } from 'class-validator';
import { IsUUIDOrNull } from 'src/validators/isUUIDOrNull.decorator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  name: string;

  @IsUUIDOrNull()
  artistId: string;

  @IsUUIDOrNull()
  albumId: string;

  @IsInt()
  duration: number;
}
