import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenStreetMapService } from './open-street-map/open-street-map.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpenMapsUrlFactory } from './common/factories/OpenMapsUrlFactory';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { OpenStreetMapExceptionFilter } from './common/filters/open-street-map.exception-filter';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    OpenStreetMapService,
    OpenMapsUrlFactory,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: OpenStreetMapExceptionFilter,
    },
  ],
})
export class AppModule {
  static port: string
  constructor(configService: ConfigService) {
    AppModule.port = configService.get('DOCKER_CONTAINER_PORT')
  }
}
