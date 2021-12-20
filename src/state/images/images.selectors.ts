import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Gyphy } from 'src/app/shared/models/gyphy.model';
import { ImageState } from './images.interface';

const getImagesFeatureState = createFeatureSelector<ImageState>('images');

export const getImageById = createSelector(
  getImagesFeatureState,
    (state, props) => state.transactionsList.find( (t: Gyphy) => t.id === props.id)
);
