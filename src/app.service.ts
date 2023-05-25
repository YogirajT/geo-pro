import { Injectable } from '@nestjs/common';
import { IFeatureRequestDTO } from './common/dto/feature-request.dto';
import { OpenStreetMapService } from './open-street-map/open-street-map.service';
import { BBoxFactory } from './common/factories/BBoxFactory';
import * as osmtogeojson from 'osmtogeojson';
import { OpenStreetMapException } from './common/exceptions/open-street-map.exception';

@Injectable()
export class AppService {
  constructor(private readonly openStreetMapService: OpenStreetMapService) {}

  async getGeoFeatures(
    featureRequestDTO: IFeatureRequestDTO,
  ): Promise<Record<string, any>> {
    const data = await this.openStreetMapService.findMapFeatures(
      BBoxFactory.getBBoxFromFeatureRequestDTO(featureRequestDTO),
    );
    return osmtogeojson(data);
  }
}
