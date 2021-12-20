import { Action, createReducer, on } from '@ngrx/store';
import * as ImagesActions from './images.actions';
import { ImageState } from './images.interface';

const initialState: ImageState = {
  imageList: [],
};

const imageReducer = createReducer(
  initialState,
  on(ImagesActions.updateImage, (state, { image }) => ({
    ...state,
    imageList: state.imageList.map((_image) => {
      if (_image.id === image.id) {
        return image;
      }

      return _image;
    }),
  }))
);

export const reducer = (state: ImageState, action: Action) =>
  imageReducer(state, action);
