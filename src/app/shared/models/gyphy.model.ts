import { GyphyImage } from './gyphy-image.model';

/* eslint-disable @typescript-eslint/naming-convention */
export interface Gyphy {
  id: string;
  url: string;
  images: GyphyImage;
  title: string;
  type: string;
  username: string;
}
