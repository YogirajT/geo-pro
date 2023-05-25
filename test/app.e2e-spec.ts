import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.enableVersioning({
      type: VersioningType.URI,
    });

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));


    await app.init();
  });

  it('/v1/geo-features (GET)', () => {
    return request(app.getHttpServer())
      .get(
        '/v1/geo-features?minLong=-0.15461&minLat=51.48007&maxLong=-0.15451&maxLat=51.48057',
      )
      .expect(200);
  });
});
