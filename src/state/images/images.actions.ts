import { createAction, props } from '@ngrx/store';
import { Gyphy } from 'src/app/shared/models/gyphy.model';


export const updateImage = createAction(
  '[Image] Update Image to list',
    props<{ image: Gyphy }>()
);
