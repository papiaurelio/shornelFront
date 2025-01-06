import { ListEffects } from './save/save.effects';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromList from './save/save.reducer';
import * as fromForm from './form/form.reducer';

export interface ProductState {
  form: fromForm.FormState,
  list: fromList.ListState
}

export const reducers : ActionReducerMap<ProductState> = {
  form: fromForm.reducer,
  list: fromList.reducer
}

export const effects : any[] = [
  ListEffects
]

export const getProductState = createFeatureSelector<ProductState>('product');
