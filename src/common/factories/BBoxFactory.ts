import { BBox, IBBox } from 'src/models/BBox';
import { IFeatureRequestDTO } from '../dto/feature-request.dto';

export class BBoxFactory {
  static getBBoxFromFeatureRequestDTO(
    featureRequestDTO: IFeatureRequestDTO,
  ): IBBox {
    return new BBox(featureRequestDTO);
  }
}
