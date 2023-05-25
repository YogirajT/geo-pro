import { Transform } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNumber } from 'class-validator';

export interface IFeatureRequestDTO {
  minLat: number;
  maxLat: number;
  minLong: number;
  maxLong: number;
}

export class FeatureRequestDTO implements IFeatureRequestDTO {
  @IsLatitude()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  minLat: number;

  @IsLatitude()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  maxLat: number;

  @IsLongitude()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  minLong: number;

  @IsLongitude()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  maxLong: number;
}
