
import {createSelector} from '@ngrx/store';
import {getProductState, ProductState} from '../index';

export const getFormState = createSelector(
  getProductState,
  (state: ProductState) => state.form
)
