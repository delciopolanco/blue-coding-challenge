import { ImageState } from './images.interface';
import * as fromApp from '../state';

export interface State extends fromApp.State {
  images: ImageState;
}
