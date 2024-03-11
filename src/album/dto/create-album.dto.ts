import { IsInt, IsString } from "class-validator";
import { IsUUIDOrNull } from "../../validators/isUUIDOrNull.decorator";

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @IsUUIDOrNull()
  artistId: string | null; 
}
