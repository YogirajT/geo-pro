import { IBBox } from 'src/models/BBox';

export class OpenMapsUrlFactory {
  static getBBoxQueryUrl(baseUrl: string, bBox: IBBox): string {
    return `${baseUrl}?${bBox.toString()}`;
  }
}
