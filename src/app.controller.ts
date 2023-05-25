import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { FeatureRequestDTO } from './common/dto/feature-request.dto';
import { ValidationPipe } from './common/pipes/validation.pipe';

@Controller({
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('geo-features')
  getGeoFeatures(
    @Query(new ValidationPipe()) featureRequestDTO: FeatureRequestDTO,
  ): Promise<Record<string, any>> {
    return this.appService.getGeoFeatures(featureRequestDTO);
  }
}
