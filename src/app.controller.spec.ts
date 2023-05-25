import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

const mock_response = 'mock_response';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: APP_PIPE,
          useClass: ValidationPipe,
        },
        {
          provide: AppService,
          useValue: {
            getGeoFeatures: jest.fn(() => mock_response),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('geo-features', () => {
    it('should return successfully', () => {
      const featureRequest = {
        minLat: -0.15461,
        maxLat: -0.15055,
        minLong: 51.48007,
        maxLong: 51.48159,
      };
      expect(appController.getGeoFeatures(featureRequest)).toEqual(
        mock_response,
      );
    });
  });
});
