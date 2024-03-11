import { IsInt, IsString } from "class-validator";
import { IsUUIDOrNull } from "src/validators/isUUIDOrNull.decorator";

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsUUIDOrNull()
  artistId: string;

  @IsUUIDOrNull()
  albumId: string;

  @IsInt()
  duration: number;
}
