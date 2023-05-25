import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenStreetMapException } from 'src/common/exceptions/open-street-map.exception';
import { OpenMapsUrlFactory } from 'src/common/factories/OpenMapsUrlFactory';
import { IBBox } from 'src/models/BBox';

@Injectable()
export class OpenStreetMapService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async findMapFeatures(bBox: IBBox): Promise<XMLDocument> {
    const url = OpenMapsUrlFactory.getBBoxQueryUrl(
      this.configService.get<string>('MAPS_API_URL'),
      bBox,
    );
    try {
      const res = await this.httpService.axiosRef.get<XMLDocument>(url);
      return res.data;
    } catch (error) {
      throw new OpenStreetMapException(
        error.response.data,
        error.response.status,
      );
    }
  }
}
