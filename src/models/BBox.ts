import { IFeatureRequestDTO } from 'src/common/dto/feature-request.dto';

export interface IBBox {
  toString(): string;
}

export class BBox implements IBBox {
  protected minLat: number;
  protected minLong: number;
  protected maxLat: number;
  protected maxLong: number;

  constructor(featureRequestDTO: IFeatureRequestDTO) {
    this.minLong = featureRequestDTO.minLong;
    this.minLat = featureRequestDTO.minLat;
    this.maxLong = featureRequestDTO.maxLong;
    this.maxLat = featureRequestDTO.maxLat;
  }

  toString(): string {
    return `bbox=${this.minLong},${this.minLat},${this.maxLong},${this.maxLat}`;
  }
}
