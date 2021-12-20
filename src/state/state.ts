import * as fromImage from './images/images.reducers';
import { ActionReducerMap } from '@ngrx/store';
import { ImageState } from './images/images.interface';

export interface State {
  image: ImageState;
}

export const appReducers: ActionReducerMap<State> = {
  image: fromImage.reducer
};
