import { Test, TestingModule } from '@nestjs/testing';
import { OpenStreetMapService } from './open-street-map.service';
import { BBoxFactory } from 'src/common/factories/BBoxFactory';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { OpenStreetMapException } from 'src/common/exceptions/open-street-map.exception';

const mock_response = 'mock value';

const mock_error_data = 'error';
const mock_error_status = 400;

const mock_error = {
  response: {
    data: mock_error_data,
    status: mock_error_status,
  },
};

describe('OpenStreetMapService', () => {
  let service: OpenStreetMapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenStreetMapService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => ''),
          },
        },
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              get: jest.fn(() => Promise.resolve({ data: mock_response })),
            },
          },
        },
      ],
    }).compile();

    service = module.get<OpenStreetMapService>(OpenStreetMapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMapFeatures', () => {
    it('should return a valid response', async () => {
      const response = await service.findMapFeatures(
        BBoxFactory.getBBoxFromFeatureRequestDTO({
          minLat: -0.15461,
          maxLat: -0.15055,
          minLong: 51.48007,
          maxLong: 51.48159,
        }),
      );
      expect(response).toEqual(mock_response);
    });

    describe('findMapFeatures: negative tests', () => {
      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            OpenStreetMapService,
            {
              provide: ConfigService,
              useValue: {
                get: jest.fn(() => ''),
              },
            },
            {
              provide: HttpService,
              useValue: {
                axiosRef: {
                  get: jest.fn(() => Promise.reject(mock_error)),
                },
              },
            },
          ],
        }).compile();

        service = module.get<OpenStreetMapService>(OpenStreetMapService);
      });

      it('should return a throw OpenStreetMapException', async () => {
        try {
          await service.findMapFeatures(
            BBoxFactory.getBBoxFromFeatureRequestDTO({
              minLat: -0.15461,
              maxLat: -0.15055,
              minLong: 51.48007,
              maxLong: 51.48159,
            }),
          );
        } catch (error) {
          expect(error).toBeInstanceOf(OpenStreetMapException);
        }
      });
    });
  });
});
